import { request } from '@umijs/max';

/**获取验证码 */
export async function getcaptcha() {
  return request('/auth/code', {
    method: 'GET',
    headers: { isToken: false }
  });
}

/**登录接口 */
export async function loginApi(body: LoginModal.IReq) {
  const params = {
    ...body,
    clientId: 'e5cd7e4891bf95d1d19206ce24a7b32e',
    grantType: 'password',
    tenantId: '000000',
    rememberMe: false,
  };
  return request('/auth/login', {
    method: 'POST',
    data: params,
    headers: {
      isToken: false,
      isEncrypt: true,
      repeatSubmit: false
    },
  });
}

/**获取用户信息 */
export async function getUserInfo() {
  return request<UserModal.IUserPrmtr>('/system/user/getInfo', {
    method: 'GET',
  });
}

/**退出登录 */
export async function loginOutApi() {
  return request('/manage/loginOut', {
    method: 'POST',
  });
}

/**用户菜单*/
export async function getRouters(): Promise<any> {
  return request('/system/menu/getRouters');
}

/**修改密码接口 */
export async function getPassword(data: UserModal.IPassword) {
  return request('/anyone/password', {
    method: 'PUT',
    data,
  });
}


/** 退出登录接口 */
export async function logout() {
  return request('/logout', {
    method: 'delete',
  });
}
