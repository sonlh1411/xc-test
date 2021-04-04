const mongoose = require("mongoose");

// Connect to database
mongoose.connect("mongodb://localhost:27017/mindx-test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
