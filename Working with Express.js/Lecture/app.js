const path = require(`path`);

const express = require(`express`);

const app = express();

app.set(`view engine`, `ejs`);
app.set(`views`, `views`);

const sequelize = require(`./util/database`);

const Product = require(`./models/product`);
const User = require(`./models/user`);
const Cart = require(`./models/cart`);
const CartItem = require(`./models/cart-item`);
const Order = require(`./models/order`);
const OrderItem = require(`./models/order-item`);

const adminRoutes = require(`./routes/admin`);
const shopRoutes = require(`./routes/shop`);

const errorController = require(`./controllers/error`);

const bodyParser = require(`body-parser`);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, `public`)));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => {
      console.log(error);
    });
});

app.use(`/admin`, adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: `CASCADE` });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: `Kas`, email: `KasRoid@gmail.com` });
    }
    return Promise.resolve(user);
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
