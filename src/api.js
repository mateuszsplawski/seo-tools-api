const express = require("express");
const serverless = require("serverless-http");

const router = require("./router");
const app = express();

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
