<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { type tasrRetItem, getTaskRetMorning, adminAuth } from '@/api/admin'
import { useRouter } from 'vue-router'
import { useUUIDStore } from '@/stores/userInfo'
import { Cell, CellGroup, NavBar, Pagination, Tag, Loading } from 'vant'
import 'vant/es/cell/style/index'
import 'vant/es/cell-group/style/index'
import 'vant/es/nav-bar/style/index'
import 'vant/es/pagination/style/index'
import 'vant/es/tag/style/index'
import 'vant/es/loading/style/index'

//pinia
const store = useUUIDStore()
//route
const router = useRouter()
const uuid = store.getUUID
//页面加载样式
const dataListLoading = ref(true)
const dataListShow = ref(false)

//身份验证数据加载
const taskList = ref<tasrRetItem[]>([])

//分页数据偏移量
const currentPage = ref(1)

//监听分页
watch(currentPage, () => {
  dataListShow.value = false
  dataListLoading.value = true
  //更新数据
  getTaskRetMorning(currentPage.value - 1, uuid).then((rep) => {
    taskList.value = rep
    dataListLoading.value = false
    dataListShow.value = true
  })
})

//挂载事件
onMounted(() => {
  if (uuid !== '') {
    adminAuth(uuid).then((rep) => {
      if (rep === true) {
        //更新数据
        getTaskRetMorning(currentPage.value - 1, uuid).then((rep) => {
          taskList.value = rep
          dataListLoading.value = false
          dataListShow.value = true
        })
      } else {
        router.push('/error')
      }
    })
  } else {
    router.push('/error')
  }
})

const statusList = ref([
  {
    text: 'fail',
    type: 'danger'
  },
  {
    text: 'success',
    type: 'success'
  }
])

const clickBack = () => history.back()
</script>

<template>
  <NavBar left-text="返回" left-arrow @click-left="clickBack" />
  <div class="body">
    <Pagination v-model="currentPage" :total-items="24" :items-per-page="5" />

    <!-- 加载 -->
    <div class="loadingBox" v-show="dataListLoading">
      <Loading size="30" color="#1989fa" />
    </div>
    <div class="taskListWrap" v-show="dataListShow">
      <CellGroup>
        <Cell
          v-for="(task, index) in taskList"
          :title="task.username"
          :label="task.time"
          :key="index"
          center
        >
          <template #right-icon>
            <Tag :type="statusList[task.status].type" size="medium">
              <div class="spanWrap">{{ statusList[task.status].text }}</div>
            </Tag>
          </template>
        </Cell>
      </CellGroup>
    </div>
  </div>
</template>

<style scoped>
.spanWrap {
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loadingBox {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
