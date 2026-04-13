
import DictTag from '@/components/DictTag';
import { DeleteOutlined, DownloadOutlined, ExclamationCircleOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { ActionType, FooterToolbar, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import type { FormInstance } from 'antd';
import { Button, message, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { getDictValueEnum } from '../User/service';
import UpdateForm from './edit';
import { addConfig, exportConfig, getConfigList, refreshConfigCache, removeConfig, updateConfig } from './service';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: Config.Config) => {
  const hide = message.loading('正在添加');
  try {
    const resp = await addConfig({ ...fields });
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
const handleUpdate = async (fields: Config.Config) => {
  const hide = message.loading('正在更新');
  try {
    const resp = await updateConfig(fields);
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
const handleRemove = async (selectedRows: Config.Config[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const resp = await removeConfig(selectedRows.map((row) => row.configId).join(','));
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

const handleRemoveOne = async (selectedRow: Config.Config) => {
  const hide = message.loading('正在删除');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.configId];
    const resp = await removeConfig(params.join(','));
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

/**
 * 导出数据
 *
 *
 */
const handleExport = async () => {
  const hide = message.loading('正在导出');
  try {
    await exportConfig();
    hide();
    message.success('导出成功');
    return true;
  } catch (error) {
    hide();
    message.error('导出失败，请重试');
    return false;
  }
};

const handleRefreshCache = async () => {
  const hide = message.loading('正在刷新');
  try {
    await refreshConfigCache();
    hide();
    message.success('刷新成功');
    return true;
  } catch (error) {
    hide();
    message.error('刷新失败，请重试');
    return false;
  }
};

const Config: React.FC = () => {
  const formTableRef = useRef<FormInstance>(undefined);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>(undefined);
  const [currentRow, setCurrentRow] = useState<Config.Config>();
  const [selectedRows, setSelectedRows] = useState<Config.Config[]>([]);
  const [configTypeOptions, setConfigTypeOptions] = useState<any>([]);

  useEffect(() => {
    getDictValueEnum('sys_yes_no').then((data) => {
      setConfigTypeOptions(data);
    });
  }, []);

  const columns: ProColumns<Config.Config>[] = [
    {
      title: "参数主键",
      dataIndex: 'configId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: "参数名称",
      dataIndex: 'configName',
      valueType: 'text',
    },
    {
      title: "参数键名",
      dataIndex: 'configKey',
      valueType: 'text',
    },
    {
      title: "参数键值",
      dataIndex: 'configValue',
      valueType: 'textarea',
    },
    {
      title: "系统内置",
      dataIndex: 'configType',
      valueType: 'select',
      valueEnum: configTypeOptions,
      render: (_, record) => {
        return (<DictTag enums={configTypeOptions} value={record.configType} />);
      },
    },
    {
      title: "备注",
      dataIndex: 'remark',
      valueType: 'textarea',
      hideInSearch: true,
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
        <ProTable<Config.Config>
          headerTitle={'信息'}
          actionRef={actionRef}
          formRef={formTableRef}
          rowKey="configId"
          key="configList"
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
              <PlusOutlined />新建
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
            <Button
              type="primary"
              key="export"
              onClick={async () => {
                handleExport();
              }}
            >
              <DownloadOutlined />
              导出
            </Button>,
            <Button
              type="primary"
              key="refresh"
              danger
              onClick={async () => {
                handleRefreshCache();
              }}
            >
              <ReloadOutlined />
              刷新缓存
            </Button>,
          ]}
          request={(params) =>
            getConfigList({ ...params } as Config.ConfigListParams).then((res) => {
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
          if (values.configId) {
            success = await handleUpdate({ ...values } as Config.Config);
          } else {
            success = await handleAdd({ ...values } as Config.Config);
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
        configTypeOptions={configTypeOptions}
      />
    </PageContainer>
  );
};

export default Config;
