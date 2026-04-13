declare namespace LoginModal {
  interface IReq {
    code: string;
    uuid: string;
    password: string;
    username: string;
  }

  interface IHisReq {
    /**用户名 */
    username: string
    /**密码 */
    password: string
    /**授权认证-PASSWORD */
    grantType: string
  }
}

declare namespace UserModal {
  interface IUserPrmtr extends IUser {
    user: IUser;
    /**
 * 菜单权限
 */
    permissions: [];
    /**
 * 角色权限
 */
    roles: [];
  }
  interface IUser {
    /**
        * 头像地址
        */
    avatar?: number;
    /**
     * 创建时间
     */
    createTime?: Date;
    /**
     * 部门ID
     */
    deptId?: number;
    /**
     * 部门名
     */
    deptName?: string;
    /**
     * 用户邮箱
     */
    email?: string;
    /**
     * 最后登录时间
     */
    loginDate?: Date;
    /**
     * 最后登录IP
     */
    loginIp?: string;
    /**
     * 用户昵称
     */
    nickName?: string;
    /**
     * 手机号码
     */
    phonenumber?: string;
    /**
     * 岗位组
     */
    postIds?: number[];
    /**
     * 备注
     */
    remark?: string;
    /**
     * 数据权限 当前角色ID
     */
    roleId?: number;
    /**
     * 角色组
     */
    roleIds?: number[];
    /**
     * 角色对象
     */
    roles?: SysRoleVo[];
    /**
     * 用户性别（0男 1女 2未知）
     */
    sex?: string;
    /**
     * 账号状态（0正常 1停用）
     */
    status?: string;
    /**
     * 租户ID
     */
    tenantId?: string;
    /**
     * 用户ID
     */
    userId?: number;
    /**
     * 用户账号
     */
    userName?: string;
    /**
     * 用户类型（sys_user系统用户）
     */
    userType?: string;
    [property: string]: any;
  }
  interface IPassword {
    /**主键	 */
    id: string;
    /**旧密码 */
    oldPassword: string;
    /**密码 */
    password: string;
    /**确认密码 */
    confirmPassword: string;
  }


  interface MenuItemMeta {
    title: string;
    icon: string;
    noCache: boolean;
    link: string;
  };

  /**用户菜单 */
  interface RoutersMenuItem {
    alwaysShow?: boolean;
    children?: RoutersMenuItem[];
    component?: string;
    hidden?: boolean;
    meta: MenuItemMeta;
    name: string;
    path: string;
    redirect?: string;
    [key: string]: any;
  };


  /**
   * 用户菜单
   */
  interface RouterVo {
    /**
     * 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
     */
    alwaysShow?: boolean;
    /**
     * 子路由
     */
    children?: RouterVo[];
    /**
     * 组件地址
     */
    component?: string;
    /**
     * 是否隐藏路由，当设置 true 的时候该路由不会再侧边栏出现
     */
    hidden?: boolean;
    /**
     * 其他元素
     */
    meta?: MetaVo;
    /**
     * 路由名字
     */
    name?: string;
    /**
     * 路由地址
     */
    path?: string;
    /**
     * 路由参数：如 {"id": 1, "name": "ry"}
     */
    query?: string;
    /**
     * 重定向地址，当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
     */
    redirect?: string;
    [property: string]: any;
  }

  /**
   * 其他元素
   *
   * MetaVo，路由显示信息
   */
  interface MetaVo {
    /**
     * 激活菜单
     */
    activeMenu?: string;
    /**
     * 设置该路由的图标，对应路径src/assets/icons/svg
     */
    icon?: string;
    /**
     * 内链地址（http(s)://开头）
     */
    link?: string;
    /**
     * 设置为true，则不会被 <keep-alive>缓存
     */
    noCache?: boolean;
    /**
     * 设置该路由在侧边栏和面包屑中展示的名字
     */
    title?: string;
    [property: string]: any;
  }

}
