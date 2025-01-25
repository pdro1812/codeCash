const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const bcrypt = require("bcrypt");
const jwt = require('jsonwentoken');
const app = express();

const secretkey = 'chavedeteste';

app.use(bodyParser.json());
app.use(require('cors')());

function generateToken(userId){
    return jwt.sign({userId}, secretkey, {expiresIn: '1h'});
}

app.post('/register', async (req, res) => {
    const {cpf, name, rg, phone, email, password} =  req.body;

    try {
        const saltRounds = 10;
        const hashedPassowrd = await bcrypt.hash(password, saltRounds);
        
        const user = {
            cpf, 
            name, 
            rg,
            phone,
            email,
            password: hashedPassowrd,
        };

        const response = await axios.post('http://localhost:8000/api/register', user);

        const token = generateToken(response.data.user._id);

        res.status(response.status).send({token, user: response.data.user});
        res.status(response.status).send(response.data);
    } catch (error) {  
        console.error('erro ao se comunicar com a API', error.message);
        res.status(500).send({ error: "erro ao processar cadastro" });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await axios.post('http://localhost:8000/api/login/', { email, password });

        const user = response.data.user;
        const isMatch = await bcrypt.compare



        res.status(200).send(response.data);

    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500)
           .send(error.response ? error.response.data : { error: "Erro interno" });
    }
});

app.listen(3000, () => console.log(`servidor rodando na 3000`)); 


