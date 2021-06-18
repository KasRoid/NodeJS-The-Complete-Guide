const path = require(`path`);

const express = require(`express`);

const router = express.Router();

router.get(`/`, (req, res, next) => {
  res.sendFile(path.join(__dirname, `..`, `views`, `admin.html`));
});

router.post(`/`, (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  console.log(title, description);
  res.redirect(`/`);
});

module.exports = router;
