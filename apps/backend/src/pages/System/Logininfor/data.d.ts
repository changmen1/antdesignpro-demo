declare namespace Logininfor {
  interface Logininfor {
    infoId: number;
    userName: string;
    ipaddr: string;
    loginLocation: string;
    browser: string;
    os: string;
    status: string;
    msg: string;
    loginTime: Date;
  }

  interface LogininforListParams {
    infoId?: string;
    userName?: string;
    ipaddr?: string;
    loginLocation?: string;
    browser?: string;
    os?: string;
    status?: string;
    msg?: string;
    loginTime?: string;
    pageSize?: string;
    current?: string;
  }

  interface LogininforInfoResult {
    code: number;
    msg: string;
    data: Logininfor;
  }

  interface LogininforPageResult {
    code: number;
    msg: string;
    total: number;
    rows: Array<Logininfor>;
  }
}
