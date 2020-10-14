const express = require("express");
const router = express.Router();
const Game = require("./Game");
const authAPI = require("../middleware/authAPI");


//API Rest Post, para inserir um registro game na BD
router.post("/game", authAPI, (req, res) => {
    var title = req.body.title;
    var year = req.body.year;
    var price = req.body.price;

    //validação dos campos 
    if(isNaN(year) || isNaN(price) || (title == undefined) 
                   || (year == undefined) || (price == undefined)){
        res.sendStatus(400);
    }

    //Chamada ao método para inserir no BD usando Biblioteca Sequelize.
    Game.create({
        title: title,
        year: year,
        price: price
    }).then(() => {
        res.sendStatus(200);
    }).catch(err =>{
        res.sendStatus(400);
    })
}) ;

//API Rest GET, objetivando a consulta de um game através da chave ID
router.get("/game/:id", authAPI, (req, res) => {
    var id = req.params.id;

    //Validação do campo ID
    if(isNaN(id)){
        res.sendStatus(400);
    }

    //Busca no BD do Game através da Pk ID
    Game.findByPk(id).then(game => {
        if(game != undefined){


            var HATEOAS = [
                {
                    href: "http://localhost:3000/game/"+id,
                    method: "GET",
                    rel: "get_game"
                }, 
                {
                    href: "http://localhost:3000/game/"+id,
                    method: "DELETE",
                    rel: "delete_game"
                }, 
                {
                    href: "http://localhost:3000/game/"+id,
                    method: "PUT",
                    rel: "edit_game"
                },                 
                {
                    href: "http://localhost:3000/games",
                    method: "POST",
                    rel: "get_all_games"
                }
            ]

            //Retorno código de sucesso, junto com o Game
            res.statusCode = 200;
            res.json({game, _links: HATEOAS});
        }else{
            //Retorno Game não encontrado.
            res.sendStatus(404);
        }
    }).catch(erro => {
        //Retorno Erro
        res.sendStatus(404);        
    })
}) ;

//API Rest para exclusão de um game da BD através do ID
router.delete("/game/:id", authAPI, (req, res) => {
    var id = req.params.id;

    //Validação do campo ID
    if(id != undefined){
        if(!isNaN(id)){

            //verifica se existe
            Game.findByPk(id).then(game => {
                if(game != undefined){
                    //Apago o Game da BD
                    Game.destroy({
                        where: {
                            id: id
                        }
                    }).then(() => {
                        //Retorno sucesso
                        res.sendStatus(200);
                    });
                  }else{
                      //retorno insucesso
                      res.sendStatus(404);
                }
            }).catch(erro => {
                //retorno erro
                res.sendStatus(404);        
            })

        }else{// NÃO FOR UM NÚMERO
            res.sendStatus(400);
        }
    }else{ // NULL
        res.sendStatus(400);
    }

}) ;

//API Rest para atualização dos dados do game na BD
router.put("/game/:id", authAPI, (req, res) => {
    var id = req.params.id;
    var title = req.body.title;
    var year = req.body.year;
    var price = req.body.price;
   
    //Valida o ID e compõe o JSON para atualização via PUT
    if(isNaN(id)){
        res.sendStatus(400);
    } else {
        var json = "{";

        if (title != undefined) {
            json += '"title":' + '"' + title + '"';
        }
        if (price != undefined) {
            if (title != undefined) {
                json += ",";
            }
            json += '"price":' + price;
        }
        if (year != undefined) {
            if ((title != undefined) && (price != undefined))  {
                json += ",";
            }
            json += '"year":' + price;
        }
        json += "}"
        console.log(JSON.parse(json));

        //Executa a atualização no BD
        Game.update(JSON.parse(json),{
            where: {
                id: id
            }
        }).then(() => {
            res.sendStatus(200);   
        }).catch(err =>{
            res.sendStatus(400); 
        })
    
    }

});

//API Rest para listar os games cadastrados
router.get("/games", authAPI, (req, res) => {

    res.statusCode = 200;
    Game.findAll().then(games => {
         res.json(games);
        
    });
}) ;


module.exports = router;