import { useEffect } from "react";

import { useNavigate, useLoaderData } from "react-router-dom";
import { Space, Spin } from "antd";

import { supabase } from "../Auth/supabaseClient";
import HomeCard from "../Components/HomeCard";
import homeStyle from "../Styles/home.module.scss";
import { Post } from "../DataTypes/Post.type";
import Header from "../Components/Header";
import { useAuth } from "../Auth/AuthContext";

export const fetchAllPosts = async () => {
  let { data: posts, error } = await supabase
    .from("all-posts")
    .select("*, users(*)");
  if (error) console.log("error", error);

  posts?.map((item) => {
    const postImgUrl = JSON.parse(item.postImg).publicUrl;
    const avatarImgUrl = JSON.parse(item.users.avatarImg).publicUrl;
    return (item.postImg = postImgUrl), (item.users.avatarImg = avatarImgUrl);
  });

  return posts;
};

const Home = () => {
  const navigate = useNavigate();
  const allPosts = useLoaderData() as Post[];
  const { user } = useAuth();

  useEffect(() => {
    // if(!currentUser) navigate("/login")
  });

  return (
    <div className={homeStyle["Home-wrapper"]}>
      <Header title="Home" />
      <Space direction="vertical" size="middle">
        {allPosts.map((item) => (
          <HomeCard item={item} key={item.postId} />
        ))}
      </Space>
    </div>
  );

  // }
};

export default Home;

export const loader = () => {
  return fetchAllPosts();
};
