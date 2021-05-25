const path = require(`path`);

const express = require(`express`);
const expressHbs = require(`express-handlebars`);

const app = express();

const homeData = require(`./routes/home`);
const usersRoutes = require(`./routes/users`);
const { extname } = require("path");

app.engine(
  `hbs`,
  expressHbs({
    extname: `hbs`,
    defaultLayout: false,
  })
);
app.set(`view engine`, `hbs`);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, `public`)));
app.use(usersRoutes);
app.use(homeData.routes);

app.listen(3000);
