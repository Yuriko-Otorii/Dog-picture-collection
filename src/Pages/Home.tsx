import React, { useState, useEffect } from "react";

import { useNavigate, useLoaderData } from "react-router-dom";
import { Space } from "antd";

import { supabase } from "../Auth/supabaseClient";
import HomeCard from "../Components/HomeCard";
import homeStyle from "../Styles/home.module.scss";
import { Post } from "../DataTypes/Post.type";
import { fetchAllPosts } from "../Api/api";
import Header from "../Components/Header";

const { data: { session } } = await supabase.auth.getSession()

function Home() {
  const navigate = useNavigate();
  const allPosts = useLoaderData() as Post[];

  useEffect(() => {
    if(!session) navigate("/login");  
  }, [])

  return (
    <>
      <div className={homeStyle["Home-wrapper"]}>
        <Header title="Home" />
        <Space direction="vertical" size="middle">
          {allPosts.map((item) => (
            <HomeCard item={item} key={item.postId} />
          ))}
        </Space>
      </div>      
    </>
  );
}

export default Home;

export const loader = () => {
  return fetchAllPosts();
};
