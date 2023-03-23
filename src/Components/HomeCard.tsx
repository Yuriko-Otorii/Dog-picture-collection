import { Avatar, Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { formatDistance } from "date-fns";

import { Post } from "../DataTypes/Post.type";
import homeCardStyle from "../Styles/homeCard.module.scss";
import { useEffect, useState } from "react";
import { supabase } from "../Auth/supabaseClient";
const { Meta } = Card;

const {
  data: { user: currentUser },
} = await supabase.auth.getUser();

// console.log(currentUser);

const HomeCard = ({ item }: { item: Post }) => {
  const [likeBtnState, setLikeBtnState] = useState<boolean | null | undefined>(item.likedState);
  const timestamp = formatDistance(new Date(item.postDate), new Date(), {
    addSuffix: true,
  });

  useEffect(() => {        
  }, [])
  
  
  const deleteFavPost = async (postId: number) => {
    // Get users favorite post unique key
    const { data: userFavPost, error } = await supabase
      .from("liked-posts")
      .select("postId")
      .eq("likedUserId", currentUser?.id);

    if(error) throw error
    
    const getTargetPost = userFavPost?.filter((item) => item.postId === postId);    

    //Delete post
    try {
      await supabase
        .from("liked-posts")
        .delete()
        .eq("postId", getTargetPost![0].postId);
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikeBtn = async (value: Post) => {
    if (!likeBtnState) {
      //Add post to liked-posts table
      const { error } =  await supabase
          .from("likedPosts")
          .insert([{ likedUserId: currentUser?.id, postId: value.postId }]);
      
      setLikeBtnState(true);
      if(error) throw error

    } else {
      try {
        //Delete post from liked-posts table
        deleteFavPost(value.postId);
        setLikeBtnState(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="home pictute"
          src={item.postImg}
          style={{ width: "300px", height: "250px" }}
        />
        
      }
      bodyStyle={{padding: "1rem 1rem .5rem"}}
      actions={[
        <HeartOutlined key="Favorite" onClick={() => handleLikeBtn(item)} style={
          likeBtnState
            ? { color: "coral" }
            : { color: "rgba(0, 0, 0, 0.88)" }
        }/>,
      ]}
    >
      <Meta title={item.postText} style={{margin: "0 0 .6rem"}} />

      <div className={homeCardStyle["HomeCard-user-date-Wrapper"]}>
        <div className={homeCardStyle["HomeCard-post-user"]}>
          <Avatar shape="square" size="small" src={item.users.avatarImg} />
          <p style={{ fontSize: ".8rem" }}>{item.users.username}</p>
        </div>
        <p style={{ marginTop: ".5rem", fontSize: ".7rem" }}>{timestamp}</p>
      </div>
    </Card>
  );
};

export default HomeCard;
