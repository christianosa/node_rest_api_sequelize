## What is this?
This example / project was created as an initiative to share something I learned about how to create REST API in Node.js (backend).

## Introduction 
This project is an application / sample created to memorize topics from a great online course I attended. It was an interesting sample that I would like to share.
Many projects today need to deliver the REST API to integrate systems. I believe it is a good example to show how to do this.

## Table of contents
* [Technologies](#technologies)
* [Setup](#setup)
* [Endpoints](#endpoint)

## Technologies
Project is created with:
* Node.js versiom 12.18.3
* express version 4.17.1
* mysql2 version 2.2.5
* sequelize version 6.3.5
* body-parser version 1.19.0
* cors version 2.8.5
* jsonwebtoken version 8.5.1
	
## Setup
To run this project, install it locally using npm: <br>
$ npm install express --save <br>
$ npm install sequelize --save <br>
$ npm install mysql2 --save <br>
$ npm install body-parser --save <br>

After install, use this command to start your server (from project directory): <br>
$ node index.js

## Endpoints

Antes de usar qualquer um dos terminais abaixo, você precisa estar autenticado. Para fazer isso, use o seguinte 'auth': <br>
* POST /auth (you need to pass as param: user / password). This will return a Bearer Token. You need to inform this Token as a param to use the endpoints. Sample using axios:
<pre>
    //var to setup the authentication process
    var authConfig = {
        headers: {
 	     Authorization: "Bearer "
        }
    };
    
    //Get authorization token and set authConfig var.
    var authConfig;
    axios.post("http://localhost:3000/auth", {
	email, password
    }).then(res => {
	var token = res.data.token;
	authConfig.headers.Authorization = "Bearer " + token;
    }).catch(err => {
        console.log(err);
    }); 
</pre>
* GET /games (list all games. retorn a list of object game - json format). <pre> Ex: GET("http://localhost:3000/games", authConfig) </pre> 
* POST / game:id (get a especific game identified by id. return object related to the indicated id - json format). <pre> Ex: POST("http://localhost:3000/game:id", authConfig) </pre>
* DELETE / game:id (delete especific game identified by id. return status code 200 - if everything went as expected). <pre> Ex: DELETE("http://localhost:3000/game/:id", authConfig) </pre>
* PUT / game:id (update an especic game, identified by id. retorn status code 200 - if everything went as expected). <pre> Ex: PUT("http://localhost:3000/game/:id", game, authConfig) </pre>
