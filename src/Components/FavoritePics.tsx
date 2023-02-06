import React from "react";

import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { supabase } from "../Auth/supabaseClient";
import favoritePicsStyle from "../Styles/profile.module.scss";
import dogGif3 from "../pictures/dogGif3.gif";
import { useAuth } from "../Auth/AuthContext";


type Props = {
  picList: FavObj[];
  setList: React.Dispatch<React.SetStateAction<FavObj[]>>;
};

export type FavObj = {
  url: string;
};

const FavoritePics = ({ picList, setList }: Props) => {
  const { user } = useAuth()
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const deleteFavPic = async (value: string) => {
    // Get users all favorite pic's info
    const { data: userFavPics, error } = await supabase
      .from("likedPics")
      .select("url, picture_id")
      .eq("user_id", user.id);
    if(error) throw error;

    //Get target item by provided url
    const targetItem = userFavPics!.filter((item) => item.url === value);

    // Delete img based on unique id
    try {
      const { data } = await supabase
        .from("likedPics")
        .delete()
        .eq("picture_id", targetItem![0].picture_id);
      
      //Reset the fabPics state
      setList(picList.filter((item: FavObj) => item.url !== targetItem![0].url));

      messageApi.open({
        type: "success",
        content: "Successfully deleted",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Something went wrong...Please try again",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className={favoritePicsStyle["Profile-favorite-pics-wrapper"]}>
        <Row gutter={[10, 10]} justify="center">
          {picList.length > 0 ? (
            picList.map((item) => {
              return (
                <div
                  key={uuidv4()}
                  className={favoritePicsStyle["Profile-pic-btn-wrapper"]}
                >
                  <Col xs={24} sm={12} md={12} lg={8} flex="0">
                    <img
                      className={favoritePicsStyle["Profile-favorite-pic"]}
                      alt="Favorite image"
                      src={item.url}
                    />
                  </Col>
                  <Button
                    shape="circle"
                    size="small"
                    onClick={() => deleteFavPic(item.url)}
                    className={favoritePicsStyle["Profile-favorite-deleteBtn"]}
                  >
                    <DeleteOutlined style={{ padding: ".25rem" }} />
                  </Button>
                </div>
              );
            })
          ) : (
            <div className={favoritePicsStyle["Profile-no-favorite-posts"]}>
              <h3>No favorite pictures!</h3>
              <Button
                onClick={() => {
                  navigate("/find");
                }}
                type="link"
              >
                Find your favorite!
              </Button>
              <img src={dogGif3} alt="Dog gif" />
            </div>
          )}
        </Row>
      </div>
    </>
  );
};

export default FavoritePics;
