import logo from "@/assents/davidlogo.png";
import { FontSizeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Alert, Col, InputRef, message, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import mystyles from './index.less';
import { getcaptcha, loginApi } from './service';

const Page = () => {
  const [userLoginState, setUserLoginState] = useState<string>('');
  const [formState, setFormState] = useState('');
  const [uuid, setUuid] = useState<string>()
  const passwordRef = useRef<InputRef>(null);
  const codeRef = useRef<InputRef>(null);
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    console.log('用户信息', userInfo)
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const fetchMenus = async () => {
    const menus = await initialState?.fetchMenus?.();
    if (menus) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          menus: menus,
        }));
      });
    }
  };

  /**获取验证码 */
  const buildCaptcha = async () => {
    try {
      const res = await getcaptcha();
      setFormState("data:image/gif;base64," + res.data.img)
      setUuid(res.data.uuid)
      return
    } catch {
      return '';
    }
  };

  const handleSubmit = async (values: LoginModal.IReq) => {
    const datas = {
      uuid: uuid!,
    };
    const data = { ...values, ...datas };
    // 登录
    const msg = await loginApi({ ...data }).catch((error) => {
      buildCaptcha();
    });
    console.log('登录信息', msg)
    setUserLoginState(msg.msg);
    if (msg.code === 200) {
      message.success('登录成功');
      sessionStorage.setItem('token', msg.data.access_token);
      await fetchUserInfo();
      await fetchMenus();
      history.push('/');
      return;
    }
  };

  const LoginMessage: React.FC<{
    content: string;
  }> = ({ content }) => {
    return (
      <Alert
        style={{
          marginBottom: 24,
        }}
        message={content}
        type="error"
        showIcon
      />
    );
  };

  useEffect(() => {
    buildCaptcha();
  }, []);

  return (
    <div className={mystyles.loginContainer}>
      <div className={mystyles.loginBox}>
        <div className={mystyles.leftPanel}>
          <div className={mystyles.subTitle}>SaaS management system</div>
          <div className={mystyles.mainTitle}>戴维黄疸管理系统</div>
          <div className={mystyles.footTitle}>后台管理系统</div>
        </div>
        <div className={mystyles.rightPanel}>
          {userLoginState && <LoginMessage content={`${userLoginState}`} />}
          <LoginForm
            title={false}
            subTitle={false}
            onFinish={handleSubmit}
            submitter={{
              searchConfig: { submitText: '登 录' }
            }}
          >
            <div style={{ textAlign: 'center', width: '100%', marginBottom: 5 }}>
              <img src={logo} style={{ height: 40 }} alt="logo" />
              <div style={{ fontSize: 18, color: '#2b9fa3', fontWeight: 'bold', marginTop: 5 }}>智慧黄疸</div>
              <div style={{ fontSize: 10, color: '#2b9fa3', letterSpacing: 2 }}>— SMART OLD AGEING —</div>
            </div>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
                onPressEnter: () => {
                  passwordRef.current?.focus()
                },
              }}
              placeholder={'用户名'}
              rules={[
                {
                  required: true,
                  message: '用户名是必填项',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                ref: passwordRef,
                prefix: <LockOutlined />,
                onPressEnter: () => {
                  codeRef.current?.focus()
                },
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '密码是必填项',
                },
              ]}
            />
            <Row>
              <Col span={14}>
                <ProFormText
                  placeholder="验证码"
                  rules={[
                    {
                      required: true,
                      message: '验证码是必填项',
                    },
                  ]}
                  fieldProps={{
                    size: 'large',
                    ref: codeRef,
                    prefix: <FontSizeOutlined />,
                  }}
                  name="code"
                />
              </Col>
              <Col span={1}></Col>
              <Col span={1}>
                {formState ? (
                  <img
                    src={formState}
                    alt="captcha"
                    className={mystyles.code}
                    onClick={buildCaptcha}
                  />
                ) : (
                  <img
                    src="/captcha_404.png"
                    alt="captcha"
                    className={mystyles.code}
                    onClick={buildCaptcha}
                  />
                )}
              </Col>
            </Row>
          </LoginForm>
        </div>
      </div>
    </div>
  );
};

export default () => {
  return (
    <Page />
  );
};
