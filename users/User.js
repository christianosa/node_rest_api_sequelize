const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('users',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }, 
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },    
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//Essa linha, ao ser desabilitada, força o BD a criar a estrutura
//User.sync({force:true});
module.exports = User;
