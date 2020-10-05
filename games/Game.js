const Sequelize = require("sequelize");
const connection = require("../database/database");

const Game = connection.define('games',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }, 
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.REAL,
        allowNull: true
    }
})


//Game.sync({force:true});
module.exports = Game;
