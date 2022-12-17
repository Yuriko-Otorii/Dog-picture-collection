import {
  HomeOutlined,
  FileAddOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Grid } from "antd";
import type { MenuProps } from 'antd';

const { useBreakpoint } = Grid;

import navStyle from "../Styles/navigation.module.scss";
import { Outlet, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];


function Navigation() {
  const navigate = useNavigate()
  const screens = useBreakpoint();
  // console.log(screens.sm);
  

  const navItems = [
    { label: "Home", key: "/", icon: <HomeOutlined /> },
    { label: "Post", key: "/addpost", icon: <FileAddOutlined /> },
    { label: "Find", key: "/find", icon: <SearchOutlined /> },
    { label: "Profile", key: "/profile", icon: <UserOutlined /> },
  ];

  const verticalMenuItems: MenuProps["items"] = [
    getItem("Home", "/", <HomeOutlined />),
    getItem("Post", "/addPost", <FileAddOutlined />),
    getItem("Find", "/find", <SearchOutlined />),
    getItem("Profile", "/profile", <UserOutlined />),
  ]

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
      type
    } as MenuItem;
  }

  return (
    <>
      <Outlet />
      {!(screens.sm)? (
        <div className={navStyle["Navigation-horizental-wrapper"]}>
        <Menu
          items={navItems}
          mode="horizontal"
          onClick={({ key }) => navigate(key)}
          className={navStyle["Navigation-body"]}
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
      )
        
    }

      {/* // <div className={navStyle["Navigation-horizental-wrapper"]}>
      //   <Menu
      //     items={navItems}
      //     mode="horizontal"
      //     onClick={({ key }) => navigate(key)}
      //     className={navStyle["Navigation-body"]}
      //   />
      // </div> */}
      {/* // <div className={navStyle["Navigation-vertical-wrapper"]}>
      //   <Menu 
      //     onClick={({ key }) => navigate(key)}
      //     style={{ width: 120 }}
      //     mode="inline"
      //     items={verticalMenuItems}
      //   />
      // </div> */}
    </>
  );
}

export default Navigation;
