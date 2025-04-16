from pydantic import BaseModel

class Item(BaseModel):#added BaseModel
    name: str #changed from int to str
    description: str

class User(BaseModel):
    username: str
    bio: str
    
    # You can raise your hands and give the answer to the chocolate question