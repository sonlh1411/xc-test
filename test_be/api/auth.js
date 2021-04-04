const router = require("express").Router();
const userDb = require(`${__dirname}/../database/auth`);
const authMdw = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const result = await userDb.register(req.body);
    res.json({ data: result });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});
router.post("/sign-in", async (req, res) => {
  try {
    const result = await userDb.signIn(req.body);
    res.json({ data: result });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});
router.post("/my-profile", authMdw, (req, res) => {
  res.json({
    data: req.user,
  });
});

module.exports = router;
