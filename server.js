const fs = require('fs');
const http = require('http');
const app = require('express')();
const index = fs.readFileSync('./index.html','utf8');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL;
const client = new Client(connectionString);
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


client.connect();

app.get('/',(req,res) => {
  res.statusCode = 200;
  res.send(index);
});

app.get('/number',(req,res)=> {
  client.query('SELECT * FROM number').then(result => {
    res.send(`${result.rows.reduce((endResult,number) => endResult+parseInt(number.value),0)}`);
  });
});

app.post('/number',(req,res) => {
  client.query('CREATE TABLE IF NOT EXISTS number ( value integer(100));');
  client.query(`INSERT INTO number values(${req.body.number})`);
  res.redirect('/number');
  res.end();
})

const server = http.createServer(app);
server.listen(PORT);
console.log(`server listening at ${PORT}`);