const http = require('http');
const app = require('express')();
const PORT = 3000;

app.get('/',(req,res) => {
  res.statusCode = 200;
  res.write("helllo");
  res.end();
});

const server = http.createServer(app);
server.listen(PORT);
console.log(`server listening at ${PORT}`);