import { useState } from 'react'
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/700.css"
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Navbar from './Components/CommonComponents/Navbar'
import SignIn from './AuthPages/SignIn'
import SignUp from './AuthPages/SignUp'
import ForgotYourPassword from './AuthPages/ForgotYourPassword'
import BlogPageSpecific from './Pages/BlogPageSpecific'
import BlogEditorAndPublishFormWrapper from './WrapperProvider/BlogEditorAndPublishFormWrapper'
import Logout from './AuthPages/Logout'
import AdminLoginPage from './AuthPages/AdminLoginPage'
import AdminLayout from './AdminPages/AdminLayout'
import Dashboard from './AdminPages/pages/Dashboard'
import PublicProtectedRoute from './ProtectedRoute/PublicProtectedRoute'
import PageNotFound from './Pages/PageNotFound'
import AuthRouteProtected from './ProtectedRoute/AuthRouteProtected'
import Blogs from './AdminPages/pages/Blogs'

function App() {


  return (
    <>
      
        <Routes>

          <Route path='/blog-editor' element={<AuthRouteProtected><BlogEditorAndPublishFormWrapper /></AuthRouteProtected>} />

          <Route path='/' element={<Navbar />}>
            <Route index element={<HomePage />} />
            <Route path='/sign-in' element={<PublicProtectedRoute><SignIn /></PublicProtectedRoute>} />
            <Route path='/sign-up' element={<PublicProtectedRoute><SignUp /></PublicProtectedRoute>} />
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/forgot-password' element={<ForgotYourPassword />} />
            <Route path='/blog/:type/:blogId' element={<BlogPageSpecific />} />
          </Route>

          
            {/* Admin Routes */}
            <Route path={`https://anuj-dai-blog-frontend.onrender.com/admin-login-route`} element={<AdminLoginPage/>}/>
            <Route path='/admin' element={<AuthRouteProtected><AdminLayout/></AuthRouteProtected>}>
              <Route index element={<Dashboard/>}/>
              <Route path="admin-blog" element={<Blogs/>}/>
            </Route>


           <Route path="*" element={<PageNotFound/>} />
        </Routes>


    </>
  )
}

export default App
