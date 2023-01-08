import { useState, useEffect } from "react";

import { Tabs, Button, Avatar } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { supabase } from "../Auth/supabaseClient";
import profileStyle from "../Styles/profile.module.scss";
import FavoritePics from "../Components/FavoritePics";
import { FavObj as FavListType } from "../Components/FavoritePics";
import Header from "../Components/Header";
import FavoritePosts from "../Components/FavoritePosts";
import { Post } from '../DataTypes/Post.type' 
import { useAuth } from "../Auth/AuthContext";

type UserInfo = {
  username: string;
  avatarImg: string;
};

const { data: { user: currentUser } } = await supabase.auth.getUser()

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [favPics, setFavPics] = useState<FavListType[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  const fetchFavPics = async () => {
    try {
      const { data }: any = await supabase
        .from("liked-pics")
        .select("url")
        .eq("user_id", currentUser?.id);
      setFavPics(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsersPosts = async () => {
    try {
      const { data }: any = await supabase
        .from("all-posts")
        .select("*")
        .eq("userId", currentUser?.id);     
        setUserPosts(data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchUserInfo = async () => {
    try {
      const { data }: any = await supabase
        .from("users")
        .select("username, avatarImg")
        .eq("userId", currentUser?.id);         

        if(data[0].avatarImg){
          setUserInfo({
            username: data[0].username,
            avatarImg: JSON.parse(data[0].avatarImg).publicUrl,
          });
        }else{
          setUserInfo({
            username: data[0].username,
            avatarImg: "",
          });
        }      
    } catch (error) {
      console.error(error)
    }
    
  };

  useEffect(() => {
    // if (!session) navigate("/login");
    fetchFavPics();
    fetchUsersPosts();
    fetchUserInfo();    
  }, []);  

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className={profileStyle["Profile-body-wrapper"]}>
      <Header title="Profile Page" />
      <div className={profileStyle["Profile-header-wrapper"]}>
        <div className={profileStyle["Profile-user-wrapper"]}>
          {userInfo?.avatarImg ? (
            <Avatar shape="square" size={64} src={userInfo?.avatarImg} />
          ) : (
            <Avatar shape="square" size={64} icon={<UserOutlined />} />
          )}

          <h3 style={{ marginLeft: "1.5rem" }}>{userInfo?.username}</h3>
        </div>
        <div className={profileStyle["Profile-btn-wrapper"]}>
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => {
              navigate("/editprofile");
            }}
          >
            Edit profile
          </Button>
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
              children: <FavoritePics picList={favPics} setList={setFavPics} />,
            },
            {
              label: `Posts`,
              key: "2",
              children: <FavoritePosts postList={userPosts} setList={setUserPosts}/>,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Profile;

//https://www.supabase.jp/docs/guides/storage

//https://zenn.dev/taka_shino/articles/bengo4-advent-calendar-18
