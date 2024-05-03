<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUUIDStore } from '@/stores/userInfo'
import { Button } from 'vant'
import 'vant/es/button/style/index'

//校验
const router = useRouter()
const store = useUUIDStore()
const uuid = store.getUUID

onMounted(() => {
  if (uuid == '') router.push('/admin')
})

//按钮事件
const isLoadingOne = ref(false)
const isLoadingTwo = ref(false)
const isLoadingThree = ref(false)
const isLoadingFour = ref(false)
const isLoadingFive = ref(false)

function bottonClickOne() {
  isLoadingOne.value = true
  router.push('/admin/users')
}
function bottonClickTwo() {
  isLoadingTwo.value = true
  router.push('/admin/tasks')
}
function bottonClickThree() {
  isLoadingThree.value = true
  router.push('/admin/taskRets')
}
function bottonClickFour() {
  isLoadingFour.value = true
  router.push('/admin/morning/tasks')
}
function bottonClickFive() {
  isLoadingFive.value = true
  router.push('/admin/morning/taskRets')
}
</script>

<template>
  <div class="body">
    <Button
      class="buttonGo"
      type="primary"
      size="large"
      block
      @click="bottonClickOne()"
      :loading="isLoadingOne"
      >用户管理</Button
    >
    <Button
      class="buttonGo"
      type="primary"
      size="large"
      block
      @click="bottonClickTwo()"
      :loading="isLoadingTwo"
      >用户状态列表</Button
    >
    <Button
      class="buttonGo"
      type="primary"
      size="large"
      block
      @click="bottonClickThree()"
      :loading="isLoadingThree"
      >预约结果列表</Button
    >

    <Button
      class="buttonGo"
      type="primary"
      size="large"
      block
      @click="bottonClickFour()"
      :loading="isLoadingFour"
      >早晨任务列表</Button
    >

    <Button
      class="buttonGo"
      type="primary"
      size="large"
      block
      @click="bottonClickFive()"
      :loading="isLoadingFive"
      >早晨任务结果</Button
    >
  </div>
</template>

<style scoped>
.body {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: transparent;
}
.buttonGo {
  margin-bottom: 25px;
  width: 95%;
}
.main_warp {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #ffff;
}
.spanWrap {
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
