declare namespace Dict {
  interface DictType {
    dictId: number;
    dictName: string;
    dictType: string;
    status: string;
    createBy: string;
    createTime: Date;
    updateBy: string;
    updateTime: Date;
    remark: string;
  }

  interface DictTypeListParams {
    dictId?: string;
    dictName?: string;
    dictType?: string;
    status?: string;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
    pageSize?: string;
    currentPage?: string;
    filter?: string;
    sorter?: string;
  }

  interface DictTypeInfoResult {
    code: number;
    msg: string;
    data: Dict;
  }

  interface DictTypePageResult {
    code: number;
    msg: string;
    total: number;
    rows: Array<Dict>;
  }

  interface DictTypeResult {
    code: number;
    msg: string;
    data: Array<Dict>;
  }
}
