const express = require("express");
const router = express.Router();
const User = require("./User");
const jwt = require("jsonwebtoken");
const authAPI = require("../middleware/authAPI");


//API Rest Post, para inserir um registro user na BD
router.post("/user", authAPI, (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    //validação dos campos 
    if((name == undefined) || (email == undefined) || (password == undefined)){
        res.sendStatus(400);
    }

    //Chamada ao método para inserir no BD usando Biblioteca Sequelize.
    User.create({
        name: name,
        email: email,
        password: password
    }).then(() => {
        res.sendStatus(200);
    }).catch(err =>{
        res.sendStatus(400);
    })
}) ;

//Rota criada para autenticação. Aqui será gerado o Token
router.post("/auth", (req, res) => {
    var {email, password} = req.body;
    console.log("palavra chave = " + jwtsecret);
    if (email != undefined) {

        //Busca no BD do Game através da Pk ID
        User.findOne({where:{email: email}}).then(user => {

            if(user != undefined){ // Se existe um usuário com esse e-mail

                if(user.password == password){
                    jwt.sign({name:user.name, email: user.email}, jwtsecret, {expiresIn: '12h'}, (err, token) => {
                        if (err) {
                            res.statusCode = 400;
                            res.json({err: "Falha interna!"});
                        } else {
                            res.statusCode = 200;
                            res.json({token: token});
                        }
                    });


                }else{
                    res.statusCode = 401;
                    res.json({err: "Credenciais inválidas!"})
                }

            }else{
                res.statusCode = 404;
                res.json({err: "E-mail enviado não encontrado!"});
            }
        });      
    } else {
        res.statusCode = 400;
        res.json({err: "email enviado é inválido!"});        
    }
})

module.exports = router;