<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getTaskListMorning } from '@/api/admin'
import { useRouter } from 'vue-router'
import { useUUIDStore } from '@/stores/userInfo'
import { Cell, showSuccessToast, NavBar } from 'vant'
import 'vant/es/cell/style/index'
import 'vant/es/toast/style/index'
import 'vant/es/nav-bar/style/index'

const datalist = ref<string[]>()
const store = useUUIDStore()
const uuid = store.getUUID
const router = useRouter()

function pullData() {
  getTaskListMorning(uuid)
    .then((rep) => {
      datalist.value = rep
    })
    .catch(() => {
      showSuccessToast('数据获取失败')
    })
}

onMounted(() => {
  if (uuid === '') {
    router.push('/error')
  } else {
    pullData()
  }
})

const clickBack = () => history.back()
</script>

<template>
  <NavBar left-text="返回" left-arrow @click-left="clickBack" />
  <Cell v-for="(i, index) in datalist" :title="i" :key="index" />
</template>

<style scoped></style>
