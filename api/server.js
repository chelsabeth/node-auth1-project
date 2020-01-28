const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session"); 
const knexSessionStore = require("connect-session-knex")(session);

const db = require("../database/dbConfig.js");

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/user-router.js");

const server = express();

const sessionConfig = {
    name: "cooookies",
    // secret is used for cookie encryption
    secret: process.env.SESSION_SECRET || "shhh...keep it a secret",
    cookie: {
        maxAge: 1000 * 60 * 10, // 10 minutes in ms
        secure: false, // set to true in production, only send cookies over HTTPS
        httpOnly: true, // JS cannot access the cookies on the browser
    }, 
    resave: false,
    saveUninitialized: true, // read up about this! GDPR compliance
    store: new knexSessionStore({ 
        knex: db,
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 60000,
    }),
};

server.use(helmet());
server.use(session(sessionConfig)); // turn on sessions
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
    res.json({ api: "it's aliiiiive!" });
});

module.exports = server;