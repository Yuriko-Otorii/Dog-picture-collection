import React, { useEffect } from "react";

import { Image, Space, Col, Row, Cascader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import searchStyle from "../Styles/search.module.scss";
import { fetchBreedsList } from "../Redux/Slicers/breedSlice";
import {
  fetchAllDogsImg,
  fetchselectedBreedPics,
} from "../Redux/Slicers/dogImgSlice";
import { AppDispatch, RootState } from "../Redux/store";
import { supabase } from "../Auth/supabaseClient"
import Navigation from "../Components/Navigation";


function Search() {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBreedsList());
    dispatch(fetchAllDogsImg());
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(session);
  })
  }, []);

  const handleBreedChange: any = async (value: string | string[]) => {
    dispatch(fetchselectedBreedPics(value));
  };

  return (
    <>
      <div className={searchStyle["Search-body-wrapper"]}>
        <h2 style={{ marginBottom: "1rem" }}>Select dog breed</h2>
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
          <Space direction="vertical" size="middle">
          {state.dogImgSlice.loading === "pending" ? (
            <h1>Loading...</h1>
          ) : (
            state.dogImgSlice &&
            state.dogImgSlice.dogImgList.map((item: string) => {
              return (
                <Col key={uuidv4()} sm={24} md={10} xl={8}>
                  <Image key={uuidv4()} width={200} src={item} />
                </Col>
              );
            })
          )}
          {state.dogImgSlice.loading === "failed" && (
            <h1>Failed Fetch pics. Try refresh the browser.</h1>
          )}
          </Space>
        </div>
      </div>
      <Navigation />
    </>
  );
}

export default Search;
