import request from '@/utils/request'; // 假设你已有 request 实例

// 发送短信验证码
export function sendSmsCode(data) {
  return request({
    url: '/api/v1/auth/send-sms-code',
    method: 'post',
    data,
  });
}

// 注册
export function register(data) {
  return request({
    url: '/api/v1/auth/register',
    method: 'post',
    data,
  });
}

// 密码登录
export function loginWithPassword(data) {
  return request({
    url: '/api/v1/auth/login/password',
    method: 'post',
    data,
  });
}

// 短信登录
export function loginWithSms(data) {
  return request({
    url: '/api/v1/auth/login/sms',
    method: 'post',
    data,
  });
}

// 重置密码
export function resetPassword(data) {
  return request({
    url: '/api/v1/auth/password/reset',
    method: 'post',
    data,
  });
}

// 退出登录
export function logout() {
  return request({
    url: '/api/v1/auth/logout',
    method: 'post',
  });
}

// 注销账号
export function deleteAccount(data) {
  return request({
    url: '/api/v1/auth/account/delete',
    method: 'post',
    data,
  });
}