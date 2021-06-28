const path = require(`path`);

const express = require(`express`);

const app = express();

const shopRouter = require(`./routers/shopRouter`);
const adminRouter = require(`./routers/adminRouter`);

app.use(express.static(path.join(__dirname, `public`)));
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRouter);
app.use("/", shopRouter);

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
