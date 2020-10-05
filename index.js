const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Game = require("./games/Game");
const User = require("./users/User");
const cors = require("cors");
const gamesController = require("./games/GamesController");
const usersController = require("./users/UsersController");

function auth(req, res, next) {
    const authToken = req.headers['authorization'];
    console.log(authToken);
    next();
}


//Instancia da biblioteca Express
const app = express();

//Permite o teste da API através do JS Axios, local
app.use(cors());

//Instancia do BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Carrega o controller Game e User
app.use("/",gamesController);
app.use("/",usersController);



//Instancia variável de conexão com BD (classe database.js)
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    })



app.listen(3000, () => {
    console.log("API Rodando!");
})