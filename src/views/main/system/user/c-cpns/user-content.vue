<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick"
        >新建用户</el-button
      >
    </div>

    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" label="序号" width="60" />
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
          width="150"
        />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="150"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="手机号码"
          width="150"
        />
        <el-table-column align="center" prop="enable" label="状态" width="100">
          <template #default="scope">
            <el-button
              :type="scope.row.enable ? 'primary' : 'danger'"
              size="small"
              plain
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
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
      </el-table>
    </div>

    <!-- 分页器 -->
    <div class="pageination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
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
import usePermissions from '@/hooks/usepermissions'

const emit = defineEmits(['newClick', 'editClick'])

const isCreate = usePermissions(`users:create`)
const isDelete = usePermissions(`users:delete`)
const isUpdate = usePermissions(`users:update`)
const isQuery = usePermissions(`users:query`)
const currentPage = ref(1)
const pageSize = ref(10)
const systemStore = useSystemStore()
fetchUserListData()

console.log(isQuery)
// 获取数据用于展示
const { usersList, usersTotalCount } = storeToRefs(systemStore)

function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}

// 删除/新建/编辑
function handleDeleteBtnClick(id: number) {
  systemStore.handleDeleteBtnClick(id)
}
function handleNewUserClick() {
  emit('newClick')
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

// 定义函数，用于发送网络请求
function fetchUserListData(formData: any = {}) {
  if (!isQuery) return
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  // 发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUserListAction(queryInfo)
}

defineExpose({
  fetchUserListData
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
