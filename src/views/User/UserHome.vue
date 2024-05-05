<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUUIDStore } from '@/stores/userInfo'
import { user_task, switchTaskStatus, userDetail } from '@/api/user'
import YButtonCard from '@/components/y_compoents/YButtonCard.vue'
import UserStatusCard from '@/components/page_compoents/UserStatusCard.vue'
import YLoading from '@/components/y_compoents/YLoading.vue'
import 'css.gg/icons/css/time.css'
import 'css.gg/icons/css/bookmark.css'
import 'css.gg/icons/css/eye.css'
import 'css.gg/icons/css/file.css'
import { Switch } from 'vant'
import 'vant/es/switch/style/index'
import { showFailToast, showSuccessToast } from 'vant'
import 'vant/es/toast/style/index'

//导航
const showLoading = ref([false, false, false, false])

function goSubmit() {
  router.push('/submit')
}

function goSeat() {
  showLoading.value[0] = true
  router.push('/seat')
}

function goMorning() {
  showLoading.value[2] = true
  router.push('/morning')
}

function goHelp() {
  showLoading.value[3] = true
  router.push('/help')
}

//用户校验与数据获取
const router = useRouter()
const store = useUUIDStore()
const uuid = store.getUUID
const checked = ref(false) //任务开关
const wxCookieStatus = ref(false)
const wxCookieStatusLoading = ref(true)

//用户任务数据请求函数
function getCookieStatus() {
  user_task(uuid)
    .catch(() => {
      showFailToast('用户数据获取失败')
      checked.value = false
      wxCookieStatus.value = false
      wxCookieStatusLoading.value = false
    })
    .then((rep) => {
      if (!rep) {
        // showFailToast('请注意查看教程绑定数据')
        checked.value = false
        wxCookieStatus.value = false
        wxCookieStatusLoading.value = false
      } else {
        checked.value = rep.open
        if (rep.status == 1) {
          wxCookieStatus.value = true
        } else {
          wxCookieStatus.value = false
        }
        wxCookieStatusLoading.value = false
      }
    })
}

function getUserInfo() {
  userDetail(store.getUUID)
    .catch(() => {
      showFailToast('登录失败')
    })
    .then((rep) => {
      if (rep === undefined || rep === null) {
        showFailToast('登录失败')
      } else {
        store.userInfo = rep
      }
    })
}

//挂载事件
onMounted(() => {
  if (uuid == '') router.push('/')
  else {
    if (store.userInfo == undefined) {
      getUserInfo()
    }
    getCookieStatus()
  }
})

function switchClick() {
  switchTaskStatus(store.getUUID).then((result) => {
    if (result === true) {
      //更新数据
      showSuccessToast('状态切换成功')
    } else {
      //切换失败返回初始状态
      showFailToast('状态切换失败')
    }
  })
}

//下拉
const drowDownShow = ref(false)
function drowpDownClick() {
  drowDownShow.value = !drowDownShow.value
}

//退出登录
function logout() {
  store.saveUUID('')
  window.location.href = '/'
}
</script>

