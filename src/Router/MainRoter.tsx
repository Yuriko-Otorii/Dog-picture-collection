import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "../Components/Navigation";

import { loader as homeLoader } from "../Pages/Home";
import { Spin } from "antd";

const SignUp = lazy(() => import("../Pages/SignUp"));
const Login = lazy(() => import("../Pages/Login"));
const Home = lazy(() => import("../Pages/Home"));
const Search = lazy(() => import("../Pages/Search"));
const Profile = lazy(() => import("../Pages/Profile"));
const AddPost = lazy(() => import("../Pages/AddPost"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      { path: "/find", element: <Search /> },
      { path: "/profile", element: <Profile /> },
      { path: "/addpost", element: <AddPost /> },
    ],
  },

  // {path: "/", element: <Home />, loader: homeLoader},
  // {path: "/search", element: <Search />},
  // {path: "/profile", element: <Profile />},
  // {path: "/addpost", element: <AddPost />},

  // {
  //   path: "/login",
  //   element: <publicRoute />,
  //   children: [
  //     { path: "/signup", element: <SignUp /> },
  //     { path: "/login", element: <Login /> },
  //   ],
  // },
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <Login /> },
]);

function MainRoter() {
  return (
    <Suspense
      fallback={
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <h1 style={{ textAlign: "center", margin: "2rem auto" }}>Loading...</h1>
          <Spin size="large"/>
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default MainRoter;

//https://zenn.dev/msksgm/articles/20211117-typescript-react-router-dom-layout

//https://reactrouter.com/en/main/routers/create-browser-router
