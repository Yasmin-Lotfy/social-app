import { createBrowserRouter, Navigate, RouterProvider } from "react-router"
import AuthLayout from "./layout/AuthLayout"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home/Home"
import Newsfeed from "./pages/Newsfeed/Newsfeed"
import Notifications from "./pages/Notifications/Notifications"
import Profile from "./pages/Profile/Profile"
import Notfound from "./pages/Notfound/Notfound"
import { Toaster } from "react-hot-toast"
import AppProtectedRoute from "./components/ProtectedRoutes/AppProtectedRoute"
import AuthProtectedRoute from "./components/ProtectedRoutes/AuthProtectedRoute"
import PostDetails from './components/PostCard/PostDetails';


function App() {
    // const [token, setToken ] = useState<string | null>(
    //   localStorage.getItem("userToken"),
    // );

const routes = createBrowserRouter([
  {path:"/auth", element:<AuthProtectedRoute><AuthLayout/> </AuthProtectedRoute>, children :[
    {index:true, element: <Navigate to="login" />},
     {path:"login", element:<Login/>},
    {path:"register", element:<Register/>},
   
  ]},


  {path:"/", element:<AppProtectedRoute><MainLayout/></AppProtectedRoute> , children :[
    {index:true , element:<Navigate to="/home" />},
    {path:"home" , element:<Home/>},
    {path:"feed" , element:<Newsfeed/>},
    {path:"notification" , element:<Notifications/>},
    {path:"profile" , element:<Profile/>},
    {path:"postDetails/:id" , element:<PostDetails/>},
   
  ]},

   {path:"*" , element:<Notfound/>},
])


  return (<>
  <Toaster />
     <RouterProvider router={routes}></RouterProvider>
  </>

  )
}

export default App