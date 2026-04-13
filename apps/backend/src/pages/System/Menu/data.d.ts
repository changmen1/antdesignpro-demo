declare namespace Menu {
  interface Menu {
    menuId: number;
    menuName: string;
    parentId: number;
    orderNum: number;
    path: string;
    component: string;
    query: string;
    isFrame: number;
    isCache: number;
    menuType: string;
    visible: string;
    status: string;
    perms: string;
    icon: string;
    createBy: string;
    createTime: Date;
    updateBy: string;
    updateTime: Date;
    remark: string;
  }

  interface MenuListParams {
    menuId?: string;
    menuName?: string;
    parentId?: string;
    orderNum?: string;
    path?: string;
    component?: string;
    query?: string;
    isFrame?: string;
    isCache?: string;
    menuType?: string;
    visible?: string;
    status?: string;
    perms?: string;
    icon?: string;
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

  interface MenuInfoResult {
    current: number;
    pageSize: number;
    total: number;
    data: Menu;
  }

  interface MenuPageResult {
    current: number;
    pageSize: number;
    total: number;
    data: Array<Menu>;
  }
}
