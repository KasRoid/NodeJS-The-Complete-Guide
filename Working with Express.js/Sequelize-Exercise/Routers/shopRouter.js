const path = require(`path`);

const express = require(`express`);

const router = express.Router();

router.get(`/`, (req, res, next) => {
  res.sendFile(path.join(__dirname, `..`, `views`, `home.html`));
});

router.post("/cart", (req, res, next) => {
  const body = req.body;
  console.log(body);
});

module.exports = router;
