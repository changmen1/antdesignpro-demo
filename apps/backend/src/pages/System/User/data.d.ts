declare namespace User {

  /**查询用户信息列表 */
  interface IUserListParams {
    userId?: string;
    deptId?: string;
    userName?: string;
    nickName?: string;
    userType?: string;
    email?: string;
    phonenumber?: string;
    sex?: string;
    avatar?: string;
    password?: string;
    status?: string;
    delFlag?: string;
    loginIp?: string;
    loginDate?: string;
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

  /**新增用户信息 */
  interface IAddUser {
    userId: number;
    deptId: number;
    userName: string;
    nickName: string;
    userType: string;
    email: string;
    phonenumber: string;
    sex: string;
    avatar: string;
    password: string;
    status: string;
    delFlag: string;
    loginIp: string;
    loginDate: Date;
    createBy: string;
    createTime: Date;
    updateBy: string;
    updateTime: Date;
    remark: string;
  }

  /**修改用户信息 */
  interface IUpdateUser extends IAddUser { }

  /**查询字典类型列表 */
  interface IDictTypeListParams {
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

  /**查询岗位信息列表 */
  interface IPostListParams {
    postId?: string;
    postCode?: string;
    postName?: string;
    postSort?: string;
    status?: string;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
    pageSize?: string;
    current?: string;
  }

  /**查询角色信息列表 */
  interface IRoleListParams {
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

  // TODO 属于字典的类型 需要迁移
  interface IDictTypeResult {
    code: number;
    msg: string;
    data: Array<Dict>;
  }
}
