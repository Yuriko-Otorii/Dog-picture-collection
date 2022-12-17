import React, { useState, useEffect } from "react";

import { Tabs, Button, Avatar } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";

import { supabase } from "../Auth/supabaseClient";
import dogImg1 from "../pictures/homePic2.jpg";
import koala from "../pictures/koala.jpg";
import kangaroo from "../pictures/kangaroo.jpg";
import profileStyle from "../Styles/profile.module.scss";
import { useNavigate } from "react-router-dom";
import FavoritePics from "../Components/FavoritePics";
import { FavObj as FavListType } from "../Components/FavoritePics";
import Header from "../Components/Header";
import FavoritePosts from "../Components/FavoritePosts";

const {
  data: { session },
} = await supabase.auth.getSession();

type UserInfo = {
  username: string;
  avaterImg: string;
};

function Profile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [favPics, setFavPics] = useState<FavListType[]>([]);

  const fetchFavPics = async () => {
    try {
      const { data }: any = await supabase
        .from("liked_pics")
        .select("url")
        .eq("user_id", session?.user.id);
      setFavPics(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserInfo = async () => {
    const { data }: any = await supabase
      .from("users")
      .select("username, avaterImg")
      .eq("userId", session?.user.id);
    setUserInfo(data[0]);
  };

  useEffect(() => {
    if (!session) navigate("/login");
    fetchFavPics();
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <>
      <div className={profileStyle["Profile-body-wrapper"]}>
        <Header title="Profile Page" />
        <div className={profileStyle["Profile-header-wrapper"]}>
          <div className={profileStyle["Profile-user-wrapper"]}>
            {/* {userInfo?.avaterImg ? (
              <Avatar shape="square" size={64} icon={<UserOutlined />} />
            ) : (
              <img src={kangaroo} className={profileStyle["Profile-img"]} />
            )} */}
            <Avatar shape="square" size={64} icon={<UserOutlined />} />
            <h3 style={{ marginLeft: "1.5rem" }}>{userInfo?.username}</h3>
          </div>
          <div className={profileStyle["Profile-btn-wrapper"]}>
            {/* <Button icon={<EditOutlined />} type="link">
              Edit profile
            </Button> */}
            <Button onClick={handleLogout}>Log out</Button>
          </div>
        </div>

        <div className={profileStyle["Profile-tab-wrapper"]}>
          <Tabs
            tabBarStyle={{ margin: "0 auto" }}
            defaultActiveKey="1"
            items={[
              {
                label: `Favorite Pics`,
                key: "1",
                children: (
                  <FavoritePics picList={favPics} setList={setFavPics} />
                ),
              },
              {
                label: `Posts`,
                key: "2",
                children: <FavoritePosts />,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default Profile;

//https://www.supabase.jp/docs/guides/storage

//https://zenn.dev/taka_shino/articles/bengo4-advent-calendar-18
