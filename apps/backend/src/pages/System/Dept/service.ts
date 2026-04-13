import { request } from '@umijs/max';
import { API } from 'types';

// 查询部门列表
export async function getDeptList(params?: Dept.DeptListParams) {
  return request<Dept.DeptPageResult>('/system/dept/list', {
    method: 'GET',
    params
  });
}

// 查询部门列表（排除节点）
export function getDeptListExcludeChild(deptId: number) {
  return request(`/system/dept/list/exclude/${deptId}`, {
    method: 'get',
  });
}

// 查询部门详细
export function getDept(deptId: number) {
  return request<Dept.DeptInfoResult>(`/system/dept/${deptId}`, {
    method: 'GET'
  });
}

// 新增部门
export async function addDept(params: Dept.Dept) {
  return request<API.Result<unknown>>('/system/dept', {
    method: 'POST',
    data: params
  });
}

// 修改部门
export async function updateDept(params: Dept.Dept) {
  return request<API.Result<unknown>>('/system/dept', {
    method: 'PUT',
    data: params
  });
}

// 删除部门
export async function removeDept(ids: string) {
  return request<API.Result<unknown>>(`/system/dept/${ids}`, {
    method: 'DELETE'
  });
}
