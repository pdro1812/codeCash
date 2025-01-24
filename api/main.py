from fastapi import FastAPI, HTTPException
from database import get_collection
from bson import ObjectId

app = FastAPI()

collection = get_collection("pessoasFisicas")

@app.get("/")
def home():
    return{"message": "bem vindo"} 

@app.post("/itens/")
def create_item(item: dict):
    result = collection.insert_one(item)
    return{"message": "iten inserido com sucesso", "id": str(result.inserted_id)}

@app.get("/itens/{item_id}")
def get_item(item_id: str):
    try:
        item = collection.find_one({"_id": ObjectId(item_id)})
        if not item:
            raise HTTPException(status_code=404, detail="Item não encontrado")
        return {"nome": item.get("nome")}
    except Exception:
        raise HTTPException(status_code=400, detail="ID inválido")
    
@app.delete
def delete_iten(item_id: str):
    result = collection.delete_one({"_id": item_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="item nao encotrado")
    return {"message": "item deletado com sucesso"}