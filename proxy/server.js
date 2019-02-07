const http = require('http');
const forward = require('http-forward');
const hosts = ['hello1','hello2','hello3'];
const whomTosend = () => {
  console.log('coming here');
  
  const host = hosts.shift();
  hosts.push(host);
  return host;
}

 var server = http.createServer(function (req, res) {
  const host = whomTosend();
  req.forward = { target: `http://${host}`};
  forward(req, res)
})

server.listen(3000);
console.log('Listening at 8080');
