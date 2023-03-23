import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
import Navigation from "../Components/Navigation";

const router = createBrowserRouter([
  {path: "/", element: <PrivateRoute />, children: [
    {path: "/", element: <Navigation />, children: [
      // {path: "/", element: <Home />, loader: homeLoader},
      {path: "/", element: <Home />},
      {path: "/find", element: <Find />},
      {path: "/addpost", element: <AddPost />},
      {path: "/profile", element: <Profile />},
      {path: "/editprofile", element: <EditProfile />},
    ]}
  ]},
  {path: "/login", element: <Login />},
  {path: "/signup", element: <SignUp />}
])

const MainRoter = () => {
  return (
    <AuthProvider>
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
        <RouterProvider router={router} />        
      </Suspense>
    </AuthProvider>
  )
};

export default MainRoter;
