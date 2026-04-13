export namespace API {
  export type Result<T> = {
    code: number;
    msg: string;
    data?: Record<string, any>;
    total: number;
  };

  export type PageInfoRes<T> = Omit<Result<T>, 'rows'> & {
    total: number;
    rows: T[];
  };
  export type PageInfoReq<T> = {
    [P in keyof T]: T[P];
  } & {
    current?: number;
    pageSize?: number;
  };
}

export interface ISelect {
  label: string;
  value: string;
}

