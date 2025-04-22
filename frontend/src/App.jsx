import React from 'react'
import Home from './page/Home'
import { Routes, Route } from 'react-router-dom'
import About from './page/About'
import Contact from './page/Contact'
import AllBlogsCard from './page/AllblogsCard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PostBlog from './page/PostBlog'
import BlogPage from './page/BlogPage'
import LoginPage from './page/LoginPage'
import SignupPage from './page/SignupPage'
import UserBlogs from './components/UserBlogs'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/allblogs" element={<AllBlogsCard />} />
        <Route path="/postblog" element={<PostBlog />} />
        <Route path="/blog/:blogId" element={<BlogPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/myblogs" element={<UserBlogs />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App



// https://uxpilot.ai/s/4e3aa7c720efdaffdcd6a0377a9d59fd