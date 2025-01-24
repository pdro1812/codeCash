from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import get_collection  # Supondo que essa função esteja correta
from bson import ObjectId

app = FastAPI()

# Obtém a coleção do MongoDB
collection = get_collection("pessoasFisicas")

class PessoaFisica(BaseModel):
    cpf: str
    name: str
    rg: str
    phone: str
    email: str
    password: str

@app.get("/api/")
def home():
    return {"message": "bem vindo"}

@app.post("/api/register/")
async def criar_pessoa_fisica(pessoa: PessoaFisica):
    try:
        # Converte o modelo Pydantic para dicionário
        pessoa_dict = pessoa.dict()

        # Insere no MongoDB
        pessoa_id = collection.insert_one(pessoa_dict).inserted_id

        return {"message": "Pessoa física criada com sucesso!", "id": str(pessoa_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao criar pessoa física: {e}")
