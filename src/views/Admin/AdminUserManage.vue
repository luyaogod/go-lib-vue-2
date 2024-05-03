<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  type userItem,
  type createUserData,
  type updateUserData,
  getUserList,
  createUser,
  deleteUser,
  updateUser
} from '@/api/admin'
import { useRouter } from 'vue-router'
import { useUUIDStore } from '@/stores/userInfo'
import {
  Cell,
  Loading,
  Button,
  Icon,
  Collapse,
  CollapseItem,
  Popup,
  Field,
  showSuccessToast,
  showFailToast
} from 'vant'
import 'vant/es/cell/style/index'
import 'vant/es/loading/style/index'
import 'vant/es/button/style/index'
import 'vant/es/icon/style/index'
import 'vant/es/collapse/style/index'
import 'vant/es/collapse-item/style/index'
import 'vant/es/popup/style/index'
import 'vant/es/field/style/index'
import 'vant/es/toast/style/index'

// //消息提示组件
// // const showSuccess = ref(false)
// // const successDetail = ref('')
// // const showDanger = ref(false)
// // const dangerDetail = ref('')

// // function successMsg(detail: string) {
// //   showSuccess.value = true
// //   successDetail.value = detail
// // }

// // function dangerMsg(detail: string) {
// //   showDanger.value = true
// //   dangerDetail.value = detail
// }
//pinia
const store = useUUIDStore()
//route
const router = useRouter()

//页面加载样式
const dataListLoading = ref(true)

//身份验证数据加载
const uuid = store.getUUID
const userList = ref<userItem[]>([]) //列表数据

//挂载事件
onMounted(() => {
  getUserList(uuid).then((rep) => {
    userList.value = rep
    dataListLoading.value = false
  })
})

//折叠面板操作变量
const activeName = ref()

//底部弹窗显示变量
const showAddUserPop = ref(false)
const showUpdateUserPop = ref(false)
const showDeleteUserPop = ref(false)

//添加用户和前往任务列表
function addUserButton() {
  showAddUserPop.value = true
}
function goTaskPage() {
  router.push('/admin/tasks')
}

//用户删除确定和取消按钮事件函数
const deleteUserSureButtonLoading = ref(false)
function deleteUserSure() {
  deleteUserSureButtonLoading.value = true
  const index = activeName.value
  const userId = userList.value[index].id
  deleteUser(uuid, userId).then((rep) => {
    if (rep === true) {
      //更新数据
      getUserList(uuid).then((rep) => {
        userList.value = rep
        deleteUserSureButtonLoading.value = false
        showDeleteUserPop.value = false
        showSuccessToast('删除成功')
      })
    } else {
      deleteUserSureButtonLoading.value = false
      showFailToast('删除失败')
    }
  })
}

function deleteUserCancel() {
  showDeleteUserPop.value = false
}

//新建用户表单提交
const createUserSubmitButtonLoading = ref(false)
const createUserStore = ref<createUserData>({ username: '', balance: 30 })
function addUserSubmit() {
  createUserSubmitButtonLoading.value = true
  createUser(uuid, createUserStore.value).then((ret) => {
    if (ret === true) {
      //新建成功更新数
      getUserList(uuid).then((rep) => {
        userList.value = rep
        dataListLoading.value = false
        //更新成功关闭弹窗
        createUserSubmitButtonLoading.value = false
        showAddUserPop.value = false
        showSuccessToast('添加成功')
      })
    } else {
      createUserSubmitButtonLoading.value = false
      showFailToast('添加失败')
    }
  })
}

//更新用户表单提交
const updateUserStore = ref<updateUserData>({ id: -1, username: '', balance: 0 })
const updateUserSubmitButtonLoading = ref(false)
function updateUserSubmit() {
  updateUserSubmitButtonLoading.value = true
  const index = activeName.value
  const postData = userList.value[index]
  updateUser(uuid, postData).then((ret) => {
    if (ret === true) {
      //删除成功更新数
      getUserList(uuid).then((rep) => {
        userList.value = rep
        dataListLoading.value = false
        //更新成功关闭弹窗
        updateUserSubmitButtonLoading.value = false
        showUpdateUserPop.value = false
        showSuccessToast('更新成功')
      })
    } else {
      updateUserSubmitButtonLoading.value = false
      showFailToast('更新失败')
    }
  })
  updateUser
}

