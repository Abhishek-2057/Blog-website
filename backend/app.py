from flask import Flask, jsonify, request
from flask_cors import CORS
from bson import ObjectId
from bson.errors import InvalidId  # Import InvalidId exception
from werkzeug.security import generate_password_hash, check_password_hash  # For password hashing
import time

from db import blog_collection ,user_collection # 👈 import from db.py

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

# Utility function to convert ObjectId to string
def serialize_blog(blog):
    blog["_id"] = str(blog["_id"])
    return blog

# Utility function to convert user ObjectId to string
def serialize_user(user):
    user["_id"] = str(user["_id"])
    return user


def calculate_read_time(content):
    words = len(content.split())  # Count words in the content
    words_per_minute = 200  # Average reading speed
    read_time = max(1, round(words / words_per_minute))  # Round to the nearest minute
    return read_time



# Signup Route
@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()

    # Required fields
    required_fields = ("fullName", "email", "password", "confirmPassword")
    if not data or not all(field in data and data[field] for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    # Check if passwords match
    if data["password"] != data["confirmPassword"]:
        return jsonify({"error": "Passwords do not match"}), 400

    # Check if the email is already registered
    existing_user = user_collection.find_one({"email": data["email"]})
    if existing_user:
        return jsonify({"error": "Email is already registered"}), 400

    # Hash the password
    hashed_password = generate_password_hash(data["password"], method="pbkdf2:sha256", salt_length=8)


    # Create new user object
    new_user = {
        "fullName": data["fullName"],
        "email": data["email"],
        "password": hashed_password,  # Store hashed password
        "createdAt": time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())
    }

    # Insert into MongoDB
    result = user_collection.insert_one(new_user)

    # Convert the inserted ID to a string
    new_user["_id"] = str(result.inserted_id)

    # Return success response
    return jsonify({
        "message": "User registered successfully",
        "user": serialize_user(new_user)
    }), 201

# Login Route
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    # Required fields
    required_fields = ("email", "password")
    if not data or not all(field in data and data[field] for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    # Find user by email
    user = user_collection.find_one({"email": data["email"]})
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    # Check password
    if not check_password_hash(user["password"], data["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    # Return success response
    return jsonify({
        "message": "Login successful",
        "user": {
            "_id": str(user["_id"]),
            "fullName": user["fullName"],
            "email": user["email"],
        }
    }), 200




@app.route('/api/blogs/search')
def search_blogs():
    query = request.args.get('q', '')
    blogs = blog_collection.find({"title": {"$regex": query, "$options": "i"}})
    return jsonify([serialize_blog(blog) for blog in blogs])


@app.route("/")
def welcome():
    return jsonify({"message": "Welcome to ReadBlogs API with MongoDB"})



@app.route("/api/blogs", methods=["GET"])
def get_blogs():
    blogs = list(blog_collection.find())
    return jsonify([serialize_blog(blog) for blog in blogs])





@app.route("/api/blogs/<string:blog_id>", methods=["GET"])
def get_single_blog(blog_id):
    try:
        # Validate and convert blog_id to ObjectId
        blog = blog_collection.find_one({"_id": ObjectId(blog_id)})
        if blog:
            return jsonify(serialize_blog(blog))
        return jsonify({"error": "Blog not found"}), 404
    except InvalidId:
        # Handle invalid ObjectId
        return jsonify({"error": "Invalid blog ID"}), 400
    
    
# Route to Fetch Blogs by User

@app.route("/api/user-blogs/<user_id>", methods=["GET"])
def get_user_blogs(user_id):
    # Find blogs by userId
    blogs = list(blog_collection.find({"userId": user_id}))
    if not blogs:
        return jsonify({"message": "No blogs found for this user"}), 404

    # Serialize and return the blogs
    return jsonify([serialize_blog(blog) for blog in blogs]), 200

@app.route("/api/post/blogs", methods=["POST"])
def add_blog():
    data = request.get_json()

    # Required fields
    required_fields = ("title", "category", "author", "date", "smallDescription", "description", "image", "userId")
    
    # Check if all required fields are present
    if not data or not all(field in data and data[field] for field in required_fields):
        return jsonify({"error": "Missing required blog fields"}), 400

    # Create new blog object
    new_blog = {
        "title": data["title"],
        "category": data["category"],
        "readTime": calculate_read_time(data["description"]),  # Calculate read time
        "author": data["author"],
        "date": data["date"],
        "smallDescription": data["smallDescription"],
        "description": data["description"],
        "image": data["image"],  # Base64 string
        "userId": data["userId"],  # Associate the blog with the user
        "createdAt": time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())
    }

    # Insert into MongoDB
    result = blog_collection.insert_one(new_blog)

    # Convert the inserted ID to a string
    new_blog["_id"] = str(result.inserted_id)

    # Return success response
    return jsonify({
        "message": "Blog added successfully",
        "id": str(result.inserted_id),
        "blog": new_blog
    }), 201



@app.route("/api/delete-blog/<blog_id>", methods=["DELETE"])
def delete_blog(blog_id):
    # Get the userId from the request (sent from the frontend)
    data = request.get_json()
    user_id = data.get("userId")

    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    # Find the blog by ID
    blog = blog_collection.find_one({"_id": ObjectId(blog_id)})

    if not blog:
        return jsonify({"error": "Blog not found"}), 404

    # Check if the blog belongs to the user
    if blog["userId"] != user_id:
        return jsonify({"error": "You are not authorized to delete this blog"}), 403

    # Delete the blog
    blog_collection.delete_one({"_id": ObjectId(blog_id)})
    return jsonify({"message": "Blog deleted successfully"}), 200



if __name__ == "__main__":
    app.run(debug=True)