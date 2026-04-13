import { DictValueEnumObj } from "@/components/DictTag";
import {
  ProForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from "@ant-design/pro-components";
import { Form, Modal } from "antd";
import React, { useEffect } from "react";
import { getDeptTree } from "./service";

export type UserFormData = Record<string, unknown> & Partial<User.IAddUser>;

export type UserFormProps = {
  onCancel: (flag?: boolean, formVals?: UserFormData) => void;
  onSubmit: (values: UserFormData) => Promise<void>;
  open: boolean;
  values: Partial<User.IAddUser>;
  sexOptions: DictValueEnumObj;
  statusOptions: DictValueEnumObj;
  postIds: number[];
  posts: string[];
  roleIds: number[];
  roles: string[];
};

const UserForm: React.FC<UserFormProps> = (props) => {
  const [form] = Form.useForm();
  const userId = Form.useWatch("userId", form);
  const { sexOptions, statusOptions } = props;
  const { roles, posts } = props;

  useEffect(() => {
    console.log(props.values, "xxxx");
    console.log(props.postIds, "yy");

    form.resetFields();
    form.setFieldsValue({
      userId: props.values.userId,
      deptId: props.values.deptId,
      postIds: props.postIds,
      roleIds: props.roleIds,
      userName: props.values.userName,
      nickName: props.values.nickName,
      email: props.values.email,
      phonenumber: props.values.phonenumber,
      sex: props.values.sex,
      avatar: props.values.avatar,
      status: props.values.status,
      delFlag: props.values.delFlag,
      loginIp: props.values.loginIp,
      loginDate: props.values.loginDate,
      remark: props.values.remark,
    });
  }, [form, props]);

  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.onCancel();
  };
  const handleFinish = async (values: Record<string, any>) => {
    props.onSubmit(values as UserFormData);
  };

  return (
    <Modal
      width={640}
      title={userId ? "编辑用户" : "新增用户"}
      open={props.open}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <ProForm
        grid={true}
        form={form}
        layout="horizontal"
        submitter={false}
        onFinish={handleFinish}
      >
        <ProFormText name="userId" hidden />
        <ProFormText
          name="nickName"
          label={"用户昵称"}
          placeholder="请输入用户昵称"
          colProps={{ xs: 24, md: 12, xl: 12 }}
          rules={[
            {
              required: true,
              message: "请输入用户昵称！",
            },
          ]}
        />
        <ProFormTreeSelect
          name="deptId"
          label={"部门"}
          placeholder="请输入用户部门"
          colProps={{ md: 12, xl: 12 }}
          request={() => getDeptTree({})}
          rules={[
            {
              required: true,
              message: "请输入用户部门！",
            },
          ]}
        />
        <ProFormText
          name="phonenumber"
          label={"手机号码"}
          placeholder="请输入手机号码"
          colProps={{ md: 12, xl: 12 }}
          rules={[
            {
              required: false,
              message: "请输入手机号码！",
            },
          ]}
        />
        <ProFormText
          name="email"
          label={"用户邮箱"}
          placeholder="请输入用户邮箱"
          colProps={{ md: 12, xl: 12 }}
          rules={[
            {
              required: false,
              message: "请输入用户邮箱！",
            },
          ]}
        />
        <ProFormText
          name="userName"
          label={"用户账号"}
          hidden={userId}
          placeholder="请输入用户账号"
          colProps={{ md: 12, xl: 12 }}
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          label={"密码"}
          hidden={userId}
          placeholder="请输入密码"
          colProps={{ md: 12, xl: 12 }}
          rules={[
            {
              required: false,
              message: "请输入密码！",
            },
          ]}
        />
        <ProFormSelect
          valueEnum={sexOptions}
          name="sex"
          label={"用户性别"}
          initialValue={"0"}
          placeholder="请输入用户性别"
          colProps={{ md: 12, xl: 12 }}
          rules={[
            {
              required: false,
              message: "请输入用户性别！",
            },
          ]}
        />
        <ProFormRadio.Group
          valueEnum={statusOptions}
          name="status"
          label={"帐号状态"}
          initialValue={"0"}
          placeholder="请输入帐号状态"
          colProps={{ md: 12, xl: 12 }}
          rules={[
            {
              required: false,
              message: "请输入帐号状态！",
            },
          ]}
        />
        <ProFormSelect
          name="postIds"
          mode="multiple"
          label={"岗位"}
          options={posts}
          placeholder="请选择岗位"
          colProps={{ md: 12, xl: 12 }}
          rules={[{ required: true, message: "请选择岗位!" }]}
        />
        <ProFormSelect
          name="roleIds"
          mode="multiple"
          label={"角色"}
          options={roles}
          placeholder="请选择角色"
          colProps={{ md: 12, xl: 12 }}
          rules={[{ required: true, message: "请选择角色!" }]}
        />
        <ProFormTextArea
          name="remark"
          label={"备注"}
          placeholder="请输入备注"
          colProps={{ md: 24, xl: 24 }}
          rules={[
            {
              required: false,
              message: "请输入备注！",
            },
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default UserForm;
