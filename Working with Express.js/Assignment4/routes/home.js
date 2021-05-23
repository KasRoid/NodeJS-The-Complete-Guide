const path = require(`path`);

const express = require(`express`);

const router = express.Router();

const usernames = [];

router.get(`/`, (req, res, next) => {
  res.sendFile(path.join(__dirname, `..`, `views`, `home.html`));
});

router.post(`/`, (req, res, next) => {
  usernames.push(req.body.title);
  res.redirect(`/users`);
});

module.exports.routes = router;
module.exports.usernames = usernames;
