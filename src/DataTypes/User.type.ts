export interface User {
    userId: Number;
    username: String;
    email?: String;
    password?: String;
    avatarImg: String;
    posts: {postList: []};
    favPosts: [];
    favPics: [];
}