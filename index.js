"use strict";

// require("dotenv").load();
var path = require("path");
var http = require("http");
var koa = require("koa");
var render = require("koa-ejs");
var serve = require("koa-static");
var app = koa();

app.use(serve("./public"));

render(app, {
	root: path.join(__dirname, "views"),
	layout: "template",
	viewExt: "ejs",
	cache: false
});

app.use(require("./src/server/routes/routes"));
app.use(require("./src/server/routes/api"));
app.use(require("./src/server/routes/auth"));

var server = http.createServer(app.callback());
server.listen(7000);