<template>
  <div class="head">
    <div class="head-wrap">
      <div class="head-left">
        <img src="/public/favicon.ico" alt="Logo" class="logo-img" />
        <span class="website-name">Y-Realm</span>
      </div>

      <div class="head-right" style="font-size: 20px" @click="drowpDownClick">
        <span v-show="!wxCookieStatusLoading && wxCookieStatus">😃</span>
        <span v-show="!wxCookieStatusLoading && !wxCookieStatus">😭</span>
        <YLoading v-show="wxCookieStatusLoading" size="18px"></YLoading>
        <transition name="fade-slide">
          <div class="drop-down" v-show="drowDownShow">
            <button class="drop-down-button logout" @click="logout">登出</button>
            <button class="drop-down-button" @click.stop="drowpDownClick">关闭</button>
          </div>
        </transition>
      </div>
    </div>
  </div>

  <div class="main-container">
    <div class="user-card">
      <user-status-card :balance="store.userInfo?.balance">
        <Switch @click="switchClick" v-model="checked" size="22px" />
      </user-status-card>
    </div>

    <div class="button-container">
      <div class="button button-left" @click="goSeat">
        <y-button-card color="success">
          <template v-slot:icon>
            <div class="icon-box">
              <div style="background-color: #5a64ae" class="icon-cycle">
                <i class="gg-bookmark" v-show="!showLoading[0]"></i>
                <YLoading size="30px" v-show="showLoading[0]"></YLoading>
              </div>
            </div>
          </template>
          <template v-slot:head> 常用座位 </template>
        </y-button-card>
      </div>

      <div class="button button-right" @click="goSubmit">
        <y-button-card color="prime">
          <template v-slot:icon>
            <div class="icon-box">
              <div style="background-color: #1d1c1c" class="icon-cycle">
                <i class="gg-eye" v-show="!showLoading[1]"></i>
                <YLoading size="30px" v-show="showLoading[1]"></YLoading>
              </div>
            </div>
          </template>
          <template v-slot:head> 提交令牌 </template>
        </y-button-card>
      </div>

      <div class="button button-left" @click="goMorning">
        <y-button-card color="prime">
          <template v-slot:icon>
            <div class="icon-box">
              <div style="background-color: #1d1c1c" class="icon-cycle">
                <i class="gg-time" v-show="!showLoading[2]"></i>
                <YLoading size="30px" v-show="showLoading[2]"></YLoading>
              </div>
            </div>
          </template>
          <template v-slot:head> 明日选座 </template>
        </y-button-card>
      </div>

      <div class="button button-right" @click="goHelp">
        <y-button-card color="danger">
          <template v-slot:icon>
            <div class="icon-box">
              <div style="background-color: #66b5ba" class="icon-cycle">
                <i class="gg-file" v-show="!showLoading[3]"></i>
                <YLoading size="30px" v-show="showLoading[3]"></YLoading>
              </div>
            </div>
          </template>
          <template v-slot:head> 帮助文档 </template>
        </y-button-card>
      </div>
    </div>

    <div class="input-warp">
      <router-view></router-view>
    </div>
  </div>

  <div class="nebula-ellipse nebula-ellipse-top"></div>
</template>

<style scoped>
.main-container {
  position: relative;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.user-card {
  width: 100%;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.button {
  flex: 1;
  min-width: 160px;
  padding: 5px;
}

.icon-box {
  width: 50px;
  height: 50px;
}

.icon-cycle {
  height: 80%;
  width: 80%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.head {
  height: 25px;
  padding: 10px 20px 10px 20px;
  color: #b5babc;
  background-color: #151515;
}

.head-wrap {
  background-color: #151515;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-img {
  width: 20px;
  height: 20px;
}

.website-name {
  margin-left: 10px;
  font-size: 10px;
}

.head-left {
  display: flex;
  align-items: center;
}

.input-warp {
  padding-top: 20px;
  width: 100%;
}

.head-right {
  margin-right: 10px;
  position: relative;
}

.drop-down {
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  width: 150px;
  height: 30px;
  border-radius: 10px;
  position: absolute;
  top: 35px;
  right: -15px;
  z-index: 1000;
  background-color: #242424;
}

.drop-down::after {
  content: '';
  position: absolute;
  top: -5px;
  right: 25px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #242424;
}

.drop-down-button {
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
}

/* 定义进入和离开的过渡状态 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

/* 定义进入过渡的起始状态 */
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 定义进入过渡的结束状态 */
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* 定义离开过渡的结束状态 */
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.nebula-ellipse {
  z-index: -1;
  position: fixed;
  background-color: hsl(270, 61%, 39%);
}
.nebula-ellipse-top {
  width: 110%;
  height: 10vh;
  filter: blur(60px);
  left: -70px;
  top: -40px;
}
</style>
