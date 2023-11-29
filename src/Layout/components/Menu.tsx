import { memo } from "react";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import routes from '@/router';
import { useAppSelector } from "@/store/hooks";
import React from "react";

function findRoute(routes: Array<SyncRoute>, routeName: string): SyncRoute | undefined {
  for (let item of routes) {
    if (item.name === routeName) {
      return item;
    } else if (item.children) {
      const result = findRoute(item.children, routeName);
      if (result) {
        return result;
      }
    }
  }
}

const Icons = {
  VideoCameraOutlined,
  UserOutlined
}
function formateMenu(menus: Array<DataMenuItem>) {

  // const icoms = import("@ant-design/icons")
  return menus.map((menu: DataMenuItem): any => {
    if (menu.children && menu.children.length > 0) {
      return {
        key: menu.route_name,
        icon: React.createElement(Icons.VideoCameraOutlined),
        label: menu.title,
        children: formateMenu(menu.children)
      }
    }
    return {
      key: menu.route_name,
      icon: <UserOutlined />,
      label: menu.title,
    }
  })
}
// type MenuItem = Required<MenuProps>['items'][number];
// function findkey(arr: MenuItem[], path: String) {
//   let key
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i]!["children"]) {

//       if (!!findkey(arr[i]!["children"], path)) {
//         key = arr[i]!["key"]
//         break
//       }
//     } else {
//       if (arr[i]!["key"] === path) {
//         key = arr[i]!["key"]
//         break
//       }
//     }
//   }
//   return key

// }

function MyMenu() {
  const { menus } = useAppSelector(state => state.app)
  const navigator = useNavigate()
  const items = formateMenu(menus)
  const handleItemClicj = (e: { key: string }) => {
    const route = findRoute(routes, e.key)
    console.log(route, routes)
    if (route && route.path) {
      navigator(route.path)
    }
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      items={items}
      onClick={handleItemClicj}
    />
  )
}

export default memo(MyMenu)