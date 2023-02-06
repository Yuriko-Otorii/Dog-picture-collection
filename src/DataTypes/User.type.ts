export interface User {
    userId: Number;
    username: string;
    email?: string;
    password?: string;
    avatarImg: string;
    posts: {postList: []};
    favPosts: [];
    favPics: [];
}