import React, { useState, useEffect } from "react";

import { Tabs, Avatar, Button, Card } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { supabase } from "../Auth/supabaseClient";
import dogImg1 from "../pictures/homePic2.jpg";
import { Post } from "../DataTypes/Post.type";
import profileStyle from "../Styles/profile.module.scss";
import Navigation from "../Components/Navigation";
import Meta from "antd/es/card/Meta";

function Profile() {
  const [userItems, setUserItems] = useState<Post[]>([]);

  useEffect(() => {
    // fetchUserItems()
    // console.log(user);
  }, []);

  // const user = supabase.auth.getUser();

  const fetchUserItems = async () => {
    const { data, error } = await supabase.from("all posts").select("*");

    if (error) console.error("Error: ", error);
    else setUserItems(data);
  };

  const onChange = () => {};

  const edit = "Edit profile"

  //Upload avatar img file
  //   const avatarFile = event.target.files[0];
  //   const { data, error } = await supabase.storage
  //     .from("avatars")
  //     .upload("public/avatar1.png", avatarFile);

  return (
    <>
      <div className={profileStyle["Profile-body-wrapper"]}>
        {/* <h1 style={{textAlign: "center"}}>Profile Page</h1> */}
        <div className={profileStyle["Profile-header-wrapper"]}>
          
          {/* <Card
            style={{ width: 300, marginTop: 16 }}
            actions={[<EditOutlined key="Edit profile" />]}
          >
            <Meta
              avatar={<Avatar size="large"
              gap={0.1}
              shape="square"
              src={dogImg1}
              />}
              title="username"
              
            />
          </Card> */}
          <div className={profileStyle["Profile-user-wrapper"]}>
          {/* <Avatar size="large"
              gap={0.1}
              shape="square"
              src={dogImg1}
          /> */}
            <div className={profileStyle["Profile-img"]}></div>
            {/* <img src={dogImg1} className={profileStyle["Profile-img"]} /> */}
            <h3 style={{marginLeft: "1.5rem"}}>username</h3>
          </div>
          <Button icon={<EditOutlined />} type="link">
            Edit profile
          </Button>
        </div>

        <div className={profileStyle["Profile-tab-wrapper"]}>
          <Tabs
            defaultActiveKey="1"
            onChange={onChange}
            items={[
              {
                label: `Posts`,
                key: "1",
                children: `Posts`,
              },
              {
                label: `Favorite`,
                key: "2",
                children: `Favorite`,
              },
              {
                label: `Followers`,
                key: "3",
                children: `Followers`,
              },
            ]}
          />
        </div>
      </div>
      <Navigation />
    </>
  );
}

export default Profile;

//https://www.supabase.jp/docs/guides/storage

//https://zenn.dev/taka_shino/articles/bengo4-advent-calendar-18
