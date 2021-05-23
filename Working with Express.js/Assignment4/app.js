const path = require(`path`);

const express = require(`express`);

const app = express();

const homeData = require(`./routes/home`);
const usersRoutes = require(`./routes/users`);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, `public`)));
app.use(usersRoutes);
app.use(homeData.routes);

app.listen(3000);
