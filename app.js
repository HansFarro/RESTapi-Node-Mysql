const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// conectar a base de datos MYSQL
const connection = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'password',
  database:'techowler'
})

// ver todos los bloggers
app.get('/customers',(req,res) => {
  const sql ="SELECT * FROM blog_card";
  
  connection.query(sql,(error,results) => {
    if (error) throw error;
    if(results.length > 0){
      res.json(results)
    }else{
      res.send('No hay resultados')
    }
  })
})

// Enviar datos
app.post('/add',(req,res) => {
  const sql = "INSERT INTO blog_card SET ?";
// author,country,age,profession,developer
  const blogger = {
    author: req.body.author,
    country: req.body.country,
    age: req.body.age,
    profession: req.body.profession,
    developer: req.body.developer
  };

  connection.query(sql, blogger , error => {
    if(error) throw error;
    res.send('Blogger creado');
  })
})

// verificar conexion
connection.connect(error => {
  if(error) throw error;
  console.log('Base de datos funcionando');
})

app.get('/',(req,res) => {
  res.send('Hola a mi primera API MYSQL-NODEJS')
})

const PORT = process.env.PORT || 8000;

// Listen on port
app.listen(PORT,() => console.log(`server running in ${PORT}`));