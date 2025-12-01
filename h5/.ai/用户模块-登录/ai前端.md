下面是我的app/h5的登录/注册/忘记密码业务，ui自由发挥（满足业务入参交互即可），帮我生成逻辑，后端有已完成的api

====================
手动复制 业务逻辑.md内容
====================

====================
手动复制 开发约定.md内容
====================

编码注意：
1、技术栈以及编码：vue3、vite、js、tailwindcss
2、api请求交互实例
```
export function systemLogin(data) {
  return request({
    url: `ApiUrl`,
    method: "post",
    data: data,
  });
}

import { systemLogin } from "@/request/api/v1";


// 用于模拟接口返回定义的参数接口
import xxx from "@/request/mock/login.json";

systemLogin({xxx:xxx}).then((res) => {}).finally(() => {});
```