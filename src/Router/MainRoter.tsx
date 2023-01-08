import React, { lazy, Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Navigation from "../Components/Navigation";

import { loader as homeLoader } from "../Pages/Home";
import { Spin } from "antd";
import { AuthProvider } from "../Auth/AuthContext";

const SignUp = lazy(() => import("../Pages/SignUp"));
const Login = lazy(() => import("../Pages/Login"));
const Home = lazy(() => import("../Pages/Home"));
const Find = lazy(() => import("../Pages/Find"));
const Profile = lazy(() => import("../Pages/Profile"));
const EditProfile = lazy(() => import("../Pages/EditProfile"));
const AddPost = lazy(() => import("../Pages/AddPost"));

import PrivateRoute from "../Auth/PrivateRoute"
import PublicRoute from "../Auth/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      { path: "/find", element: <Find /> },
      { path: "/profile", element: <Profile /> },
      { path: "/editprofile", element: <EditProfile /> },
      { path: "/addpost", element: <AddPost /> },
    ],
  },

  // {
  //   path: "/",
  //   element: <PrivateRoute />,
  //   children: [
  //     { path: "/", element: <Navigation/>, children: [
  //       { path: "/", element: <Home />, loader: homeLoader },
  //       { path: "/find", element: <Find /> },
  //       { path: "/profile", element: <Profile /> },
  //       { path: "/editprofile", element: <EditProfile /> },
  //       { path: "/addpost", element: <AddPost /> },
  //     ]}
  //   ]
  // },

  // {path: "/", element: <Home />, loader: homeLoader},
  // {path: "/search", element: <Search />},
  // {path: "/profile", element: <Profile />},
  // {path: "/addpost", element: <AddPost />},


  // {
  //   path: "/",
  //   element: <PublicRoute />,
  //   children: [
  //     { path: "/signup", element: <SignUp /> },
  //     { path: "/login", element: <Login /> },
  //   ],
  // },
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <Login /> },
]);

const MainRoter = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ textAlign: "center", margin: "2rem auto" }}>
            Loading...
          </h1>
          <Spin size="large" />
        </div>
      }
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Suspense>
  );
};

export default MainRoter;

//https://zenn.dev/msksgm/articles/20211117-typescript-react-router-dom-layout

//https://reactrouter.com/en/main/routers/create-browser-router

//https://github.com/ruanmartinelli/supabase-auth-react/blob/main/src/components/App.js