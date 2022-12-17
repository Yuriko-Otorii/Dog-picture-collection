
import { supabase } from "../Auth/supabaseClient";

export const fetchAllPosts = async () => {
    const { data, error } = await supabase
    .from("all posts")
    .select("*")

    if(error) console.error(error);
    return data
}
