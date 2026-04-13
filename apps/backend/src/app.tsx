import {
  AvatarDropdown,
  AvatarName,
  Question,
} from '@/components';
import { LinkOutlined } from '@ant-design/icons';
import { SettingDrawer, type Settings as LayoutSettings, type MenuDataItem } from '@ant-design/pro-components';
import '@ant-design/v5-patch-for-react-19';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { getRouters, getUserInfo, } from './pages/user/login/service';
import { errorConfig } from './requestErrorConfig';
import { createIcon } from './utils/IconUtil';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * @see https://umijs.org/docs/api/runtime-config#getinitialstate
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: UserModal.IUserPrmtr;
  menus?: UserModal.RoutersMenuItem;
  loading?: boolean;
  fetchUserInfo?: () => Promise<UserModal.IUserPrmtr | undefined>;
  fetchMenus?: () => Promise<UserModal.RoutersMenuItem | undefined>;
}> {
  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      const msg = await getUserInfo();
      if (msg.code === 401) {
        history.push(loginPath);
      }
      if (!msg.data.user.avatar) {
        msg.data.user.avatar =
          'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      }
      return {
        ...msg.data.user,
        permissions: msg.data.permissions,
        roles: msg.data.roles,
      } as any;
    } catch (_error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 获取用户菜单
  const fetchMenus = async () => {
    try {
      const msg = await getRouters();
      return msg.data;
    } catch (error) {
      return undefined;
    }
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const initialState = {
      fetchUserInfo,
      fetchMenus,
      loading: true,
      settings: defaultSettings as Partial<LayoutSettings>,
    };

    const [currentUser, menus] = await Promise.all([
      fetchUserInfo(),
      fetchMenus()
    ]);

    return {
      ...initialState,
      currentUser,
      menus,
      loading: false,
    };
  }
  return {
    fetchUserInfo,
    fetchMenus,
    loading: false,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  const { switchTabs } = defaultSettings;
  const transformMenu = (menu: any): MenuDataItem => {
    const { meta = {}, children, hidden, ...rest } = menu;
    const newItem: MenuDataItem = {
      ...rest,
      hideInMenu: hidden ?? false,
      name: meta.title,
      icon: createIcon(meta?.icon),
      children: children?.map(transformMenu),
    };
    return newItem;
  };
  return {
    menuDataRender: () => {
      const routerList = initialState?.menus ?? [];
      return routerList.map(transformMenu) || [];
    },
    menuItemRender: (menuItemProps: MenuDataItem, defaultDom: any) => {
      const icon = menuItemProps.icon ? (
        <span
          style={{
            marginRight: '.3125rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {menuItemProps.icon}
        </span>
      ) : null;
      return (
        <Link to={menuItemProps.path!} style={{ display: 'flex', alignItems: 'center' }}>
          {icon}
          <div>{defaultDom}</div>
        </Link>
      );
    },
    actionsRender: () => [
      <Question key="doc" />,
    ],
    avatarProps: {
      // src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown menu={true}>{avatarChildren}</AvatarDropdown>;
      },
    },
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
        <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined />
          <span>OpenAPI 文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
  // baseURL: 'https://proapi.azurewebsites.net',
  ...errorConfig,
};
