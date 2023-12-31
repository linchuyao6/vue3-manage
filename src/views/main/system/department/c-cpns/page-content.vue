<template>
  <div class="content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建部门</el-button>
    </div>

    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" label="序号" width="60" />
        <el-table-column
          align="center"
          prop="name"
          label="部门名称"
          width="150"
        />
        <el-table-column
          align="leader"
          prop="leader"
          label="部门领导"
          width="150"
        />
        <el-table-column
          align="center"
          prop="parentId"
          label="上级部门"
          width="150"
        />
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template #default="scope">
            <el-button
              size="small"
              text
              type="primary"
              icon="Edit"
              @click="handleEditBtnClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
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
import useSystemStore from '@/stores/main/system/system'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const emit = defineEmits(['newClick', 'editClick'])

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
  systemStore.deletePageByIdAction('department', id)
}
function handleNewUserClick() {
  emit('newClick')
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

// 定义函数，用于发送网络请求
function fetchPageListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  // 发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction('department', queryInfo)
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
