import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { loader as homeLoader } from "../Pages/Home";
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
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Navigation />}>
                  {/* <Route index element={<Home/>} loader={homeLoader} /> */}
                  <Route index element={<Home/>} />
                  <Route path="/find" element={<Find/>} />
                  <Route path="/profile" element={<Profile/>} />
                  <Route path="/editProfile" element={<EditProfile/>} />
                  <Route path="/addpost" element={<AddPost/>} />
                </Route>
              </Route>
            <Route path="/signup" element={<SignUp/>} />            
            <Route path="/login" element={<Login/>} />            
          </Routes>
        </BrowserRouter>
      </Suspense>
    </AuthProvider>
  )
};

export default MainRoter;
