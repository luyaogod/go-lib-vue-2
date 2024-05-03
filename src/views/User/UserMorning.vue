<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Picker, Popup, showSuccessToast, showFailToast } from 'vant'
import 'vant/es/picker/style/index'
import 'vant/es/popup/style/index'
import 'vant/es/toast/style/index'
import YCard from '@/components/y_compoents/YCard.vue'
import YInput from '@/components/y_compoents/YInput.vue'
import YNavBar from '@/components/y_compoents/YNavBar.vue'
import YButton from '@/components/y_compoents/YButton.vue'
import YLoading from '@/components/y_compoents/YLoading.vue'
import { useRouter } from 'vue-router'
import { useUUIDStore } from '@/stores/userInfo'
import {
  type DetailItem,
  updateMorningSeat,
  convertDetailItemsToPostSeatItems,
  add_morning_task
} from '@/api/user'

//页面加载
const dataListLoading = ref(false)
const mainShow = ref(true) //主体显示

//router,pinia
const store = useUUIDStore()
const router = useRouter()

//数据相关
const seatList = ref<DetailItem[]>([]) //数据

const uuid = store.getUUID
//挂载事件数据拉取
onMounted(() => {
  if (uuid === '') router.push('/')
})

//picker相关
const libs = [
  { text: '请选择楼层', value: 0 },
  { text: '郑东校区-2楼西阅览区', value: 10073 },
  { text: '郑东校区-2楼东阅览区', value: 10065 },
  { text: '郑东校区-2楼东电子阅览区', value: 10071 },
  { text: '郑东校区-2楼西电子阅览区', value: 10072 },
  { text: '郑东校区-3楼西电子阅览区', value: 10080 },
  { text: '郑东校区-3楼东电子阅览区', value: 10081 },
  { text: '郑东校区-3楼东阅览区', value: 10082 },
  { text: '郑东校区-3楼西阅览区', value: 10083 },
  { text: '郑东校区-3楼中阅览区', value: 10084 },
  { text: '郑东校区-4楼西电子阅览区', value: 10085 },
  { text: '郑东校区-4楼东电子阅览区', value: 10086 },
  { text: '郑东校区-4楼西阅览区', value: 10087 },
  { text: '郑东校区-4楼东阅览区', value: 10088 },
  { text: '郑东校区-4楼中阅览区', value: 10089 },
  { text: '郑东校区-5楼西阅览区', value: 10090 },
  { text: '郑东校区-5楼东阅览区', value: 10091 },
  { text: '郑东校区-5楼中阅览区', value: 10092 },
  { text: '郑东校区-6楼西阅览区', value: 11019 },
  { text: '郑东校区-6楼中阅览区', value: 11033 },
  { text: '郑东校区-6楼东阅览区', value: 11040 },
  { text: '郑东校区-6楼北阅览区', value: 11300 },
  { text: '郑东校区-7楼西阅览区', value: 11054 },
  { text: '郑东校区-7楼中阅览区', value: 11061 },
  { text: '郑东校区-7楼东阅览区', value: 11068 },
  { text: '郑东校区-8楼电子西阅览区', value: 11075 },
  { text: '郑东校区-8楼东阅览区', value: 11096 },
  { text: '郑东校区-8楼西阅览区', value: 11117 },
  { text: '郑东校区-8楼中阅览室', value: 11131 },
  { text: '郑东校区-8楼电子东阅览区', value: 11138 },
  { text: '郑东校区-9楼西阅览区', value: 11082 },
  { text: '郑东校区-9楼中阅览区', value: 11103 },
  { text: '郑东校区-9楼东阅览区', value: 11124 },
  { text: '文北校区-2楼自主学习室', value: 11748 }
]
const showPicker = ref(false) //选择器显示
const clickIndex = ref(-1)

function changeLib(index: number) {
  clickIndex.value = index
  showPicker.value = true
}

interface Option {
  text: string
  value: number
}

const onConfirm = ({ selectedOptions }: { selectedOptions: Option[] }) => {
  showPicker.value = false
  seatList.value[clickIndex.value].seat_lib.lib_name = selectedOptions[0].text
  seatList.value[clickIndex.value].seat_lib.lib_id = selectedOptions[0].value
}

//座位添加
function addSeat() {
  if (seatList.value.length > 3) showFailToast('最多添加4个座位')
  else {
    const iniSeatItem: DetailItem = {
      seat_data: {
        id: 0,
        seat_key: '',
        seat_id: 0,
        lib_id: 0
      },
      seat_lib: {
        id: 0,
        lib_name: '请选择楼层',
        lib_id: 0
      }
    }
    seatList.value.push(iniSeatItem)
  }
}

//数据提交
const sumbitButtonLoading = ref(false)

function dataSubmit() {
  sumbitButtonLoading.value = true
  const dataRow = seatList.value
  if (dataRow.length < 2) {
    sumbitButtonLoading.value = false
    showFailToast('至少添加两个座位')
  } else {
    const cleanData = convertDetailItemsToPostSeatItems(dataRow)
    const postdata = {
      seats: cleanData
    }
    updateMorningSeat(store.getUUID, postdata)
      .then((rep) => {
        if (rep.status === 'success') {
          add_morning_task(store.getUUID)
            .then((rep) => {
              if (rep.status == 'success') showSuccessToast('提交成功')
              else showFailToast(rep.detail) //任务提交失败提示错误
            })
            .catch((error) => {
              showFailToast(`提交失败，请稍后再试，${error}`)
            })
        } else {
          //座位保存失败提示错误
          showFailToast(rep.detail)
        }
        sumbitButtonLoading.value = false
      })
      .catch((error) => {
        //座位保存错误
        showFailToast('提交失败')
        sumbitButtonLoading.value = false
        console.log(error)
      })
  }
}
</script>

<template>
  <YNavBar></YNavBar>

  <div class="pageLoading" v-show="dataListLoading">
    <YLoading size="30px"></YLoading>
  </div>

  <div class="mian-wrap" v-show="mainShow">
    <div class="seat-cards-wrap">
      <YCard color="base" v-for="(i, index) in seatList" :key="index">
        <template v-slot:head>
          <YInput v-model="i.seat_data.seat_id" placeholder="请输入座位号"></YInput>
        </template>

        <template v-slot:detail> {{ i.seat_lib.lib_name }} </template>

        <template v-slot:right>
          <button class="change-lib-button" @click="changeLib(index)">更换楼层</button>
        </template>
      </YCard>
    </div>

    <YButton class="save-button" color="prime" @click="addSeat">
      <span>添加座位</span>
    </YButton>

    <YButton class="save-button" color="success" @click="dataSubmit">
      <span v-show="!sumbitButtonLoading">提交任务</span>
      <YLoading v-show="sumbitButtonLoading" size="20px"></YLoading>
    </YButton>

    <!-- picker -->
    <Popup v-model:show="showPicker" round position="bottom">
      <Picker :columns="libs" @cancel="showPicker = false" @confirm="onConfirm" />
    </Popup>
  </div>
</template>

<style scoped>
.mian-wrap {
  padding: 15px;
}

.change-lib-button {
  font-size: 15px;
  border-radius: 20px;
  padding: 8px 20px 8px 20px;
  border: none;
  color: #242424;
  background-color: #ffffff;
}

.y-card {
  margin-bottom: 10px;
}

.save-button {
  height: 45px;
  margin-top: 20px;
  width: 100%;
}

.pageLoading {
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
