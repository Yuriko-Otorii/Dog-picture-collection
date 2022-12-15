import React from "react";

import {
  HomeOutlined,
  FileAddOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Button } from "antd";
import navStyle from "../Styles/navigation.module.scss";
import { supabase } from "../Auth/supabaseClient";
import { useNavigate } from "react-router-dom";


function Navigation() {
  const navigate = useNavigate()

  const navItems = [
    { label: "Home", key: "/", icon: <HomeOutlined /> },
    { label: "Post", key: "/addpost", icon: <FileAddOutlined /> },
    { label: "Search", key: "/search", icon: <SearchOutlined /> },
    { label: "Profile", key: "/profile", icon: <UserOutlined /> },
  ];


  const handleLogout = async () => {
    await supabase.auth.signOut()
    // navigate('/login')
    console.log("Signed out");
    
    // setUser(u => u = null)
  }

  return (
    <>
      <div className={navStyle["Navigation-wrapper"]}>
        <Menu
          items={navItems}
          mode="horizontal"
          onClick={({ key }) => navigate(key)}
          defaultSelectedKeys={["/"]}
          // className={navStyle["Navigation-body"]}
        />
        {/* <Button
          onClick={handleLogout}
          className={navStyle['Navigation-logout']}
        >
          Log out
        </Button> */}
      </div>
    </>
  );
}

export default Navigation;
