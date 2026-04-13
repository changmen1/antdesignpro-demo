declare namespace Config {
  interface Config {
    configId: number;
    configName: string;
    configKey: string;
    configValue: string;
    configType: string;
    createBy: string;
    createTime: Date;
    updateBy: string;
    updateTime: Date;
    remark: string;
  }

  interface ConfigListParams {
    configId?: string;
    configName?: string;
    configKey?: string;
    configValue?: string;
    configType?: string;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
    pageSize?: string;
    current?: string;
  }

  interface ConfigInfoResult {
    code: number;
    msg: string;
    data: Config;
  }

  interface ConfigPageResult {
    code: number;
    msg: string;
    total: number;
    rows: Array<Config>;
  }
}
