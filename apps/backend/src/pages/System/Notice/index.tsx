
import DictTag from '@/components/DictTag';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { ActionType, FooterToolbar, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import type { FormInstance } from 'antd';
import { Button, message, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { getDictValueEnum } from '../User/service';
import UpdateForm from './edit';
import { addNotice, getNoticeList, removeNotice, updateNotice } from './service';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: Notice.Notice) => {
  const hide = message.loading('正在添加');
  try {
    const resp = await addNotice({ ...fields });
    hide();
    if (resp.code === 200) {
      message.success('添加成功');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: Notice.Notice) => {
  const hide = message.loading('正在更新');
  try {
    const resp = await updateNotice(fields);
    hide();
    if (resp.code === 200) {
      message.success('更新成功');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: Notice.Notice[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const resp = await removeNotice(selectedRows.map((row) => row.noticeId).join(','));
    hide();
    if (resp.code === 200) {
      message.success('删除成功，即将刷新');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleRemoveOne = async (selectedRow: Notice.Notice) => {
  const hide = message.loading('正在删除');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.noticeId];
    const resp = await removeNotice(params.join(','));
    hide();
    if (resp.code === 200) {
      message.success('删除成功，即将刷新');
    } else {
      message.error(resp.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};



const NoticeTableList: React.FC = () => {
  const formTableRef = useRef<FormInstance>(undefined);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>(undefined);
  const [currentRow, setCurrentRow] = useState<Notice.Notice>();
  const [selectedRows, setSelectedRows] = useState<Notice.Notice[]>([]);
  const [noticeTypeOptions, setNoticeTypeOptions] = useState<any>([]);
  const [statusOptions, setStatusOptions] = useState<any>([]);

  useEffect(() => {
    getDictValueEnum('sys_notice_type').then((data) => {
      setNoticeTypeOptions(data);
    });
    getDictValueEnum('sys_notice_status').then((data) => {
      setStatusOptions(data);
    });
  }, []);

  const columns: ProColumns<Notice.Notice>[] = [
    {
      title: "公告编号",
      dataIndex: 'noticeId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: "公告标题",
      dataIndex: 'noticeTitle',
      valueType: 'text',
    },
    {
      title: "公告类型",
      dataIndex: 'noticeType',
      valueType: 'select',
      valueEnum: noticeTypeOptions,
    },
    {
      title: "公告内容",
      dataIndex: 'noticeContent',
      valueType: 'text',
      hideInTable: true,
    },
    {
      title: "公告状态",
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: statusOptions,
      render: (_, record) => {
        return (<DictTag enums={statusOptions} value={record.status} />);
      },
    },
    {
      title: "备注",
      dataIndex: 'remark',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: "创建时间",
      dataIndex: 'createTime',
      valueType: 'dateRange',
      render: (_, record) => {
        return (<span>{record.createTime.toString()} </span>);
      },
      search: {
        transform: (value) => {
          return {
            'params[beginTime]': value[0],
            'params[endTime]': value[1],
          };
        },
      },
    },
    {
      title: "操作",
      dataIndex: 'option',
      width: '120px',
      valueType: 'option',
      render: (_, record) => [
        <Button
          type="link"
          size="small"
          key="edit"
          onClick={() => {
            setModalVisible(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </Button>,
        <Button
          type="link"
          size="small"
          danger
          key="batchRemove"
          onClick={async () => {
            Modal.confirm({
              title: '删除',
              content: '确定删除该项吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                const success = await handleRemoveOne(record);
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              },
            });
          }}
        >
          删除
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <div style={{ width: '100%', float: 'right' }}>
        <ProTable<Notice.Notice>
          headerTitle={'信息'}
          actionRef={actionRef}
          formRef={formTableRef}
          rowKey="noticeId"
          key="noticeList"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="add"
              onClick={async () => {
                setCurrentRow(undefined);
                setModalVisible(true);
              }}
            >
              新建
            </Button>,
            <Button
              type="primary"
              key="remove"
              danger
              onClick={async () => {
                Modal.confirm({
                  title: '是否确认删除所选数据项?',
                  icon: <ExclamationCircleOutlined />,
                  content: '请谨慎操作',
                  async onOk() {
                    const success = await handleRemove(selectedRows);
                    if (success) {
                      setSelectedRows([]);
                      actionRef.current?.reloadAndRest?.();
                    }
                  },
                  onCancel() { },
                });
              }}
            >
              <DeleteOutlined />
              删除
            </Button>,
          ]}
          request={(params) =>
            getNoticeList({ ...params } as Notice.NoticeListParams).then((res) => {
              const result = {
                data: res.data,
                total: res.total,
                success: true,
              };
              return result;
            })
          }
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => {
              setSelectedRows(selectedRows);
            },
          }}
        />
      </div>
      {selectedRows?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择
              <a style={{ fontWeight: 600 }}>{selectedRows.length}</a>
              项
            </div>
          }
        >
          <Button
            key="remove"
            danger
            onClick={async () => {
              Modal.confirm({
                title: '删除',
                content: '确定删除该项吗？',
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                  const success = await handleRemove(selectedRows);
                  if (success) {
                    setSelectedRows([]);
                    actionRef.current?.reloadAndRest?.();
                  }
                },
              });
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <UpdateForm
        onSubmit={async (values) => {
          let success = false;
          if (values.noticeId) {
            success = await handleUpdate({ ...values } as Notice.Notice);
          } else {
            success = await handleAdd({ ...values } as Notice.Notice);
          }
          if (success) {
            setModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          setModalVisible(false);
          setCurrentRow(undefined);
        }}
        open={modalVisible}
        values={currentRow || {}}
        noticeTypeOptions={noticeTypeOptions}
        statusOptions={statusOptions}
      />
    </PageContainer>
  );
};

export default NoticeTableList;
