export interface User {
    userId: Number;
    userName: String;
    email?: String;
    password?: String;
    avaterImg: String;
    posts: {postList: []};
    favPosts: [];
    favPics: [];
}