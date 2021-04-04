require(`${__dirname}/database`);
const express = require("express");
const cors = require("cors");
const router = require(`${__dirname}/api`);
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(5000, () => {
  console.log("App is running at port 5000");
});
