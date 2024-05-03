<script setup lang="ts">
import { ref } from 'vue'
interface PopupProps {
  size?: string
}

const props = defineProps<PopupProps>()
const loaderStyle = ref({
  width: props.size,
  height: props.size
})
</script>

<template>
  <div class="loader-container">
    <div :style="loaderStyle" class="loader"></div>
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
    box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.4);
  }

  50% {
    transform: rotate(180deg);
    box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.4);
  }

  100% {
    transform: rotate(360deg);
    box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.4);
  }
}
</style>
