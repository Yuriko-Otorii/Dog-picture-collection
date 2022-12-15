import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllDogsImg = createAsyncThunk(
    "dogImgs/fetchDogsImgState",
    async () => {
        //Create payload
        const response = await axios.get('https://dog.ceo/api/breeds/image/random/30')
        const data = await response.data.message
        return data
    }
)

export const fetchselectedBreedPics = createAsyncThunk(
    "dogImgs/fetchselectedBreedPicsState",
    async (breed: string | string[]) => {
        //Create payload
        if(breed.length === 2) {            
            const url = `https://dog.ceo/api/breed/${breed[0]}/${breed[1]}/images/random/20`
            const response = await axios.get(url)
            const data = response.data.message
            return data
        } else {
            const url = `https://dog.ceo/api/breed/${breed}/images/random/20`
            const response = await axios.get(url)
            const data = response.data.message
            return data
        }        
    }
)

export interface dogImgState {
    dogImgList: string[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
} 

const initialState = {
    dogImgList: [],
    loading: 'idle',
} as dogImgState

const dogImgSlice = createSlice({
    name: "dogImgs",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        //Set initial imgs
        builder.addCase(fetchAllDogsImg.pending, (state) => {
            state.loading = "pending"
        })
        builder.addCase(fetchAllDogsImg.fulfilled, (state, action) => {
            state.dogImgList = action.payload
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
            state.dogImgList = action.payload            
            state.loading = "succeeded"       
        })
        builder.addCase(fetchselectedBreedPics.rejected, (state) => {
            state.loading = "failed"
        })
    }
})

export default dogImgSlice.reducer