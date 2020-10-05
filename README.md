<article class="markdown-body entry-content container-lg" itemprop="text">
<h1>What is this?</h1>
This project (node_rest_API) is a sample of REST API in Node.js, accessing MySQLDB using Sequelize, express, body-parser, JWT

<h1>How it works?</h1> 
You first need to run index.js using the follow command: nodemon index.js <br>
This will start a server in 3000 port. <br>
Access this link to create user in DB: 

http://localhost:3000/user <br>
<pre>
Passing JSON like that: <br>
{
    "name":"Some Name",
    "email":"email@gmail.com",
    "password":"somepassword"
} </pre>

After that, access this link to get a Token. <br>
<pre>
http://localhost:3000/auth
Pass this JSON:
{
    "email":"email@gmail.com",
    "password":"somepassword"
}
</pre>

This will return Token like that: <br>
<pre>
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGhhaXMgQWx2aW0iLCJlbWFpbCI6InRoYWlzYWx2aW1AZ2
              1haWwuY29tIiwiaWF0IjoxNjAxODU4MTgzLCJleHAiOjE2MDE5MDEzODN9.vVKb-EMuSubLTewb9b7mqaFHFc4Gvfu2Vq_mZuA-67A"
}
</pre>

<h1>Others Options </h1> (http://localhost:3000/ ....) <br>
<pre>
POST - /game (include a new game). JSON sample: {"title":"New game","year":1990,"price":300 }
DEL - /game:id (delete an especific game)
GET - /games (list all games)
PUT - /games/:id (update especific game, passing JSON). JSON sample: {"title":"New game","year":1990,"price":300 }
</pre>    
</article>







