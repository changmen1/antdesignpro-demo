declare namespace Dept {
  interface Dept {
    deptId: number;
    parentId: number;
    ancestors: string;
    deptName: string;
    orderNum: number;
    leader: string;
    phone: string;
    email: string;
    status: string;
    delFlag: string;
    createBy: string;
    createTime: Date;
    updateBy: string;
    updateTime: Date;
  }

  interface DeptListParams {
    deptId?: string;
    parentId?: string;
    ancestors?: string;
    deptName?: string;
    orderNum?: string;
    leader?: string;
    phone?: string;
    email?: string;
    status?: string;
    delFlag?: string;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    pageSize?: string;
    current?: string;
  }

  interface DeptInfoResult {
    code: number;
    msg: string;
    data: Dept;
  }

  interface DeptPageResult {
    code: number;
    msg: string;
    total: number;
    data: Array<Dept>;
  }
}
