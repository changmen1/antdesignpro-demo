import { request } from "@umijs/max";
import { API } from "types";

// 查询菜单权限列表
export async function getMenuList(params?: Menu.MenuListParams, options?: { [key: string]: any }) {
  return request<Menu.MenuPageResult>('/system/menu/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

// 查询菜单权限详细
export function getMenu(menuId: number, options?: { [key: string]: any }) {
  return request<Menu.MenuInfoResult>(`/system/menu/${menuId}`, {
    method: 'GET',
    ...(options || {})
  });
}

// 新增菜单权限
export async function addMenu(params: Menu.Menu, options?: { [key: string]: any }) {
  return request<API.Result<unknown>>('/system/menu', {
    method: 'POST',
    data: params,
    ...(options || {})
  });
}

// 修改菜单权限
export async function updateMenu(params: Menu.Menu, options?: { [key: string]: any }) {
  return request<API.Result<unknown>>('/system/menu', {
    method: 'PUT',
    data: params,
    ...(options || {})
  });
}

// 删除菜单权限
export async function removeMenu(ids: string, options?: { [key: string]: any }) {
  return request<API.Result<unknown>>(`/system/menu/${ids}`, {
    method: 'DELETE',
    ...(options || {})
  });
}


// 查询菜单权限详细
export function getMenuTree() {
  return request('/system/menu/treeselect', {
    method: 'GET',
  });
}
