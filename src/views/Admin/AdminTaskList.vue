<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type taskItem, getTaskList, adminAuth } from '@/api/admin'
import { useRouter } from 'vue-router'
import { useUUIDStore } from '@/stores/userInfo'
import { Tag, Cell, CellGroup, Loading, NavBar, type TagType } from 'vant'
import 'vant/es/tag/style/index'
import 'vant/es/cell/style/index'
import 'vant/es/cell-group/style/index'
import 'vant/es/loading/style/index'
import 'vant/es/nav-bar/style/index'

//pinia
const store = useUUIDStore()
//route
const router = useRouter()

//页面加载样式
const dataListLoading = ref(true)

//身份验证数据加载
const taskList = ref<taskItem[]>([])

//挂载事件
onMounted(() => {
  const uuid = store.getUUID
  if (uuid !== '') {
    adminAuth(uuid).then((rep) => {
      if (rep === true) {
        //更新数据
        getTaskList(uuid).then((rep) => {
          taskList.value = rep
          dataListLoading.value = false
          //状态处理,设置关闭状态任务的状态码为3
          for (let i = 0; i < taskList.value.length; i++) {
            //设置有效且关闭的任务状态为3
            if (taskList.value[i].status === 1)
              if (taskList.value[i].open === false) taskList.value[i].status = 2
          }
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
    text: 'lose',
    type: 'danger'
  },
  {
    text: 'ready',
    type: 'primary'
  },
  {
    text: 'close',
    type: 'warning'
  }
])

const clickBack = () => history.back()
</script>

<template>
  <NavBar left-text="返回" left-arrow @click-left="clickBack" />
  <div class="body">
    <!-- 加载 -->
    <div class="loadingBox" v-show="dataListLoading">
      <Loading size="30" color="#1989fa" />
    </div>
    <div class="taskListWrap">
      <CellGroup>
        <Cell
          v-for="(task, index) in taskList"
          :title="task.username"
          :label="task.add_time"
          :key="index"
          center
        >
          <template #right-icon>
            <Tag :type="statusList[task.status].type as TagType" size="medium">
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
.goTaskArrowWrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
