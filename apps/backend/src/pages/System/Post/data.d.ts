declare namespace Post {
  interface Post {
    postId: number;
    postCode: string;
    postName: string;
    postSort: number;
    status: string;
    createBy: string;
    createTime: Date;
    updateBy: string;
    updateTime: Date;
    remark: string;
  }

  interface PostListParams {
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

  interface PostInfoResult {
    code: number;
    msg: string;
    data: Post;
  }

  interface PostPageResult {
    code: number;
    msg: string;
    total: number;
    rows: Array<Post>;
  }
}
