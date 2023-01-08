import { useEffect, useState } from "react";

import { Col, Row, Cascader, Button, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

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

type remapObj = {
  id: number;
  btnState: boolean;
  url: string;
};

const { data: { user: currentUser } } = await supabase.auth.getUser()

const Find = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [tempFavPics, setTempFavPics] = useState<string[]>([]);

  useEffect(() => {
    if(!currentUser) navigate("/login")
    dispatch(fetchBreedsList());
    dispatch(fetchAllDogsImg());
  }, []);

  const addFavoritePics = () => {
    tempFavPics.map(async (item) => {
      await supabase
        .from("liked_pics")
        .insert([{ url: item, user_id: currentUser?.id }]);
    });
  };

  const handleBreedChange: any = async (value: string | string[]) => {
    dispatch(fetchselectedBreedPics(value));
  };

  const handleLikeBtn = async (value: remapObj) => {
    try {
      if (!value.btnState) {
        //Set True for btnState
        dispatch(changeBtnState(value));

        //Add url to tempFavPics list
        setTempFavPics((prev) => {
          return [...prev, value.url];
        });
      } else {
        //Set False for btnState
        dispatch(changeBtnState(value));
        //Remove url to tempFavPics list
        setTempFavPics((prev) => prev.filter((item) => item !== value.url));
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
