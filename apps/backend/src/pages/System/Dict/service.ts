import { DictValueEnumObj } from '@/components/DictTag';
import { downLoadXlsx } from '@/utils/downloadfile';
import { request } from '@umijs/max';
import { API } from 'types';

// 查询字典类型列表
export async function getDictTypeList(params?: Dict.DictTypeListParams) {
  return request(`/system/dict/type/list`, {
    params: {
      ...params,
    },
    method: 'GET',
  });
}

// 查询字典类型详细
export function getDictType(dictId: string) {
  return request(`/system/dict/type/${dictId}`, {
    method: 'GET',
  });
}

// 查询字典数据详细
export async function getDictValueEnum(dictType: string, isDigital?: boolean): Promise<DictValueEnumObj> {
  const resp = await request<Dict.DictTypeResult>(`/system/dict/data/type/${dictType}`, {
    method: 'GET',
  });
  if (resp.code === 200) {
    const opts: DictValueEnumObj = {};
    resp.data.forEach((item: any) => {
      opts[item.dictValue] = {
        text: item.dictLabel,
        label: item.dictLabel,
        value: isDigital ? Number(item.dictValue) : item.dictValue,
        key: item.dictCode,
        listClass: item.listClass,
        status: item.listClass
      };
    });
    return opts;
  } else {
    return {};
  }
}

export async function getDictSelectOption(dictType: string, isDigital?: boolean) {
  const resp = await request<Dict.DictTypeResult>(`/system/dict/data/type/${dictType}`, {
    method: 'GET',
  });
  if (resp.code === 200) {
    const options: DictValueEnumObj[] = resp.data.map((item) => {
      return {
        text: item.dictLabel,
        label: item.dictLabel,
        value: isDigital ? Number(item.dictValue) : item.dictValue,
        key: item.dictCode,
        listClass: item.listClass,
        status: item.listClass
      };
    });
    return options;
  }
  return [];
};

// 新增字典类型
export async function addDictType(params: Dict.DictType) {
  return request<API.Result<unknown>>('/system/dict/type', {
    method: 'POST',
    data: params
  });
}

// 修改字典类型
export async function updateDictType(params: Dict.DictType) {
  return request<API.Result<unknown>>('/system/dict/type', {
    method: 'PUT',
    data: params
  });
}

// 删除字典类型
export async function removeDictType(ids: string) {
  return request<API.Result<unknown>>(`/system/dict/type/${ids}`, {
    method: 'DELETE'
  });
}

// 导出字典类型
export function exportDictType(params?: Dict.DictTypeListParams) {
  return downLoadXlsx(`/system/dict/type/export`, { params }, `dict_type_${new Date().getTime()}.xlsx`);
}

// 获取字典选择框列表
export async function getDictTypeOptionSelect(params?: Dict.DictTypeListParams) {
  return request('/system/dict/type/optionselect', {
    params: {
      ...params,
    },
    method: 'GET',
  });
}
