import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type userInfo } from '@/api/user'

export const useUUIDStore = defineStore('mytoken', () => {
  const UUID = ref('')

  const getUUID = computed(() => {
    return UUID.value || window.localStorage.getItem('UUID') || ''
  })

  function saveUUID(data: string) {
    UUID.value = data
    window.localStorage.setItem('UUID', data)
  }

  const userInfo = ref<userInfo>()

  return { UUID, getUUID, saveUUID, userInfo }
})
