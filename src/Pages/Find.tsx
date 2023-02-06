import { useEffect, useState } from "react";

import { Col, Row, Cascader, Button, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { HeartOutlined } from "@ant-design/icons";

import findStyle from "../Styles/find.module.scss";
import { fetchBreedsList } from "../Redux/Slicers/breedSlice";
import {
  fetchAllDogsImg,
  fetchselectedBreedPics,
} from "../Redux/Slicers/dogImgSlice";
import { AppDispatch, RootState } from "../Redux/store";
import { supabase } from "../Auth/supabaseClient";
import Header from "../Components/Header";
import { changeBtnState } from "../Redux/Slicers/dogImgSlice";
import dogGif from "../pictures/dogGif.gif"
import { useAuth } from "../Auth/AuthContext";

export type remapObj = {
  id: number;
  btnState: boolean;
  url: string;
};

const Find = () => {
  const { user } = useAuth()
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBreedsList());
    dispatch(fetchAllDogsImg());
  }, []);

  const handleBreedChange: any = async (value: string | string[]) => {
    dispatch(fetchselectedBreedPics(value));
  };

  const deleteFavPic = async (url: string) => {
    // Get users favorite img unique key
    const { data: userFavPics, error } = await supabase
      .from("likedPics")
      .select("url, picture_id")
      .eq("user_id", user.id);
    if(error) throw error;

    const getImgUrl = userFavPics?.filter((item) => item.url === url);

    // Delete img based on unique key
    try {
      const { data } = await supabase
        .from("likedPics")
        .delete()
        .eq("picture_id", getImgUrl![0].picture_id);
    } catch (error) {
      console.error(error);            
    }
  };

  const handleLikeBtn = async (value: remapObj) => {
    try {      
      if (!value.btnState) {
        //Set True for btnState
        dispatch(changeBtnState(value));
        
        //Add pics to likedPics table
        const {error} = await supabase
        .from("likedPics")
        .insert([{ url: value.url, user_id: user.id }]);
        if(error) throw error;

      } else {
        //Set False for btnState
        dispatch(changeBtnState(value));

        //Delete url from liked_pics table
        deleteFavPic(value.url)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={findStyle["Find-body-wrapper"]}>
      <Header title="Find your favorite!" />
      <Cascader
        options={
          state.breedListSlice.breedList && state.breedListSlice.breedList
        }
        onChange={handleBreedChange}
        placeholder="Choose dog breed"
      />
      <div className={findStyle["Find-img-wrapper"]}>
        <Row gutter={{ xs: 8, sm: 16 }} justify="center">
          {state.dogImgSlice.loading === "pending" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1 style={{ textAlign: "center", margin: "2rem auto" }}>
                Loading...
              </h1>
              <img alt="Dog gif" src={dogGif} />
            </div>
          ) : (
            state.dogImgSlice.dogImgList &&
            state.dogImgSlice.dogImgList.map((item: any) => {
              return (
                <Col key={uuidv4()} sm={24} md={10} xl={8}>
                  <div className={findStyle["Find-img-div"]}>
                    <img
                      alt="Dog image"
                      src={item.url}
                      className={findStyle["Find-each-img"]}
                    />
                    <Button
                      shape="circle"
                      size="small"
                      onClick={() => handleLikeBtn(item)}
                      className={findStyle["Find-like-btn"]}
                    >
                      <HeartOutlined
                        className={findStyle["Find-like-icon"]}
                        style={
                          item.btnState
                            ? { color: "coral" }
                            : { color: "rgba(0, 0, 0, 0.88)" }
                        }
                      />
                    </Button>
                  </div>
                </Col>
              );
            })
          )}
          {state.dogImgSlice.loading === "failed" && (
            <h1 style={{textAlign: "center"}}>Failed Fetch pics. Try refresh the browser.</h1>
          )}
        </Row>
      </div>
    </div>
  );
};

export default Find;
