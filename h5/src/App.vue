<template>
  <div>
    <div class="page-cont">
      <!-- 公共组件或者错误提示,不局限于页面组件 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.page-cont {
  min-height: 100vh;
  width: 100%;
  /* background: linear-gradient(to bottom, #FFF7ED,  #FFEDD5); */
  background: linear-gradient(#FFF7ED, #FFEDD5);
}
</style>
