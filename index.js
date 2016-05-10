"use strict";

require("dotenv").load();
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

// TODO get user info from auth callback
app.use(function* (next) {
	this.user = {};
	yield next;
});

// TODO check user authentication
app.use(function* (next) {
	if (this.user) {
		yield next;
	}
	else {
		this.redirect("/");
	}
});

app.use(require("./src/server/routes/routes"));
app.use(require("./src/server/routes/api"));
app.use(require("./src/server/routes/auth"));

var server = http.createServer(app.callback());
server.listen(process.env.BLOCK_PARTY_PORT);
