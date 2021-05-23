const express = require(`express`);
const path = require(`path`);

const app = express();
const expressHbs = require(`express-handlebars`);

app.engine(`hbs`, expressHbs());
app.set(`view engine`, `hbs`);
app.set(`views`, `views`);

const adminData = require(`./routes/admin`);
const shopRoutes = require(`./routes/shop`);

const bodyParser = require(`body-parser`);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, `public`)));

app.use(`/admin`, adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render(`404`, { pageTitle: `Page Not Found` });
});

app.listen(3000);
