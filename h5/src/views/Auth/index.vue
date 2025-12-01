<template>
  <div class="min-h-screen w-full flex p-4 relative overflow-hidden">
    <div class="flex flex-col max-w-md w-full">
      <div class="mt-[215px] text-center mb-5">
        <div class="text-4xl font-bold text-amber-600 mb-3">宠迹</div>
        <div class="text-sm text-gray-500">让爱宠生活更精彩</div>
      </div>
      <component :is="currentComponent" @switch-tab="activeTab = $event" class="z-20"/>
    </div>
    <img class="absolute bottom-0 opacity-60 left-0 w-full h-[730px]" src="../../../.ai/用户模块-登录/ai设计结果01a-手动处理.png" alt="">
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Login from './Login.vue';
import Register from './Register.vue';
import ForgotPassword from './ForgotPassword.vue';

// const tabs = [
//   { key: 'login', label: '登录' },
//   { key: 'register', label: '注册' },
//   { key: 'forgot', label: '忘记密码' },
// ];

const activeTab = ref('login');

const componentMap = {
  login: Login,
  register: Register,
  forgot: ForgotPassword,
};

const currentComponent = computed(() => componentMap[activeTab.value]);
</script>