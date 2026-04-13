import type { ProLayoutProps } from "@ant-design/pro-components";
import { Mode, UseSwitchTabsOptions } from "use-switch-tabs";

export type SwitchTabsOptions = {
  mode: Mode;
  /** 固定标签页头部 */
  fixed?: boolean;
  /** 是否在顶栏显示刷新按钮 */
  reloadable?: boolean;
} & Pick<UseSwitchTabsOptions, "persistent">;

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
  switchTabs?: SwitchTabsOptions;
} = {
  navTheme: "light",
  // "colorPrimary": "#1890ff",
  // 主色
  colorPrimary: "#089BAB",
  layout: "top",
  // "layout": "side",
  contentWidth: "Fluid",
  fixedHeader: true,
  fixSiderbar: true,
  pwa: true,
  title: "戴维质控管理系统",
  logo: "/davidlogo.png",
  token: {
    // TODO 侧边栏
    sider: {
      // 折叠小图标背景颜色
      colorBgCollapsedButton: "#fff",
      // 鼠标移动到箭头上悬浮颜色
      colorTextCollapsedButtonHover: "#1677ff",
      // 折叠箭头图标颜色
      colorTextCollapsedButton: "#000",
      // 菜单背景颜色
      colorMenuBackground: "#3171f4",
      // 菜单分割线的颜色
      colorMenuItemDivider: "#b7eb8f",
      // 菜单悬浮颜色
      colorBgMenuItemHover: "#5555FF",
      // 菜单处于激活状态的颜色
      colorBgMenuItemActive: "#5555FF",
      // 菜单选中后的颜色
      colorBgMenuItemSelected: "#5555FF",
      // 菜单选中后字体颜色
      colorTextMenuSelected: "#FFF",
      // 鼠标虚浮后item字体颜色
      colorTextMenuItemHover: "#fff",
      // 菜单处于激活状态的字体颜色
      colorTextMenuActive: "#000",
      // 菜单字体颜色
      colorTextMenu: "#d7c4bb",
      // colorBgMenuItemCollapsedElevated: "#000",
      /**
       * menu 顶部 title 的字体颜色
       */
      colorTextMenuTitle: "#fff",
    },
    // TODO 顶部
    header: {
      // 头部背景颜色
      colorBgHeader: "#089BAB",
      // 头部标题颜色
      colorHeaderTitle: "#fff",
      // 字体颜色
      colorTextMenu: "#fff",
      // menuItem 的 hover 背景颜色
      colorBgMenuItemHover: "#007C8A",
      colorBgMenuItemSelected: "#FFFFFF",
      // 二级菜单字体颜色
      colorTextMenuSecondary: "#3171f4",
      // 右上角鼠标悬浮字体背景颜色
      colorBgRightActionsItemHover: "#6497f9",
      // 右上角字体颜色
      colorTextRightActionsItem: "#fff",
      // 菜单选中后背景色
      colorTextMenuSelected: "#000",
      colorTextMenuActive: "#fff",
      heightLayoutHeader: 55,
    },
    // TODO 内容区
    pageContainer: {
      // TODO 内容背景
      // colorBgPageContainer: "#f2f2f2",
      paddingInlinePageContainerContent: 10,
    },
    // TODO 背景色
    bgLayout: "#f2f2f2",
  },
  splitMenus: false,
  switchTabs: {
    mode: Mode.Route,
    fixed: true,
    reloadable: true,
    persistent: {
      force: true,
    },
  },
  // 参见ts声明，demo 见文档，通过token 修改样式
  //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
};

export default Settings;
