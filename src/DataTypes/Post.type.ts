import { User } from "../DataTypes/User.type"
export interface Post {
    postId: number;
    userId: number;
    username: string;
    avaterImg: string;
    postText: string;
    postImg: string;
    postDate: string;
    likes?: number;
    isLiked?: boolean;
    tags?: [];
    comments?: [];
    users: User;
}