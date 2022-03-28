// setup constants
require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();

// setup middleware
// app.use(morgan('combined')); // use this to see maximum information in the logs.
app.use(morgan("tiny")); // use this to see minimal information in the logs.
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: process.env.COOKIE_PARSER_SECRET }));
require("./src/config/passport.js")(app);

// setup templating engine (EJS)
app.set("views", "./src/views");
app.set("view engine", "ejs");

// setup routing
app.get("/", (req, res) => {
  // res.send('Hello World');
  res.render("index", {
    title: "Welcome to Globomantics",
    data: ["a", "b", "c"],
  });
});

const sessionsRouter = require("./src/routers/sessionsRouter");
const adminRouter = require("./src/routers/adminRouter");
const authRouter = require("./src/routers/authRouter");
app.use("/sessions", sessionsRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

// start web application
app.listen(PORT, () => {
  debug(`Listening on port ${chalk.green(PORT)}`);
});
