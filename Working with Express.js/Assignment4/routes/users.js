const express = require(`express`);

const router = express.Router();

const homeData = require(`./home`);

router.get(`/users`, (req, res, next) => {
  const usernames = homeData.usernames;
  let result = ``;
  for (const username of usernames) {
    result += username + `\n`;
  }
  res.send(`${result}`);
});

module.exports = router;
