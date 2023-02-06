import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { message, Row, Col, Button, Card, Avatar } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import ProfileStyle from "../Styles/profile.module.scss";
import dogGif2 from "../pictures/dogGif2.gif";
import { Post } from "../DataTypes/Post.type";
import { supabase } from "../Auth/supabaseClient";
import Meta from "antd/es/card/Meta";
import { useAuth } from "../Auth/AuthContext";

type Props = {
  favPostList: any[];
  setList: React.Dispatch<React.SetStateAction<Post[]>>;
};


const FavoritePosts = ({ favPostList, setList }: Props) => {
  const { user } = useAuth()
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const deleteFavPic = async (value: string) => {
    // Get users all favorite post's info
    const { data: allFavPosts, error } = await supabase
      .from('likedPosts')
      .select("likedPostId, postId")
      .eq("likedUserId", user.id)
    if(error) throw error;

    //Get target item by provided id
    const targetItem = allFavPosts.filter(item => item.postId === value)

    //Delete target item from "likedPosts" table by unique id
    try {
      await supabase
        .from("likedPosts")
        .delete()
        .eq("likedPostId", targetItem![0].likedPostId)

      //Reset the favPosts state
      setList(favPostList.filter(item => item.postId !== targetItem![0].postId))

      messageApi.open({
        type: "success",
        content: "Successfully deleted",
      });
    } catch (error) {
      console.error(error);      
      messageApi.open({
        type: "error",
        content: "Something went wrong...Please try again",
      });
    }
  };


  return (
    <>    
      {contextHolder}
      <div className={ProfileStyle["Profile-favorite-posts"]}>
        <Row gutter={[10, 10]} justify="center">
          {favPostList.length > 0 ? (
            favPostList.map((item) => {
              return (
                <div key={uuidv4()}>
                  <Col xs={24} sm={12} md={12} lg={8} flex="0">
                    <Card
                      style={{ width: 250 }}
                      actions={[<DeleteOutlined key="delete" onClick={() => deleteFavPic(item.postId)}/>]}
                      cover={
                        <img
                          alt="Favorite post image"
                          src={item.postImg}
                          style={{ width: "250px", height: "200px" }}
                        />
                      }
                    >
                      <Meta title={item.postText} />
                      <div className={ProfileStyle["Profile-favPost-user"]}>
                        <Avatar
                          shape="square"
                          size="small"
                          src={item.users.avatarImg}
                        />
                        <p style={{ fontSize: ".8rem" }}>
                          {item.users.username}
                        </p>
                      </div>
                      <p style={{ marginTop: ".5rem", fontSize: ".7rem" }}>
                        {item.postDate}
                      </p>
                    </Card>
                  </Col>
                </div>
              );
            })
          ) : (
            <div className={ProfileStyle["Profile-no-favorite-posts"]}>
              <h3>No favorite posts!</h3>
              <Button
                onClick={() => {
                  navigate("/");
                }}
                type="link"
              >
                Find your favorite!
              </Button>
              <img src={dogGif2} alt="Dog gif" />
            </div>
          )}
        </Row>
      </div>
    </>
  );
};

export default FavoritePosts;
