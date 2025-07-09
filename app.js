require("dotenv").config();
require("./models/connection");
var express = require("express");
const connectDB = require("./models/connection");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var homepageDataRouter = require("./routes/homepageData");
var usersRouter = require("./routes/users");
var navigationsRouter = require("./routes/navigations");
var herosRouter = require("./routes/heros");
var serviceCardsRouter = require("./routes/serviceCards");
var servicesRouter = require("./routes/services");
var actualitesRouter = require("./routes/actualites");
var eventRouter = require("./routes/events");
var contactFormRouter = require("./routes/contactForm");

var app = express();
connectDB();
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
app.use("/homepage-data", homepageDataRouter);
app.use("/users", usersRouter);
app.use("/navigations", navigationsRouter);
app.use("/heros", herosRouter);
app.use("/serviceCards", serviceCardsRouter);
app.use("/services", servicesRouter);
app.use("/actualites", actualitesRouter);
app.use("/events", eventRouter);
app.use("/contactForm", contactFormRouter);

module.exports = app;
