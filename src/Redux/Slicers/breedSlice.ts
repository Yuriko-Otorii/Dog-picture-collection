import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBreedsList = createAsyncThunk(
    "breedList/fetchBreedsListStatus",
    async () => {
        //Create payload
        const response = await axios.get("https://dog.ceo/api/breeds/list/all")
        const data = await response.data.message
        return data
    }
)

type subBreedList = {
    value: string,
    label: string,
    [key: string]: string;
}

type breedList = {
    value: string,
    label: string,
    children: subBreedList[]
    [key: string]: string | subBreedList[];
}

export interface breedListState {
    breedList: breedList[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
} 

const initialState = {
    breedList: [],
    loading: 'idle',
} as breedListState

const breedListSlice = createSlice({
    name: "breedList",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBreedsList.fulfilled, (state, action) => {
            let tempoArr: breedList[] = []

            Object.entries(action.payload).forEach((item: any) => {                  
                let tempObj: breedList = {
                    label: "",
                    value: "",
                    children: []
                }
                tempObj.label = item[0];
                tempObj.value = item[0];                                

                if(item[1].length > 0) {
                    (item[1].forEach((item: string) => {
                        let tempChildObj: subBreedList = {
                            label: "",
                            value: "",
                        }
                        tempChildObj.label = item
                        tempChildObj.value = item                                  
                        tempObj.children.push(tempChildObj)
                    }))
                }                 
                tempoArr.push(tempObj)              
            })
            state.breedList = tempoArr    
            state.loading = "succeeded"        
        })

        builder.addCase(fetchBreedsList.pending, (state, action) => {
            state.loading = "pending"
        })
        
        builder.addCase(fetchBreedsList.rejected, (state, action) => {
            state.loading = "failed"
        })
    },
    
})

export default breedListSlice.reducer

