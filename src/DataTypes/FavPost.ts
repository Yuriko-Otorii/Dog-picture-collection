import { User } from "./User.type"
import { Post } from "./Post.type"

export interface favPost {
    postId: number;
    userId: number;
    postText: string;
    postImg: string;
    postDate: string;
    users: User;
    likedState: boolean;
    postedUserInfo: User;
}