import { downLoadXlsx } from '@/utils/downloadfile';
import { request } from '@umijs/max';
import { API } from 'types';

// 查询参数配置列表
export async function getConfigList(params?: Config.ConfigListParams) {
  return request('/system/config/list', {
    method: 'GET',
    params
  });
}

// 查询参数配置详细
export function getConfig(configId: number) {
  return request<API.Result<unknown>>(`/system/config/${configId}`, {
    method: 'GET'
  });
}

// 新增参数配置
export async function addConfig(params: Config.Config) {
  return request<API.Result<unknown>>('/system/config', {
    method: 'POST',
    data: params
  });
}

// 修改参数配置
export async function updateConfig(params: Config.Config) {
  return request<API.Result<unknown>>('/system/config', {
    method: 'PUT',
    data: params
  });
}

// 删除参数配置
export async function removeConfig(ids: string) {
  return request<API.Result<unknown>>(`/system/config/${ids}`, {
    method: 'DELETE'
  });
}

// 导出参数配置
export function exportConfig(params?: Config.ConfigListParams) {
  return downLoadXlsx(`/system/config/export`, { params }, `config_${new Date().getTime()}.xlsx`);
}


// 刷新参数缓存
export function refreshConfigCache() {
  return request<API.Result<unknown>>('/system/config/refreshCache', {
    method: 'delete'
  })
}
