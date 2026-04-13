declare namespace Notice {
  interface Notice {
    noticeId: number;
    noticeTitle: string;
    noticeType: string;
    noticeContent: string;
    status: string;
    createBy: string;
    createTime: Date;
    updateBy: string;
    updateTime: Date;
    remark: string;
  }

  interface NoticeListParams {
    noticeId?: string;
    noticeTitle?: string;
    noticeType?: string;
    noticeContent?: string;
    status?: string;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
    pageSize?: string;
    current?: string;
  }

  interface NoticeInfoResult {
    code: number;
    msg: string;
    data: Notice;
  }

  interface NoticePageResult {
    code: number;
    msg: string;
    total: number;
    rows: Array<Notice>;
  }
}
