<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { userDetail } from '@/api/user'
import { useRouter } from 'vue-router'
import { useUUIDStore } from '@/stores/userInfo'
import { showFailToast } from 'vant'
import 'vant/es/toast/style/index'

const router = useRouter()
const store = useUUIDStore()
const uuid = ref()
function click() {
  userDetail(uuid.value)
    .catch(() => {
      showFailToast('登录失败')
    })
    .then((rep) => {
      if (rep === undefined || rep === null) {
        showFailToast('登录失败')
      } else {
        store.saveUUID(uuid.value)
        store.userInfo = rep

        router.push('/home')
      }
    })
}

onMounted(() => {
  if (store.getUUID != '') {
    console.log(store.getUUID)
    router.push('/home')
  }
})
</script>

<template>
  <div class="main-wrap">
    <div class="form">
      <span class="title">欢迎</span>
      <p class="description">衣带渐宽终终不悔，为伊消得人憔悴！</p>
      <div>
        <input v-model="uuid" placeholder="Enter your UUID" />
        <button @click="click">Login</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-wrap {
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form {
  display: flex;
  flex-direction: column;
  background: #606c88;
  background: -webkit-linear-gradient(to right, #3f4c6b, #606c88);
  background: linear-gradient(to right, #3f4c6b, #606c88);
  padding: 20px;
  border-radius: 10px;
}

.title {
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #fff;
}

.description {
  line-height: 1.5rem;
  font-size: 1rem;
  margin-top: 1rem;
  color: rgb(209 213 219);
}

.form div {
  display: flex;
  /* max-width: 28rem; */
  /* margin-top: 1rem; */
  column-gap: 0.5rem;
}

.form div input {
  outline: none;
  line-height: 1.5rem;
  font-size: 0.875rem;
  color: rgb(255 255 255);
  padding: 0.5rem 0.875rem;
  background-color: rgb(255 255 255 / 0.05);
  border: 1px solid rgba(253, 253, 253, 0.363);
  border-radius: 0.375rem;
  flex: 1 1 auto;
}

.form div input::placeholder {
  color: rgb(216, 212, 212);
}

.form div input:focus {
  border: 1px solid rgb(99 102 241);
}

.form div button {
  color: #fff;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.625rem 0.875rem;
  background-color: rgb(99 102 241);
  border-radius: 0.375rem;
  border: none;
  outline: none;
}
</style>
