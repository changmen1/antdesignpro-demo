import { DictValueEnumType } from "@/components/DictTag";
import { downLoadXlsx } from "@/utils/downloadfile";
import { formatTreeData } from "@/utils/tree";
import { request } from "@umijs/max";
import { DataNode } from "antd/es/tree";

export type DictValueEnumObj = Record<string | number, DictValueEnumType>;

/**查询用户信息列表 */
export async function getUserList(
  params?: User.IUserListParams,
  options?: { [key: string]: any },
) {
  return request("/system/user/list", {
    method: "GET",
    params,
    ...(options || {}),
  });
}

/**查询用户信息详细 */
export async function getUser(
  userId: number,
  options?: { [key: string]: any },
) {
  return request(`/system/user/${userId}`, {
    method: "GET",
    ...(options || {}),
  });
}

/**新增用户信息 */
export async function addUser(
  params?: User.IAddUser,
  options?: { [key: string]: any },
) {
  return request("/system/user", {
    method: "POST",
    data: params,
    ...(options || {}),
  });
}

/**修改用户信息 */
export async function updateUser(
  params?: User.IUpdateUser,
  options?: { [key: string]: any },
) {
  return request("/system/user", {
    method: "PUT",
    data: params,
    ...(options || {}),
  });
}

/**删除用户信息 */
export async function removeUser(
  ids: string,
  options?: { [key: string]: any },
) {
  return request(`/system/user/${ids}`, {
    method: "DELETE",
    ...(options || {}),
  });
}

/**用户状态修改 */
export async function changeUserStatus(data: {
  userId: number;
  status: string;
}) {
  return request("/system/user/changeStatus", {
    method: "PUT",
    data: data,
  });
}

/**查询字典类型列表 */
export async function getDictTypeList(params?: User.IDictTypeListParams) {
  return request("/system/dict/type/list", {
    method: "GET",
    params,
  });
}

/**查询岗位信息列表 */
export async function getPostList(params?: User.IPostListParams) {
  return request("/system/post/list", {
    method: "GET",
    params,
  });
}

/**查询角色信息列表 */
export async function getRoleList(params?: User.IRoleListParams) {
  return request("/system/role/list", {
    method: "GET",
    params,
  });
}

/**保存授权角色 */
export async function updateAuthRole(data: Record<string, any>) {
  return request("/system/user/authRole", {
    method: "PUT",
    data: data,
  });
}

/**用户密码重置 */
export async function resetUserPwd(data: { userId: number; password: string }) {
  return request("/system/user/authRole", {
    method: "PUT",
    data: data,
  });
}

/**获取数据列表 */
export async function getDeptTree(params: any): Promise<DataNode[]> {
  return new Promise((resolve) => {
    request(`/system/user/deptTree`, {
      method: "get",
      params,
    }).then((res: any) => {
      if (res && res.code === 200) {
        const treeData = formatTreeData(res.data);
        resolve(treeData);
      } else {
        resolve([]);
      }
    });
  });
}

/**导出用户信息 */
export function exportUser(params?: User.IUserListParams) {
  return downLoadXlsx(
    `/system/user/export`,
    { params },
    `user_${new Date().getTime()}.xlsx`,
  );
}

/** //TODO 属于字典的接口 需要迁移查询字典数据详细 */
export async function getDictValueEnum(
  dictType: string,
  isDigital?: boolean,
): Promise<DictValueEnumObj> {
  const resp = await request<User.IDictTypeResult>(
    `/system/dict/data/type/${dictType}`,
    {
      method: "GET",
    },
  );
  if (resp.code === 200) {
    const opts: DictValueEnumObj = {};
    resp.data.forEach((item: any) => {
      opts[item.dictValue] = {
        text: item.dictLabel,
        label: item.dictLabel,
        value: isDigital ? Number(item.dictValue) : item.dictValue,
        key: item.dictCode,
        listClass: item.listClass,
        status: item.listClass,
      };
    });
    return opts;
  } else {
    return {};
  }
}
