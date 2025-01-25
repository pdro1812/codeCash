from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import get_collection 
from bson import ObjectId
from passlib.context import CryptContext

app = FastAPI()

# Obtém a coleção do MongoDB
collection = get_collection("pessoasFisicas")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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
    
    

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/api/login/")
async def login(request: LoginRequest):
    try:
        # Verifica se o e-mail existe no banco
        user = collection.find_one({"email": request.email})
        if not user:
            raise HTTPException(status_code=401, detail="Email ou senha incorretos")

        # Valida a senha
        if not pwd_context.verify(request.password, user["password"]):
            raise HTTPException(status_code=401, detail="Email ou senha incorretos")

        return {"message": "Login bem-sucedido!", "user": {"id": str(user["_id"]), "email": user["email"]}}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao fazer login: {e}")
    


