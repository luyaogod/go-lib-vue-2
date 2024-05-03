<script setup lang="ts">
interface PopupProps {
  color?: string
}

const props = defineProps<PopupProps>()
</script>

<template>
  <div :class="['y-button-card', `y-button-card--${props.color}`]">
    <div class="content content-wrap">
      <div class="content-top">
        <slot name="icon"></slot>
      </div>

      <div class="content content-bottom">
        <span class="head-text"><slot name="head"></slot></span>
        <span class="detail-text"><slot name="detail"></slot></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.y-button-card {
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #f9f9f9;
  transition: background-color 0.3s ease; /* 添加渐变效果 */
  display: flex;
  align-items: center;
}

.y-button-card--prime {
  background-color: #242424;
}
.y-button-card--prime:active {
  background-color: #758bfd;
}

.y-button-card--success {
  background-image: linear-gradient(to bottom right, #4a4f9d, #747ec9);
}
.y-button-card--success:active {
  background-color: #27ae60;
}

.y-button-card--danger {
  background-image: linear-gradient(to bottom right, #4a9494, #7fd3d0);
}
.y-button-card--danger:active {
  background-color: #c0392b;
}

.y-button-card--warn {
  background-color: #f1c40f;
}
.y-button-card--warn:active {
  background-color: #f39c12;
}

.content-wrap {
  display: flex;
  flex-direction: column;
}

.content {
  margin: 5px;
}

.content-bottom {
  display: flex;
  flex-direction: column;
}

span {
  margin-bottom: 5px;
}

.head-text {
  font-size: 20px;
  font-weight: 300;
}
</style>
