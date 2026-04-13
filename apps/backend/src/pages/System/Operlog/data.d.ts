declare namespace Operlog {
  interface Operlog {
    operId: number;
    title: string;
    businessType: number;
    method: string;
    requestMethod: string;
    operatorType: number;
    operName: string;
    deptName: string;
    operUrl: string;
    operIp: string;
    operLocation: string;
    operParam: string;
    jsonResult: string;
    status: number;
    errorMsg: string;
    operTime: Date;
  }

  interface OperlogListParams {
    operId?: string;
    title?: string;
    businessType?: string;
    method?: string;
    requestMethod?: string;
    operatorType?: string;
    operName?: string;
    deptName?: string;
    operUrl?: string;
    operIp?: string;
    operLocation?: string;
    operParam?: string;
    jsonResult?: string;
    status?: string;
    errorMsg?: string;
    operTime?: string;
    pageSize?: string;
    current?: string;
  }

  interface OperlogInfoResult {
    code: number;
    msg: string;
    data: Operlog;
  }

  interface OperlogPageResult {
    code: number;
    msg: string;
    total: number;
    rows: Array<Operlog>;
  }
}
