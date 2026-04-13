import DictTag from '@/components/DictTag';
import { buildTreeData } from '@/utils/tree';
import { DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, FooterToolbar, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import { DataNode } from 'antd/es/tree';
import React, { useEffect, useRef, useState } from 'react';
import { getDictValueEnum } from '../User/service';
import UpdateForm from './edit';
import { addMenu, getMenuList, removeMenu, updateMenu } from './service';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: Menu.Menu) => {
  const hide = message.loading('正在添加');
  try {
    await addMenu({ ...fields });
    hide();
    message.success('添加成功');
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
const handleUpdate = async (fields: Menu.Menu) => {
  const hide = message.loading('正在配置');
  try {
    await updateMenu(fields);
    hide();
    message.success('配置成功');
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
const handleRemove = async (selectedRows: Menu.Menu[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeMenu(selectedRows.map((row) => row.menuId).join(','));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleRemoveOne = async (selectedRow: Menu.Menu) => {
  const hide = message.loading('正在删除');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.menuId];
    await removeMenu(params.join(','));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};


const Menu: React.FC = () => {

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>(undefined);
  const [currentRow, setCurrentRow] = useState<Menu.Menu>();
  const [selectedRows, setSelectedRows] = useState<Menu.Menu[]>([]);

  const [menuTree, setMenuTree] = useState<DataNode[]>([]);
  const [visibleOptions, setVisibleOptions] = useState<any>([]);
  const [statusOptions, setStatusOptions] = useState<any>([]);

  useEffect(() => {
    getDictValueEnum('sys_show_hide').then((data) => {
      setVisibleOptions(data);
    });
    getDictValueEnum('sys_normal_disable').then((data) => {
      setStatusOptions(data);
    });
  }, []);

  const columns: ProColumns<Menu.Menu>[] = [
    {
      title: "菜单名称",
      dataIndex: 'menuName',
      valueType: 'text',
    },
    {
      title: "菜单图标",
      dataIndex: 'icon',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: "显示顺序",
      dataIndex: 'orderNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: "组件路径",
      dataIndex: 'component',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: "权限标识",
      dataIndex: 'perms',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: "菜单状态",
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: statusOptions,
      render: (_, record) => {
        return (<DictTag enums={statusOptions} value={record.status} />);
      },
    },
    {
      title: "操作",
      dataIndex: 'option',
      width: '220px',
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
        <ProTable<Menu.Menu>
          headerTitle={'信息'}
          actionRef={actionRef}
          rowKey="menuId"
          key="menuList"
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
              <PlusOutlined /> 新建
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
            getMenuList({ ...params } as Menu.MenuListParams).then((res) => {
              const rootMenu = { id: 0, label: '主类目', children: [] as DataNode[], value: 0 };
              const memuData = buildTreeData(res.data, 'menuId', 'menuName', '', '', '');
              rootMenu.children = memuData;
              const treeData: any = [];
              treeData.push(rootMenu);
              setMenuTree(treeData);
              return {
                data: memuData,
                total: res.data.length,
                success: true,
              };
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
            "批量删除"
          </Button>
        </FooterToolbar>
      )}
      <UpdateForm
        onSubmit={async (values) => {
          let success = false;
          if (values.menuId) {
            success = await handleUpdate({ ...values } as Menu.Menu);
          } else {
            success = await handleAdd({ ...values } as Menu.Menu);
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
        visibleOptions={visibleOptions}
        statusOptions={statusOptions}
        menuTree={menuTree}
      />
    </PageContainer>
  );
};

export default Menu;
