<script setup lang="ts">
import { ref } from 'vue'
import { useUUIDStore } from '@/stores/userInfo'
import { saveCookie } from '@/api/user'
import { showSuccessToast, showFailToast } from 'vant'
import 'vant/es/toast/style/index'
import UserInput from '@/components/page_compoents/UserInput.vue'
import YLoading from '@/components/y_compoents/YLoading.vue'

const store = useUUIDStore()
const wxurl = ref() //输入框数据
const buttonLoading = ref(false)

//提交事件
function sumbit() {
  buttonLoading.value = true
  if (wxurl.value == undefined || wxurl.value == '') {
    showFailToast('请填写微信身份链接')
    buttonLoading.value = false
  } else {
    saveCookie(wxurl.value, store.getUUID)
      .then((res) => {
        const status = res.status
        if (status == 'success') {
          showSuccessToast('任务提交成功')
          buttonLoading.value = false
        } else {
          showFailToast(res.detail)
          buttonLoading.value = false
        }
      })
      .catch((error) => {
        //任务提交失败数据库环节报错
        showFailToast(error)
        buttonLoading.value = false
      })
  }
}
</script>

<template>
  <div class="main-wrap">
    <UserInput v-model="wxurl">
      <button style="width: 40%" class="button--submit" @click="sumbit">
        <span v-show="!buttonLoading">提交</span>
        <YLoading size="20px" v-show="buttonLoading"></YLoading>
      </button>
    </UserInput>
  </div>
</template>

<style scoped>
.main-wrap {
  padding: 5px;
}

.button--submit {
  min-height: 50px;
  padding: 0.5em 1em;
  border: none;
  border-radius: 0 6px 6px 0;
  background-color: #5e4dcd;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button--submit:hover {
  background-color: #5e5dcd;
}
</style>
