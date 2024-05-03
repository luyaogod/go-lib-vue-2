<script setup lang="ts">
import 'css.gg/icons/css/chevron-left.css'

function goHome() {
  history.back()
}
</script>

<template>
  <div class="y-nav-bar">
    <div class="nav-button" @click="goHome">
      <i class="gg-chevron-left"> </i>
    </div>
  </div>
</template>

<style scoped>
.y-nav-bar {
  color: #ffffff;
  background-color: #151515;
  height: 20px;
  padding: 10px 20px 10px 20px;
  display: flex;
}
.nav-button {
  width: 20px;
  height: 20px;
}
</style>
