import { useState, useEffect } from "react";

import { Tabs, Button, Avatar } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { supabase } from "../Auth/supabaseClient";
import profileStyle from "../Styles/profile.module.scss";
import FavoritePics from "../Components/FavoritePics";
import { FavObj } from "../Components/FavoritePics";
import Header from "../Components/Header";
import FavoritePosts from "../Components/FavoritePosts";
import { Post } from '../DataTypes/Post.type' 
import { useAuth } from "../Auth/AuthContext";
import { favPost } from "../DataTypes/FavPost";

type UserInfo = {
  username: string;
  avatarImg: string;
};

const Profile = () => {
  const { user } = useAuth()
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [favPics, setFavPics] = useState<FavObj[]>([]);
  const [favPosts, setFavPosts] = useState<any[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);


  const fetchFavPics = async () => {
    try {
      const { data: favPicsList }: any = await supabase
        .from("likedPics")
        .select("url")
        .eq("user_id", user.id);
      setFavPics(favPicsList);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFavPosts = async () => {
    try {
      const { data: favPostListId, error } = await supabase
        .from("likedPosts")
        .select("postId")
        .eq("likedUserId", user.id)   
      if(error) throw error;   

      //Create favPostList
      const likedPostList: favPost[] = [];

      favPostListId.forEach(async (item: {postId: string}) => {
        const { data, error } = await supabase
        .from("allPosts")
        .select("*, users(*)")
        .eq("postId", item.postId);
        if(error) throw error;   
        
        const likedPostObj: favPost = data![0] as favPost;
        
        const postImgUrl = await JSON.parse(likedPostObj.postImg).publicUrl
        likedPostObj.postImg = postImgUrl
  
        const avatarImgUrl = await JSON.parse(likedPostObj.users.avatarImg).publicUrl;
        likedPostObj.users.avatarImg = avatarImgUrl
  
        likedPostList.push(likedPostObj)
      }); 

      setFavPosts(likedPostList)      
        
    } catch (error) {
      console.error(error);
    }
  }

  const fetchUsersPosts = async () => {
    try {
      const { data: userPosts }: any = await supabase
        .from("allPosts")
        .select("*")
        .eq("userId", user.id);     
        setUserPosts(userPosts);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchUserInfo = async () => {
    try {
      const { data }: any = await supabase
        .from("users")
        .select("username, avatarImg")
        .eq("userId", user.id);         

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
    fetchFavPics();
    fetchUsersPosts();
    fetchUserInfo();   
    fetchFavPosts();    
  }, []);  

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('token')
    navigate("/login");
  };

  return (
    <div className={profileStyle["Profile-body-wrapper"]}>
      <Header title="Profile Page" />
      <div className="Profile-user-contents-wrapper">
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
                label: `Favorite Posts`,
                key: "2",
                children: <FavoritePosts favPostList={favPosts} setList={setFavPosts}/>,
              },
              // {
              //   label: `User Posts`,
              //   key: "3",
              //   children: <FavoritePosts favPostList={favPosts} setList={setUserPosts}/>,
              // },
            ]}
          />
        </div>

      </div>
    </div>
  );
};

export default Profile;

