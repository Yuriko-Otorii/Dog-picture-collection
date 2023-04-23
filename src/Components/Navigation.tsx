import { useState, useEffect } from "react";

import {
  HomeOutlined,
  FileAddOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Grid } from "antd";
import type { MenuProps } from "antd";

const { useBreakpoint } = Grid;

import navStyle from "../Styles/navigation.module.scss";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const Navigation = () => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const { pathname } = useLocation()
  const [currentPath, serCurrentPath] = useState(pathname)
  const [selectedKey, setSelectedKey] = useState([currentPath]);

  useEffect(() => {    
    serCurrentPath(pathname)
    setSelectedKey([currentPath])
  }, [pathname])

  const navItems = [
    { label: "Home", key: "/home", icon: <HomeOutlined /> },
    { label: "Post", key: "/addpost", icon: <FileAddOutlined /> },
    { label: "Find", key: "/find", icon: <SearchOutlined /> },
    { label: "Profile", key: "/profile", icon: <UserOutlined /> },
  ];

  const verticalMenuItems: MenuProps["items"] = [
    getItem("Home", "/home", <HomeOutlined />),
    getItem("Post", "/addPost", <FileAddOutlined />),
    getItem("Find", "/find", <SearchOutlined />),
    getItem("Profile", "/profile", <UserOutlined />),
  ];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  return (
    <>
      <Outlet />
      {!screens.sm ? (
        <div className={navStyle["Navigation-horizental-wrapper"]}>
          <Menu
            items={navItems}
            mode="horizontal"
            onClick={({ key }) => navigate(key)}
            className={navStyle["Navigation-body"]}
            selectedKeys={selectedKey}
          />
        </div>
      ) : (
        <div className={navStyle["Navigation-vertical-wrapper"]}>
          <Menu
            onClick={({ key }) => navigate(key)}
            style={{ width: 150 }}
            mode="inline"
            items={verticalMenuItems}
          />
        </div>
      )}
    </>
  );
};

export default Navigation;
