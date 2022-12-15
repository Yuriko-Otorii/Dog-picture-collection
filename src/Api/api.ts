import axios from "axios";

import { supabase } from "../Auth/supabaseClient";


export const fetchUserItems = async () => {
    const { data, error } = await supabase
    .from("all posts")
    .select("*")

    if(error) console.error(error);
    return data
}

// export const fetchBreedsList = async () => {
//     const response = await axios.get("https://dog.ceo/api/breeds/list/all")
//     const data = await response.data.message
//     return data
// }

// export const fetchselectedBreedPics = async (breed: string) => {
//     const url = `https://dog.ceo/api/breed/${breed}/images/random/20`
//     const response = await axios.get(url)
//     const data = response.data.message
//     return data
// }

// export const fetchAllDogPics = async () => {
//     const response = await axios.get('https://dog.ceo/api/breeds/image/random/30')
//     const data = await response.data.message
//     return data
// }