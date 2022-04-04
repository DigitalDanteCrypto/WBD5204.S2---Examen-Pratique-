const express = require('express');
const path = require('path');

const PORT = 8080
const LISTEN = "127.0.0.1"

const app = express();

app.get('/', (req, res) => {
    res.send({
        Hello: 'World !',
        
    })
})

app.listen(PORT, LISTEN, () => {
    console.log(`Le serveur est lancé sur le port : ${PORT}`)
})