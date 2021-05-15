const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === `/`) {
    res.write(`<html>`);
    res.write(`<head><title>The First Assignment</title></head>`);
    res.write(`<body><h1>This is my first assignment.</h1></body>`);
    res.write(
      `<body><form action="/create-user" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>`
    );
    res.write(`</html>`);
    return res.end();
  }
  if (url === `/users`) {
    res.write(`<html>`);
    res.write(`<ul><li>User 1</li></ul>`);
    res.write(`<ul><li>User 2</li></ul>`);
    res.write(`<ul><li>User 3</li></ul>`);
    res.write(`</html>`);
    return res.end();
  }
  if (url === `/create-user`) {
    const body = [];
    req.on(`data`, (chunk) => {
      body.push(chunk);
    });
    return req.on(`end`, () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(`Parsed Body`, parsedBody);
      const message = parsedBody.split(`=`)[1];
      console.log(`username:`, message);
      res.write(`<html>`);
      res.write(`<body><h1>Welcome ${message}</h1></body>`);
      res.write(`</html>`);
    });
  }
};

module.exports = requestHandler;
