import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { supabase } from "../../Auth/supabaseClient";

type userFavPic = {
    url: string;
    picture_id: string;
}

type remapObj = {
    btnState: boolean;
    url: string;
}

const {
    data: { session },
  } = await supabase.auth.getSession();

//   const getUsersFavPics = async(): userFavPic[] => {
//     //Get users fav images
//     const { data: userFavPics } = await supabase
//     .from("liked_pics")
//     .select('url, picture_id')
//     .eq("user_id", session?.user.id)
//     return userFavPics
//   }

export const fetchAllDogsImg = createAsyncThunk(
    "dogImgs/fetchDogsImgState",
    async () => {
        //Create payload

        //Get all dogs images from API 
        const response = await axios.get('https://dog.ceo/api/breeds/image/random/30')
        const imgsList = await response.data.message
        const remapImgsList = imgsList.map((item: string) => {
            return {id: uuidv4(), btnState: false, url: item}
        })
        
        //Check if users fav images are in display images
        const { data: userFavPics } = await supabase
        .from("liked_pics")
        .select('url')
        .eq("user_id", session?.user.id)
        const userFavPicsArr =  userFavPics?.map((item) => item.url)
        const likedImgs = imgsList.filter((itemFromApi: string) => userFavPicsArr!.includes(itemFromApi))
        const setBtnStateList = remapImgsList.map((item: remapObj) => {
            if(likedImgs.includes(item.url)){
                return {btnState: true, url: item.url}
            }else{
                return {btnState: false, url: item.url}
            }
        })
        
        return [setBtnStateList, likedImgs]
    }
)

export const fetchselectedBreedPics = createAsyncThunk(
    "dogImgs/fetchselectedBreedPicsState",
    async (breed: string | string[]) => {
        //Create payload
        if(breed.length === 2) {   
            //Get dogs images from API 
            const url = `https://dog.ceo/api/breed/${breed[0]}/${breed[1]}/images/random/20`
            const response = await axios.get(url)
            const imgsList = response.data.message
            const remapImgsList = imgsList.map((item: string) => {
                return {btnState: false, url: item}
            })
            //Check if users fav images are in display images
            const { data: userFavPics } = await supabase
            .from("liked_pics")
            .select('url')
            .eq("user_id", session?.user.id)
            const userFavPicsArr =  userFavPics?.map((item) => item.url)
            const likedImgs = imgsList.filter((itemFromApi: string) => userFavPicsArr!.includes(itemFromApi))            

            const setBtnStateList = remapImgsList.map((item: remapObj) => {
                if(likedImgs.includes(item.url)){
                    return {btnState: true, url: item.url}
                }else{
                    return {btnState: false, url: item.url}
                }
            })

            return [setBtnStateList, likedImgs]

        } else {
            //Get dogs images from API 
            const url = `https://dog.ceo/api/breed/${breed}/images/random/20`
            const response = await axios.get(url)
            const imgsList = response.data.message
            const remapImgsList = imgsList.map((item: string) => {
                return {btnState: false, url: item}
            })

            //Check if users fav images are in display images
            const { data: userFavPics } = await supabase
            .from("liked_pics")
            .select('url')
            .eq("user_id", session?.user.id)
            const userFavPicsArr =  userFavPics?.map((item) => item.url)
            const likedImgs = imgsList.filter((itemFromApi: string) => userFavPicsArr!.includes(itemFromApi))

            
            const setBtnStateList = remapImgsList.map((item: remapObj) => {
                if(likedImgs.includes(item.url)){
                    return {btnState: true, url: item.url}
                }else{
                    return {btnState: false, url: item.url}
                }
            })
            return [setBtnStateList, likedImgs]
        }        
    }
)

export interface dogImgState {
    dogImgList: string[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    likedimgs: string[]
} 

const initialState = {
    dogImgList: [],
    loading: 'idle',
    likedimgs: []
} as dogImgState

const dogImgSlice = createSlice({
    name: "dogImgs",
    initialState,
    reducers: {
        // changeBtnState: (state, action) => {
        //     return state.dogImgList[action.payload.id]
        // }
    },
    extraReducers: (builder) => {
        //Set initial imgs
        builder.addCase(fetchAllDogsImg.pending, (state) => {
            state.loading = "pending"
        })
        builder.addCase(fetchAllDogsImg.fulfilled, (state, action) => {
            state.dogImgList = action.payload[0]
            state.likedimgs = action.payload[1]
            state.loading = "succeeded"      
        })
        builder.addCase(fetchAllDogsImg.rejected, (state) => {
            state.loading = "failed"
        })

        //Set selected breed pics
        builder.addCase(fetchselectedBreedPics.pending, (state) => {
            state.loading = "pending"
        })
        builder.addCase(fetchselectedBreedPics.fulfilled, (state, action) => {
            state.dogImgList = action.payload[0]
            state.likedimgs = action.payload[1]
            state.loading = "succeeded"       
        })
        builder.addCase(fetchselectedBreedPics.rejected, (state) => {
            state.loading = "failed"
        })
    }
})

// export const { changeBtnState } = dogImgSlice.actions
export default dogImgSlice.reducer