//列表内三个按钮事件函数
function updateUserButton() {
  showUpdateUserPop.value = true
  const index = activeName.value
  updateUserStore.value = userList.value[index]
}
function deleteUserButton() {
  showDeleteUserPop.value = true
  console.log(activeName.value)
}
//复制按钮
// const source = ref('Hello')
// const { copy, isSupported } = useClipboard({ source })
// const baseUrl = import.meta.env.VITE_WEBSITE_UTL
//
// function copyUrlButton() {
//   if (!isSupported.value) {
//     dangerMsg('浏览器不支持')
//   } else {
//     const index = activeName.value
//     source.value = `${baseUrl}/user/${userList.value[index].uuid}`
//     copy(source.value)
//     successMsg('复制成功')
//   }
// }
</script>

<template>
  <div class="body">
    <div class="topButtonWrap">
      <Cell center>
        <template #title>
          <Button icon="plus" type="primary" @click="addUserButton"></Button>
        </template>
        <template #right-icon>
          <div class="goTaskArrowWrap" @click="goTaskPage">
            <Icon name="arrow" size="20" />
          </div>
        </template>
      </Cell>

      <!-- <div class="itemButton">
        <van-button type="primary" block @click="goTaskPage">任务列表</van-button>
      </div> -->
    </div>
    <!-- 加载 -->
    <div class="loadingBox" v-show="dataListLoading">
      <Loading size="30" color="#1989fa" />
    </div>

    <div class="userListWrap">
      <Collapse style="width: 100%" v-model="activeName" accordion>
        <div class="itemWrap" v-for="(i, index) in userList" :key="index">
          <CollapseItem :title="`${i.username} ${i.balance}`" :name="index">
            <div class="itemDetail">
              <span>{{ i.uuid }}</span>
            </div>

            <div class="itemButtonWrap">
              <div class="itemButton">
                <!-- <van-button plain type="primary" block @click="copyUrlButton">复制</van-button> -->
                <Button plain type="primary" block>复制</Button>
              </div>
              <div class="itemButton">
                <Button type="default" block @click="updateUserButton">更新</Button>
              </div>
              <div class="itemButton">
                <Button type="default" block @click="deleteUserButton">删除</Button>
              </div>
            </div>
          </CollapseItem>
        </div>
      </Collapse>
    </div>
  </div>

  <!-- 新建用户表单 -->
  <Popup v-model:show="showAddUserPop" position="bottom" :style="{ height: '60%' }">
    <div class="popDetailWrap">
      <Field v-model="createUserStore.username" label="用户名" placeholder="请输入用户名" />
      <Field v-model="createUserStore.balance" label="余额" placeholder="请输入余额" />
    </div>
    <div class="itemButton" style="width: 100%">
      <Button
        plain
        type="primary"
        block
        @click="addUserSubmit"
        style="margin-top: 40px"
        :loading="createUserSubmitButtonLoading"
        >提交</Button
      >
    </div>
  </Popup>

  <!-- 更新用户表单 -->
  <Popup v-model:show="showUpdateUserPop" position="bottom" :style="{ height: '60%' }">
    <div class="popDetailWrap">
      <Field v-model="updateUserStore.username" label="用户名" placeholder="请输入用户名" />
      <Field v-model="updateUserStore.balance" label="余额" placeholder="请输入余额" />
    </div>

    <div class="itemButton" style="width: 100%">
      <Button
        plain
        type="primary"
        block
        @click="updateUserSubmit"
        style="margin-top: 40px"
        :loading="updateUserSubmitButtonLoading"
        >提交</Button
      >
    </div>
  </Popup>

  <!-- 删除用户确定 -->
  <Popup v-model:show="showDeleteUserPop" position="bottom" :style="{ height: '60%' }">
    <div class="popDetailWrap deleteSurePopWrap">
      <div class="itemButton" style="width: 100%">
        <Button
          plain
          type="danger"
          block
          @click="deleteUserSure"
          :loading="deleteUserSureButtonLoading"
          >确定</Button
        >
      </div>

      <div class="itemButton" style="width: 100%">
        <Button plain type="primary" block @click="deleteUserCancel">取消</Button>
      </div>
    </div>
  </Popup>
</template>

<style scoped>
.body {
  background-color: #ffff;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.goTaskArrowWrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.userListWrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.itemButtonWrap {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.itemButton {
  margin-bottom: 20px;
}

.itemTitleWrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.itemDetail {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.topButtonWrap {
  width: 100%;
  border-bottom: 1px solid #1989fa;
}

.popDetailWrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.deleteSurePopWrap {
  height: 80%;
}

.loadingBox {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
