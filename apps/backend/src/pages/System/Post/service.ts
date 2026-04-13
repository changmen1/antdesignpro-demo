import { downLoadXlsx } from '@/utils/downloadfile';
import { request } from '@umijs/max';
import { API } from 'types';

// 查询岗位信息列表
export async function getPostList(params?: Post.PostListParams) {
  return request('/system/post/list', {
    method: 'GET',
    params
  });
}

// 查询岗位信息详细
export function getPost(postId: number) {
  return request<API.Result<unknown>>(`/system/post/${postId}`, {
    method: 'GET'
  });
}

// 新增岗位信息
export async function addPost(params: Post.Post) {
  return request<API.Result<unknown>>('/system/post', {
    method: 'POST',
    data: params
  });
}

// 修改岗位信息
export async function updatePost(params: Post.Post) {
  return request<API.Result<unknown>>('/system/post', {
    method: 'PUT',
    data: params
  });
}

// 删除岗位信息
export async function removePost(ids: string) {
  return request<API.Result<unknown>>(`/system/post/${ids}`, {
    method: 'DELETE'
  });
}

// 导出岗位信息
export function exportPost(params?: Post.PostListParams) {
  return downLoadXlsx(`/system/post/export`, { params }, `post_${new Date().getTime()}.xlsx`);
}
