import { request } from '@umijs/max';
import { API } from 'types';

// 查询通知公告列表
export async function getNoticeList(params?: Notice.NoticeListParams) {
  return request('/system/notice/list', {
    method: 'GET',
    params
  });
}

// 查询通知公告详细
export function getNotice(noticeId: number) {
  return request<API.Result<unknown>>(`/system/notice/${noticeId}`, {
    method: 'GET'
  });
}

// 新增通知公告
export async function addNotice(params: Notice.Notice) {
  return request<API.Result<unknown>>('/system/notice', {
    method: 'POST',
    data: params
  });
}

// 修改通知公告
export async function updateNotice(params: Notice.Notice) {
  return request<API.Result<unknown>>('/system/notice', {
    method: 'PUT',
    data: params
  });
}

// 删除通知公告
export async function removeNotice(ids: string) {
  return request<API.Result<unknown>>(`/system/notice/${ids}`, {
    method: 'DELETE'
  });
}
