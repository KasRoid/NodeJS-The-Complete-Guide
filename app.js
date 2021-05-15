const http = require(`http`);
const server = http.createServer(rqListener);

function rqListener(req, res) {
  console.log(req);
}

server.listen(3000);
