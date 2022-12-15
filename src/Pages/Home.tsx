import React, { useState, useEffect } from "react";

import { useNavigate, useLoaderData } from "react-router-dom";
import { Button, Space } from "antd";

import { supabase } from "../Auth/supabaseClient";
import HomeCard from "../Components/HomeCard";
import homeStyle from "../Styles/home.module.scss";
import dogImg1 from "../pictures/homePic2.jpg";
import dogImg2 from "../pictures/homePic3.jpg";
import { Post } from "../DataTypes/Post.type";
import Navigation from "../Components/Navigation";
import { fetchUserItems } from "../Api/api";

function Home() {
  // const [userItems, setUserItems] = useState<Post[]>([])
  const navigate = useNavigate();
  const userItems = useLoaderData() as Post[];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <>
      <div className={homeStyle["Home-wrapper"]}>
        <Space direction="vertical" size="middle">
          {userItems.map((item) => (
            <HomeCard item={item} key={item.postId} />
          ))}
        </Space>
      </div>
      <div style={{ textAlign: "end" }}>
        <Button
          onClick={handleLogout}
          // className={navStyle['Navigation-logout']}
        >
          Log out
        </Button>
      </div>
      <Navigation />
    </>
  );
}

export default Home;

export const loader = () => {
  return fetchUserItems();
};
