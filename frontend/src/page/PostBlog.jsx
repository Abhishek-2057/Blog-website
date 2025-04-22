import React, { useState } from "react";
import { axiosInstance } from "../lib/axios.js"; // Import your axios instance
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import useAuthStore from "../store/authStore.js"; // Import Zustand store for user authentication

const PostBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    date: "",
    smallDescription: "",
    description: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Track image upload status

  const categories = [
    "Technology",
    "Coding",
    "Travel",
    "Business",
    "Lifestyle",
    "Health",
    "Education",
    "Entertainment",
    "Finance",
  ];

  const user = useAuthStore((state) => state.user); // Get the logged-in user

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (file) => {
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Invalid file type. Only PNG, JPG, and WEBP are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds the 2MB limit.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsUploading(true); // Start uploading
      const response = await axiosInstance.post("/api/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsUploading(false); // Stop uploading
      return response.data.imageUrl; // Return the Cloudinary URL
    } catch (error) {
      setIsUploading(false); // Stop uploading
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "title",
      "category",
      "author",
      "date",
      "smallDescription",
      "description",
      "image",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in the ${field} field.`);
        return;
      }
    }

    // Additional validation
    if (formData.description.length < 50) {
      toast.error("Description must be at least 50 characters long.");
      return;
    }

    try {
      // Upload the image to Cloudinary
      const imageUrl = await handleImageUpload(formData.image);

      // Prepare blog data for submission
      const blogData = {
        ...formData,
        userId: user._id, // Automatically include the logged-in user's ID
        image: imageUrl, // Use the Cloudinary URL
      };

      // Submit the blog data
      const response = await axiosInstance.post("/api/post/blogs", blogData);
      toast.success("Blog published successfully!");
      console.log("Response:", response.data);

      // Reset form fields and image preview
      setFormData({
        title: "",
        category: "",
        author: "",
        date: "",
        smallDescription: "",
        description: "",
        image: null,
      });
      setImagePreview(null);
    } catch (error) {
      console.error("Error publishing blog:", error);
      toast.error("Failed to publish the blog. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Post a Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Blog Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Blog Title*</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter blog title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Category and Author */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category*</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Author Name*</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Enter author name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Publication Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Publication Date*</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Short Description*</label>
          <input
            type="text"
            name="smallDescription"
            value={formData.smallDescription}
            onChange={handleInputChange}
            placeholder="Brief summary of your blog (max 160 characters)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Blog Content */}
        <div>
          <label className="block text-sm font-medium mb-1">Blog Content*</label>
          <p className="text- font-medium text-gray-800 mb-1">Note* : Use "(nextLine)" to create a new line.</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Write your blog content here..."
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium mb-1">Featured Image*</label>
          <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
            ) : (
              <div className="text-gray-500 text-sm text-center">
                <p>Click to upload </p>
                <p>PNG, JPG, or WEBP (MAX. 2MB)</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFormData({ ...formData, image: file });
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {isUploading ? "Uploading..." : "Upload Image"}
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={() => {
              setFormData({
                title: "",
                category: "",
                author: "",
                date: "",
                smallDescription: "",
                description: "",
                image: null,
              });
              setImagePreview(null);
            }}
          >
            Reset
          </button>
          <button
            type="submit"
            className={`px-4 py-2 rounded-lg ${
              isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Publish Blog"}
          </button>
        </div>
      </form>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default PostBlog;