const Sequelize = require("sequelize");

const connection = new Sequelize('api','root','Thais@1608',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;