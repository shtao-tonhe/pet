<template>
  <form @submit.prevent="handleLogin" class="space-y-4">
    <div>
      <input v-model="form.phone" type="tel"
        class="mt-1 block text-xs w-full px-3 py-1 border-2 h-10 border-orange-200/60 rounded-md focus:outline-none focus:ring-orange-400 focus:border-orange-400"
        placeholder="请输入手机号" />
    </div>

    <!-- 密码登录 -->
    <div v-if="loginType === 'password'">
      <input v-model="form.password" type="password"
        class="mt-1 text-xs block w-full px-3 py-1 border-2 h-10 border-orange-200/60 rounded-md focus:outline-none focus:ring-orange-400 focus:border-orange-400"
        placeholder="请输入密码" />
    </div>

    <!-- 短信登录 -->
    <div v-else class="space-y-2">
      <div class="flex space-x-2">
        <input v-model="form.smsCode" type="text" maxlength="6"
          class="px-3 text-xs py-1 border-2 h-10 border-orange-200/60 max-w-[200px] rounded-md focus:outline-none focus:ring-orange-400 focus:border-orange-400"
          placeholder="短信验证码" />
        <button type="button" @click="sendSms" :disabled="isCounting"
          class="flex-1 px-4 text-sm py-1 bg-orange-500 text-white rounded-md disabled:bg-orange-300 transition whitespace-nowrap"
        >
          {{ isCounting ? `${smsCountdown.countdown}s后重发` : '发送' }}
        </button>
      </div>
    </div>

    <div class="flex items-center justify-end">
      <button type="button" @click="loginType = loginType === 'password' ? 'sms' : 'password'"
        class="text-sm text-orange-500 hover:underline">
        {{ loginType === 'password' ? '短信验证码' : '密码' }}登录
      </button>
    </div>

    <button type="submit" class="w-full py-2 mt-5 px-4 bg-orange-500 text-white font-medium rounded-md">
      登录
    </button>

    <p class="text-center text-sm text-gray-600">
      <button type="button" @click="$emit('switch-tab', 'register')" class="mr-3 text-orange-500 hover:underline">
        去注册
      </button>
      <button type="button" @click="$emit('switch-tab', 'forgot')" class="text-sm text-orange-500 hover:underline">
        忘记密码
      </button>
    </p>
  </form>
</template>

<script setup>
import { reactive, ref, toRefs } from 'vue';
import { useCountdown } from '@/composables/useAuth';
import { validatePhone } from '@/composables/useAuth';
import {
  loginWithPassword,
  loginWithSms,
  sendSmsCode,
} from '@/request/api/v1/auth';

const emit = defineEmits(['switch-tab']);

const loginType = ref('password'); // 'password' | 'sms'
const form = reactive({
  phone: '',
  password: '',
  smsCode: '',
});

const smsCountdown = useCountdown(60);

const { countdown, isCounting } = toRefs(smsCountdown);
const startSmsCountdown = smsCountdown.start;

const sendSms = async () => {
  if (!validatePhone(form.phone)) {
    alert('请输入正确的手机号');
    return;
  }
  try {
    await sendSmsCode({ phone: form.phone, purpose: 'LOGIN' });
    startSmsCountdown(); // ✅ 调用解构后的函数
    alert('验证码已发送');
  } catch (err) {
    console.error(err);
  }
};

const handleLogin = async () => {
  if (!validatePhone(form.phone)) {
    alert('手机号格式错误');
    return;
  }

  try {
    let res;
    if (loginType.value === 'password') {
      if (!form.password) {
        alert('请输入密码');
        return;
      }
      res = await loginWithPassword({
        phone: form.phone,
        password: form.password,
      });
    } else {
      if (!form.smsCode) {
        alert('请输入验证码');
        return;
      }
      res = await loginWithSms({
        phone: form.phone,
        smsCode: form.smsCode,
      });
    }

    // 登录成功：保存 token
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('expiresAt', Date.now() + res.data.expiresIn * 1000);
    alert('登录成功！');
    window.location.href = '/'; // 跳转首页
  } catch (err) {
    // 错误由 request 拦截器统一处理
  }
};
</script>