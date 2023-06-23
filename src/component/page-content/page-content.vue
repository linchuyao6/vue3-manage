<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig.header?.title }}</h3>
      <el-button type="primary" v-if="isCreate" @click="handleNewUserClick">{{
        contentConfig.header?.btnTitle
      }}</el-button>
    </div>

    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <!-- 时间选择器 -->
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <!-- 按钮操作 -->
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  size="small"
                  text
                  type="primary"
                  icon="Edit"
                  @click="handleEditBtnClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="isDelete"
                  size="small"
                  text
                  type="danger"
                  icon="Delete"
                  @click="handleDeleteBtnClick(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <!-- 自定义操作 -->
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop">
                </slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item"> </el-table-column>
          </template>
        </template>
      </el-table>
    </div>

    <!-- 分页器 -->
    <div class="pageination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import usePermissions from '@/hooks/usepermissions'
import useSystemStore from '@/stores/main/system/system'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle: string
    }
    propsList: any[]
    childrenTree?: {}
  }
}

const props = defineProps<IProps>()

const emit = defineEmits(['newClick', 'editClick'])

const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

const currentPage = ref(1)
const pageSize = ref(10)
const systemStore = useSystemStore()
fetchPageListData()
// 获取数据用于展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

// 删除/新建/编辑
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}
function handleNewUserClick() {
  emit('newClick')
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

// 定义函数，用于发送网络请求
function fetchPageListData(formData: any = {}) {
  if (!isQuery) return
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  // 发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

defineExpose({
  fetchPageListData
})
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;

    .title {
      font-size: 22px;
    }
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

.pageination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
