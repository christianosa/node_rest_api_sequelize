const jwt = require("jsonwebtoken");
global.jwtsecret = "123456789"; 

function authAPI(req, res, next) {
    const authToken = req.headers['authorization'];
    if (authToken != undefined) {
        const bearer = authToken.split(" ");
        const token = bearer[1];
        
        jwt.verify(token, jwtsecret, (err, data) => {
            if(err) {
                res.statusCode = 401;
                res.json({ err: "Token Inválido!"});
            } else {
                req.token = token;
                req.loggedUser = {name: data.name, email: data.email};
                next();
            }
        })

    } else {
        res.statusCode = 401;
        res.json({ err: "Token inválido!"});
    }
    

}
module.exports = authAPI;