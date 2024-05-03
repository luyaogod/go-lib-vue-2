<script setup lang="ts">
interface PopupProps {
  color?: string
}

const props = defineProps<PopupProps>()
</script>

<template>
  <div :class="['y-card', `y-card--${props.color}`]">
    <div class="y-card-wrap">
      <div class="y-card-left">
        <div class="y-card-left-item y-card-left-head">
          <slot name="head"></slot>
        </div>

        <div class="y-card-left-item y-card-left-detail">
          <slot name="detail"></slot>
        </div>
      </div>

      <div class="y-card-right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.y-card {
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* 添加渐变效果 */
}

.y-card--base {
  background-color: #242424;
}

.y-card--prime {
  background-image: linear-gradient(to bottom right, #4a4f9d, #747ec9);
}

.y-card--success {
  background-image: linear-gradient(to bottom right, #4a9494, #7fd3d0);
}

.y-card-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-left {
  display: flex;
  flex-direction: column;
}

.y-card-left-item {
  margin-bottom: 5px;
}

.y-card-left-detail {
  font-size: 15px;
  color: #b5babc;
}

.y-card-left {
  display: flex;
  flex-direction: column;
}
</style>
