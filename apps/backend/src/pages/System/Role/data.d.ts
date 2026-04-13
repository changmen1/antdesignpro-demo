declare namespace Role {
  interface Role {
    roleId: number;
    roleName: string;
    roleKey: string;
    roleSort: number;
    dataScope: string;
    menuCheckStrictly: number;
    deptCheckStrictly: number;
    status: string;
    delFlag: string;
    createBy: string;
    createTime: Date;
    updateBy: string;
    updateTime: Date;
    remark: string;
  }

  interface RoleListParams {
    roleId?: string;
    roleName?: string;
    roleKey?: string;
    roleSort?: string;
    dataScope?: string;
    menuCheckStrictly?: string;
    deptCheckStrictly?: string;
    status?: string;
    delFlag?: string;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
    pageSize?: string;
    current?: string;
  }

  interface RoleInfoResult {
    code: number;
    msg: string;
    data: Role;
  }

  interface RolePageResult {
    code: number;
    msg: string;
    total: number;
    rows: Array<Role>;
  }

  interface RoleMenuNode {
    id: number | string;
    label: string;
    children?: Array<RoleMenuNode>;
  }
  interface RoleMenuResult {
    code: number;
    msg: string;
    checkedKeys: number[];
    menus: Array<RoleMenuNode>;
  }
}
