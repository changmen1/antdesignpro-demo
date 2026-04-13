import { downLoadXlsx } from '@/utils/downloadfile';
import { request } from '@umijs/max';
import { API } from 'types';

// 查询操作日志记录列表
export async function getOperlogList(params?: Operlog.OperlogListParams) {
  return request('/monitor/operlog/list', {
    method: 'GET',
    params
  });
}

// 查询操作日志记录详细
export function getOperlog(operId: number) {
  return request<API.Result<unknown>>(`/monitor/operlog/${operId}`, {
    method: 'GET'
  });
}

// 新增操作日志记录
export async function addOperlog(params: Operlog.Operlog) {
  return request<API.Result<unknown>>('/monitor/operlog', {
    method: 'POST',
    data: params
  });
}

// 修改操作日志记录
export async function updateOperlog(params: Operlog.Operlog) {
  return request<API.Result<unknown>>('/monitor/operlog', {
    method: 'PUT',
    data: params
  });
}

// 删除操作日志记录
export async function removeOperlog(ids: string) {
  return request<API.Result<unknown>>(`/monitor/operlog/${ids}`, {
    method: 'DELETE'
  });
}

export async function cleanAllOperlog() {
  return request<API.Result<unknown>>(`/monitor/operlog/clean`, {
    method: 'DELETE'
  });
}

// 导出操作日志记录
export function exportOperlog(params?: Operlog.OperlogListParams) {
  return downLoadXlsx(`/monitor/operlog/export`, { params }, `operlog_${new Date().getTime()}.xlsx`);
}
