from motor.motor_asyncio import AsyncIOMotorClient
import os

def init_db():
    MONGO_URI = os.getenv("MONGO_URL", "mongodb://localhost:27017")
    client = AsyncIOMotorClient(MONGO_URI)
    db = client["testdb"]
    return {
        "items_collection": db["item"],
        "users_collection": db["users"]
    }
    # Question for chocolate: How can we implement nosql syntax in mysql ???
    #By enabling the X Plugin, using the X DevAPI, and leveraging MySQL Shell, you can perform #
    #NoSQL-style operations—such as storing, querying, and manipulating JSON documents—directly 
    #in MySQL using NoSQL-like syntax and workflows. This allows you to combine the flexibility of NoSQL with the 
    #reliability and features of a traditional relational database.