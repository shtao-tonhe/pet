<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">手机号</label>
      <input
        v-model="form.phone"
        type="tel"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="请输入手机号"
      />
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">短信验证码</label>
      <div class="flex space-x-2">
        <input
          v-model="form.smsCode"
          type="text"
          maxlength="6"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="6位验证码"
        />
        <button
          type="button"
          @click="sendSms"
          :disabled="isCounting"
          class="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400 hover:bg-blue-700 transition"
        >
          {{ isCounting ? `${countdown}s后重发` : '发送' }}
        </button>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">
        设置密码（6-20位，字母+数字）
      </label>
      <input
        v-model="form.password"
        type="password"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="请输入密码"
      />
    </div>

    <button
      type="submit"
      class="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      注册
    </button>

    <p class="text-center text-sm text-gray-600">
      已有账号？
      <button
        type="button"
        @click="$emit('switch-tab', 'login')"
        class="text-blue-600 hover:underline"
      >
        立即登录
      </button>
    </p>
  </form>
</template>

<script setup>
import { reactive, toRefs } from 'vue';
import { useCountdown, validatePhone, validatePassword } from '@/composables/useAuth';
import { sendSmsCode, register } from '@/request/api/v1/auth';

const emit = defineEmits(['switch-tab']);
const form = reactive({
  phone: '',
  smsCode: '',
  password: '',
});
const smsCountdown = useCountdown(60);

const { countdown, isCounting } = toRefs(smsCountdown);
const startSmsCountdown = smsCountdown.start;

const sendSms = async () => {
  if (!validatePhone(form.phone)) {
    alert('手机号格式错误');
    return;
  }
  try {
    await sendSmsCode({ phone: form.phone, purpose: 'REGISTER' });
    startSmsCountdown();
    alert('验证码已发送');
  } catch (err) {
    // handled by interceptor
  }
};

const handleSubmit = async () => {
  if (!validatePhone(form.phone)) {
    alert('手机号格式错误');
    return;
  }
  if (!form.smsCode) {
    alert('请输入验证码');
    return;
  }
  if (!validatePassword(form.password)) {
    alert('密码需6-20位，包含字母和数字');
    return;
  }

  try {
    await register({
      phone: form.phone,
      smsCode: form.smsCode,
      password: form.password,
    });
    alert('注册成功！即将跳转登录...');
    emit('switch-tab', 'login');
  } catch (err) {
    // handled
  }
};
</script>