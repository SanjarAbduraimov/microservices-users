var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const config = require("./configs");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

mongoose.connect(config.mongoose.url).then(() => {
  logger.info("Connected to MongoDB");
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});

module.exports = app;
