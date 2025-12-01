import { ref, reactive } from 'vue';

// 密码强度校验：6-20位，必须包含字母+数字
export const validatePassword = (pwd) => {
  if (!pwd || pwd.length < 6 || pwd.length > 20) return false;
  const hasLetter = /[a-zA-Z]/.test(pwd);
  const hasDigit = /\d/.test(pwd);
  return hasLetter && hasDigit;
};

// 手机号校验
export const validatePhone = (phone) => {
  return /^1[3-9]\d{9}$/.test(phone);
};

// 验证码倒计时逻辑
export function useCountdown(initialSeconds = 60) {
  const countdown = ref(0);
  const isCounting = ref(false);

  const start = () => {
    if (isCounting.value) return;
    countdown.value = initialSeconds;
    isCounting.value = true;
    const timer = setInterval(() => {
      if (countdown.value <= 0) {
        clearInterval(timer);
        isCounting.value = false;
      } else {
        countdown.value--;
      }
    }, 1000);
  };

  const reset = () => {
    countdown.value = 0;
    isCounting.value = false;
  };

  return { countdown, isCounting, start, reset };
}