// import React, { PureComponent } from 'react';
import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { hoc } from '../containers/sidermenu';
import { IProps } from '../constants/sidermenu';
import { Link } from 'react-router-dom';
import '../index.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

const getIcon = (icon) => {
    if (typeof icon === 'string' && icon.indexOf('http') === 0) {
      return <img src={icon} alt="icon" className="icon" />;
    }
    if (typeof icon === 'string') {
      return <Icon type={icon} />;
    }
    return icon;
  };

export class SiderMenu extends React.PureComponent<IProps, any> {
      /**
  * 获得菜单子节点
  * @memberof SiderMenu
  */
  getNavMenuItems(menusData){
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map((item) => {
        const ItemDom = this.getSubMenuOrItem(item);
        return true;
      })
      .filter(item => !!item);
  }
  
    getMenuItemPath = (item) => {
        const itemPath = this.props.conversionPath(item.path);
        const icon = getIcon(item.icon);
        const { target, name } = item;
        // Is it a http link
        if (/^https?:\/\//.test(itemPath)) {
          return (
            <a href={itemPath} target={target}>
              {icon}<span>{name}</span>
            </a>
          );
        }
        return (
          <Link
            to={itemPath}
            target={target}
            replace={itemPath === this.props.location.pathname}
            onClick={() => { this.props.onCollapse(true); } }
          >
            {icon}<span>{name}</span>
          </Link>
        );
      }

    getSubMenuOrItem=(item) => {
        if (item.children && item.children.some(child => child.name)) {
          return (
            <SubMenu
              title={
                item.icon ? (
                  <span>
                    {getIcon(item.icon)}
                    <span>{item.name}</span>
                  </span>
                ) : item.name
                }
              key={item.path}
            >
              {this.getNavMenuItems(item.children)}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item key={item.path}>
              {this.getMenuItemPath(item)}
            </Menu.Item>
          );
        }
      }

  render() {
    const { logo, collapsed, location: { pathname }, onCollapse,openKeys } = this.props;
    let menus = this.props.menuData;
    const menuProps = collapsed ? {} : {openKeys};
    let selectedKeys = this.props.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    return (
      <Sider trigger={null} collapsible collapsed={collapsed} 
        breakpoint="md" onCollapse={onCollapse}
        width={256}  className="sider" >
        <div className={logo} key="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>Ant Design Pro</h1>
          </Link>
        </div>
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          {...menuProps}
          onOpenChange={this.props.handleOpenChange}
          selectedKeys={selectedKeys}
          style={{ padding: '16px 0', width: '100%' }}
        >
          {this.props.getNavMenuItems(menus)}
        </Menu>
      </Sider>
    );
  }
}

export  const SiderMenuHoc = hoc(SiderMenu);