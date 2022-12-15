export interface Post {
    postId: number;
    userId: number;
    userName: string;
    avaterImg: string;
    postText: string;
    postImg: string;
    likes: number;
    isLiked: boolean;
    postDate: string;
    tags?: [];
    comments?: [];
}