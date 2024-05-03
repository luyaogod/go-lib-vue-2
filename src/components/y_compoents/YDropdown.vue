<script setup lang="ts">
import { ref } from 'vue'

const options = ref([
  { value: 'option1', text: '选项 1' },
  { value: 'option2', text: '选项 2' },
  { value: 'option3', text: '选项 3' }
])

const selected = ref('')
</script>

<template>
  <div class="dropdown">
    <select v-model="selected" class="dropdown-select">
      <option disabled value="">请选择一个选项</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
    <p>选中的值: {{ selected }}</p>
  </div>
</template>

<style scoped>
.dropdown {
  display: inline-block;
  font-size: 16px;
  background: #333;
  color: #fff;
  border-radius: 4px;
  overflow: hidden;
}

.dropdown-select {
  display: block;
  width: 100%;
  padding: 8px;
  margin: 0;
  background: none;
  border: 1px solid #444;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  outline: none;
  appearance: none;
}

.dropdown-select::-ms-expand {
  display: none;
}

.dropdown-select:hover,
.dropdown-select:focus {
  border-color: #555;
}

.dropdown-select option {
  padding: 8px;
  background: #222;
  color: #fff;
}
</style>
