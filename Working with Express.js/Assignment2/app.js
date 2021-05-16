const express = require(`express`);

const app = express();

app.use(`/users`, (req, res, next) => {
  console.log(`Users`);
  res.send(`<h1>This is Users Page</h1>`);
  next();
});

app.use(`/`, (req, res, next) => {
  console.log(`222`);
  res.send(`<h1>Welcome to the Main Page</h1>`);
});

app.listen(3000);
