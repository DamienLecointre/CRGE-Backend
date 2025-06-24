require("dotenv").config();
require("./models/connection");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var herosRouter = require("./routes/heros");
var navigationsRouter = require("./routes/navigations");
var serviceCardsRouter = require("./routes/serviceCards");

var app = express();
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3001", "https://crge-frontend.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/heros", herosRouter);
app.use("/navigations", navigationsRouter);
app.use("/serviceCards", serviceCardsRouter);

module.exports = app;
