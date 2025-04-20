import { create } from 'zustand';

const useBlogStore = create((set) => ({
  allBlogs: [], // State for all blogs
  searchBlog: '', // State for the search query or selected blog
 

  // Action to set all blogs
  setAllBlogs: (blogs) => set({ allBlogs: blogs }),

  // Action to set the search query or selected blog
  setSearchBlog: (query) => set({ searchBlog: query }),
}));

export default useBlogStore;