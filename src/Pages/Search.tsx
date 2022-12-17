import React, { useEffect, useState } from "react";

import { Col, Row, Cascader, Button, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import searchStyle from "../Styles/search.module.scss";
import { fetchBreedsList } from "../Redux/Slicers/breedSlice";
import {
  fetchAllDogsImg,
  fetchselectedBreedPics,
} from "../Redux/Slicers/dogImgSlice";
import { AppDispatch, RootState } from "../Redux/store";
import { supabase } from "../Auth/supabaseClient";
import Header from "../Components/Header";
// import { changeBtnState } from "../Redux/Slicers/dogImgSlice";

const {
  data: { session },
} = await supabase.auth.getSession();

type remapObj = {
  id: number;
  btnState: boolean;
  url: string;
}

function Search() {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBreedsList());
    dispatch(fetchAllDogsImg());
    if (!session) navigate("/login");
  }, []);

  const handleBreedChange: any = async (value: string | string[]) => {    
    dispatch(fetchselectedBreedPics(value));
  };

  const addFavoritePics = async (value: remapObj) => {
    try {      
      await supabase
        .from("liked_pics")
        .insert([{ url: value.url, user_id: session?.user.id }]);
        
        // changeBtnState(value)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={searchStyle["Search-body-wrapper"]}>
        <Header title="Find your favorite!" />
        <Cascader
          options={
            state.breedListSlice.breedList && state.breedListSlice.breedList
          }
          onChange={handleBreedChange}
          placeholder="Choose dog breed"

          // placeholder={
          //   if(state.breedListSlice.loading === "pending"){
          //     "Loading..."
          //   }else if(state.breedListSlice.loading === "succeeded"){
          //     "Choose dog breed"
          //   }else{
          //     "Failed to fetch dog breeds"
          //   }
          // }
        />
        <div className={searchStyle["Search-img-wrapper"]}>
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
                <Spin size="large" />
              </div>
            ) : (
              state.dogImgSlice.dogImgList &&
              state.dogImgSlice.dogImgList.map((item: any) => {
                // console.log(item);                
                return (
                  <Col key={uuidv4()} sm={24} md={10} xl={8}>
                    <div className={searchStyle["Search-img-div"]}>
                      <img
                        alt="Dog image"
                        src={item.url}
                        className={searchStyle["Search-each-img"]}
                      />
                      <Button
                        className={searchStyle["Search-like-btn"]}
                        // style={item.btnState? {color: "coral"}: {color: "rgba(0, 0, 0, 0.88)"}}
                        style={item.btnState? {color: "coral"}: {color: "rgba(0, 0, 0, 0.88)"}}
                        onClick={() => addFavoritePics(item)}
                      >
                        <HeartOutlined />
                        Love it!
                      </Button>
                    </div>
                  </Col>
                );
              })
            )}
            {state.dogImgSlice.loading === "failed" && (
              <h1>Failed Fetch pics. Try refresh the browser.</h1>
            )}
          </Row>
        </div>
      </div>
      {/* {console.log(remapImgList)} */}
    </>
  );
}

export default Search;
