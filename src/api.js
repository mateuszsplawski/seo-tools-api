const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const router = require("./router");
const app = express();

app.use("/.netlify/functions/api", router);
app.use(cors());

module.exports.handler = serverless(app);
