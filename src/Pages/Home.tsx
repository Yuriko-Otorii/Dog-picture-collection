import { useEffect, useState } from "react";

import { useLoaderData } from "react-router-dom";
import { Space } from "antd";

import { supabase } from "../Auth/supabaseClient";
import HomeCard from "../Components/HomeCard";
import homeStyle from "../Styles/home.module.scss";
import { Post } from "../DataTypes/Post.type";
import Header from "../Components/Header";
import { useAuth } from "../Auth/AuthContext";

const { data: { user } } = await supabase.auth.getUser()

export const fetchAllPosts = async () => {
  let { data: posts, error: postFetchError } = await supabase
    .from("allPosts")
    .select("*, users(*)");
  if (postFetchError) throw postFetchError;

  const { data: allLikedPosts, error: likedPostFetchError } = await supabase
    .from("likedPosts")
    .select("postId")
    .eq("likedUserId", user!.id)  
  if (likedPostFetchError) throw likedPostFetchError;

  const allLikedPostsId = allLikedPosts?.map(item => item.postId)

  posts?.map((item) => {
    allLikedPostsId?.includes(item.postId)
    ? item.likedState = true
    : item.likedState = false
    const postImgUrl = JSON.parse(item.postImg).publicUrl;
    const avatarImgUrl = JSON.parse(item.users.avatarImg).publicUrl;
    return (item.postImg = postImgUrl), (item.users.avatarImg = avatarImgUrl);
  });

  return posts;
};


const Home = () => {
  const allPosts = useLoaderData() as Post[];

  return (
    <div className={homeStyle["Home-wrapper"]}>
      <Header title="Home" />
      <Space direction="vertical" size="middle">
        {allPosts && allPosts.map((item) => (
          <HomeCard item={item} key={item.postId} />
        ))}
      </Space>
    </div>
  );
};

export default Home;

export const loader = () => {
  return fetchAllPosts();
};
