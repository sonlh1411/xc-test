const router = require("express").Router();
const auth = require(`${__dirname}/auth`);

router.use("/auth", auth);

module.exports = router;
