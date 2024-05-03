<script setup lang="ts">
const wxurl = defineModel()
</script>

<template>
  <div class="input-group">
    <input class="input" placeholder="请输入令牌" v-model="wxurl" />
    <slot></slot>
  </div>
</template>

<style scoped>
.input-group {
  display: flex;
  align-items: center;
}

.input {
  min-height: 50px;
  /* max-width: 150px; */
  width: 100%;
  padding: 0 1rem;
  color: #fff;
  font-size: 15px;
  border: 1px solid #5e4dcd;
  border-radius: 6px 0 0 6px;
  background-color: transparent;
}

.input:focus,
.input:focus-visible {
  border-color: #3898ec;
  outline: none;
}
</style>
