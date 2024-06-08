var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const seedUser = require("./seed/seedUser");
const startCronJobs = require("./node-cron/cron-jobs");
require("./passport-config");

var app = express();
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/authentication/auth");
var authTestRouter = require("./routes/authentication/auth-test");
var urlCheckerRouter = require("./routes/tools/urlChecker");
var checkWXApiRouter = require("./routes/check-wx-api/check-wx-api");
var metarReportsRouter = require("./routes/metarReports/metar-reports");
var healthCheckRouter = require("./routes/health-check/health-check");
var horsesRouter = require("./routes/horses/horses");
var rfs = require('rotating-file-stream')
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'morgan-log'),
  maxFiles: 10,
  maxSize: '10M'
})
var morgan = require('morgan')
app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/", authRouter);
app.use("/authenticated/metar-reports", passport.authenticate("jwt", { session: false }), metarReportsRouter);
app.use("/metar-reports", metarReportsRouter)
app.use("/horses", horsesRouter);
app.use(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  authTestRouter
);
app.use("/authenticated", passport.authenticate("jwt", { session: false }), checkWXApiRouter);
app.use("/tools", urlCheckerRouter);
app.use("/", healthCheckRouter);

mongoose.connect(
  `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongodb:27017/ws_mgr?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

seedUser();
startCronJobs();

module.exports = app;
