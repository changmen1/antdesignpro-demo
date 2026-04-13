import { downLoadXlsx } from '@/utils/downloadfile';
import { request } from '@umijs/max';
import { API } from 'types';

// 查询系统访问记录列表
export async function getLogininforList(params?: Logininfor.LogininforListParams) {
  return request('/monitor/logininfor/list', {
    method: 'GET',
    params
  });
}

// 查询系统访问记录详细
export function getLogininfor(infoId: number) {
  return request<Logininfor.LogininforInfoResult>(`/monitor/logininfor/${infoId}`, {
    method: 'GET'
  });
}

// 新增系统访问记录
export async function addLogininfor(params: Logininfor.Logininfor) {
  return request<API.Result<unknown>>('/monitor/logininfor', {
    method: 'POST',
    data: params
  });
}

// 修改系统访问记录
export async function updateLogininfor(params: Logininfor.Logininfor) {
  return request<API.Result<unknown>>('/monitor/logininfor', {
    method: 'PUT',
    data: params
  });
}

// 删除系统访问记录
export async function removeLogininfor(ids: string) {
  return request<API.Result<unknown>>(`/monitor/logininfor/${ids}`, {
    method: 'DELETE'
  });
}

// 导出系统访问记录
export function exportLogininfor(params?: Logininfor.LogininforListParams) {
  return downLoadXlsx(`/monitor/logininfor/export`, { params }, `logininfor_${new Date().getTime()}.xlsx`);
}

// 解锁用户登录状态
export function unlockLogininfor(userName: string) {
  return request<API.Result<unknown>>('/monitor/logininfor/unlock/' + userName, {
    method: 'get'
  })
}

// 清空登录日志
export function cleanLogininfor() {
  return request<API.Result<unknown>>('/monitor/logininfor/clean', {
    method: 'delete'
  })
}
