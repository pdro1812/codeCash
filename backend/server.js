const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());
app.use(require('cors')());

const PORT = 3000;

app.listen(PORT, () => console.log(`servidor rodando na ${PORT}`)); // Corrigido aqui para template string

app.post('/register', async (req, res) => {
    const userData = req.body;
    try {
        const response = await axios.post('http://localhost:8000/api/register', userData);
        res.status(response.status).send(response.data);
    } catch (error) {  
        console.error('erro ao se comunicar com a API', error.message);  // Corrigido "error.messsage" para "error.message"
        res.status(500).send({ error: "erro ao processar cadastro" });
    }
});
