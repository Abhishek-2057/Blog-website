# db.py
from pymongo import MongoClient
import os

from dotenv import load_dotenv

# Load environment variables
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI") 

client = MongoClient(MONGO_URI,
    tls=True,
    tlsAllowInvalidCertificates=True  # Use this only for testing; not recommended for production
)
print("Connected to MongoDB")

# Access the database
db = client["readBlog"]

# Define collections
blog_collection = db["blogs"]  # Collection for blogs
user_collection = db["users"]  # Collection for users




#jHqSK0nlIcE7ni50
#mongodb+srv://<db_username>:<db_password>@cluster0.ljvrgin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0