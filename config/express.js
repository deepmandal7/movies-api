const https = require("https");
const http = require("http");
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const compression = require("compression");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const api = require("../server/routes");
const pool = require("../config/database");
/** ====== DotENV configuration */
dotenv.config({ path: require("find-config")(".env") });

const configurations = {
    production: { ssl: true, port: process.env.PORT, hostname: "" },
    development: {
        ssl: false,
        port: process.env.PORT,
        hostname: process.env.STAGE_HOSTNAME,
    },
};

const environment = process.env.NODE_ENV || "development";
const config = configurations[environment];

const {
    responseHandlerMiddleware,
    sessionChecker,
} = require("../server/middlewares");

const app = express();

var credentials = {
    // key: fs.readFileSync("/etc/letsencrypt/live/myresorts.in/privkey.pem"),
    // cert: fs.readFileSync("/etc/letsencrypt/live/myresorts.in/fullchain.pem"),
};

let server = config.ssl
    ? https.createServer(credentials, app)
    : http.createServer(app);

app.use(cors());
app.options("*", cors());
app.use(helmet());
app.use(compression());
app.use(logger("dev"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(
    session({
        store: new pgSession({
            pool,
            tableName: "session",
        }),
        name: "user_sid",
        secret: process.env.SESSION_SECRET,
        resave: false,
        cookie: { secure: false, maxAge: 1.2e6 },
        saveUninitialized: true,
    })
);
app.set("views", path.resolve(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(express.static("../public"));
// app.use((req, res, next) => {
//     if (req.cookies.user_sid && !req.session.user) {
//         res.clearCookie("user_sid");
//     }
//     next();
// });

app.get("/", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect("/dashboard");
    } else {
        res.redirect("/login");
    }
});

app.get("/logout", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie("user_sid");
        res.redirect("/login");
    }
});
app.route("/login").get((req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect("/dashboard");
    } else {
        res.render("pages/login");
    }
});
app.route("/register").get((req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect("/dashboard");
    } else {
        res.render("pages/register");
    }
});
app.route("/dashboard").get(async (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        let movies = await require("../server/services").getAllMovies(
            req.session.user
        );
        res.render("pages/dashboard", {
            list: movies,
        });
    } else {
        res.redirect("/login");
    }
});

app.use("/api", api);

module.exports = server;
