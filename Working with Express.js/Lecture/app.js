const path = require(`path`);

const express = require(`express`);

const app = express();

app.set(`view engine`, `ejs`);
app.set(`views`, `views`);

const db = require(`./util/database`);
const adminRoutes = require(`./routes/admin`);
const shopRoutes = require(`./routes/shop`);

db.execute(`SELECT * FROM products`)
  .then((result) => {
    // console.log(result[0], result[1]);
  })
  .catch((error) => {
    // console.log(error);
  });

const errorController = require(`./controllers/error`);

const bodyParser = require(`body-parser`);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, `public`)));

app.use(`/admin`, adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
