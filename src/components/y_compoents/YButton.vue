<script setup lang="ts">
interface PopupProps {
  color?: string
}
const props = defineProps<PopupProps>()
</script>

<template>
  <button :class="['y-button', `y-button--${props.color}`]">
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<style scoped>
.y-button {
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  color: #f9f9f9;
  font-size: 18px;
  transition: background-color 0.3s ease; /* 添加渐变效果 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.y-button--base {
  background-color: #242424;
}
.y-button--base:active {
  background-color: #758bfd;
}

.y-button--prime {
  background-image: linear-gradient(to bottom right, #4a4f9d, #747ec9);
}
.y-button--prime:active {
  background-color: #27ae60;
}

.y-button--success {
  background-image: linear-gradient(to bottom right, #4a9494, #7fd3d0);
}
.y-button--success:active {
  background-color: #758bfd;
}
</style>
