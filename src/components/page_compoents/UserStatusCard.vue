<script setup lang="ts">
interface PopupProps {
  balance?: number
}
const props = defineProps<PopupProps>()
</script>

<template>
  <div class="card">
    <p class="time-text">
      <span>{{ props.balance }}</span
      ><span class="time-sub-text">次</span>
    </p>
    <!-- <p class="detail">衣带渐宽终不悔，为伊消得人憔悴！</p> -->
    <div class="toggle">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  height: 150px;
  border-radius: 15px;
  display: flex;
  color: white;
  justify-content: center;
  position: relative;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}

.time-text {
  padding: 5px;
  font-size: 50px;
  margin-top: 0px;
  font-weight: 600;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.time-sub-text {
  font-size: 15px;
  margin-left: 5px;
}

.detail {
  font-size: 18px;
  margin-top: 0px;
  font-weight: 500;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.toggle {
  font-size: 20px;
  position: absolute;
  right: 15px;
  top: 15px;
  transition: all 0.3s ease-in-out;
}
</style>
