import React, { Component } from 'react';
import { Menu, Icon, Space } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const RightMenu = () => {
    return (
      <Menu mode="horizontal">
        <Space size={30}>
            <div className=''>
            <a href="">Signin</a>
            </div>
            <div>
            <a href="">Signin</a>
            </div>
        </Space>
        {/* <Menu.Item key="mail">
          <a href="">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="">Signup</a>
        </Menu.Item> */}
      </Menu>
    );
}
export default RightMenu;