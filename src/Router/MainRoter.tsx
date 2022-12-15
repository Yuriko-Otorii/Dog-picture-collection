import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navigation from '../Components/Navigation'

import { loader as homeLoader } from '../Pages/Home'


const SignUp = lazy(() => import("../Pages/SignUp"))
const Login = lazy(() => import("../Pages/Login"))
const Home = lazy(() => import("../Pages/Home"))
const Search = lazy(() => import("../Pages/Search"))
const Profile = lazy(() => import("../Pages/Profile"))
const AddPost = lazy(() => import("../Pages/AddPost"))


const router = createBrowserRouter([
  {path: "/", element: <Home />, loader: homeLoader},
  {path: "/signup", element: <SignUp />},
  {path: "/login", element: <Login />},
  {path: "/search", element: <Search />},
  {path: "/profile", element: <Profile />},
  {path: "/addpost", element: <AddPost />},
])

function MainRoter() {
  return (
    <Suspense fallback={<h1 style={{textAlign: "center", marginTop: "2rem"}}>Loading...</h1>}>
        <RouterProvider router={router} />
        {/* <Navigation /> */}
    </Suspense>
  )
}

export default MainRoter


//https://zenn.dev/msksgm/articles/20211117-typescript-react-router-dom-layout

//https://reactrouter.com/en/main/routers/create-browser-router