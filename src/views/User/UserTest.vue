<script setup lang="ts"></script>

<template>
  <div class="target">Hover over me!</div>
  <div class="tooltip">
    我是一个工具提示
    <div class="tooltip-arrow"></div>
  </div>
</template>

<style scoped>
.target {
  position: relative;
  display: inline-block;
  /* 其他样式 */
}

.tooltip {
  position: absolute;
  bottom: 100%; /* 将工具提示显示在目标元素的上方 */
  left: 50%; /* 将工具提示在目标元素水平居中 */
  transform: translateX(-50%); /* 精确居中工具提示 */
  padding: 10px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  visibility: hidden; /* 初始时不显示工具提示 */
  opacity: 0;
  transition:
    opacity 0.3s,
    visibility 0.3s;
}

.tooltip-arrow {
  position: absolute;
  top: 100%; /* 小尖尖位于工具提示的底部 */
  left: 50%; /* 在工具提示的水平中心 */
  border-width: 5px;
  border-style: solid;
  border-color: #333 transparent transparent transparent; /* 小尖尖的颜色 */
  content: '';
  transform: translateX(-50%); /* 精确居中小尖尖 */
}

.target:hover + .tooltip {
  visibility: visible; /* 鼠标悬停时显示工具提示 */
  opacity: 1;
}
</style>
