"use strict";

require("dotenv").load();
var path = require("path");
var http = require("http");
var koa = require("koa");
var render = require("koa-ejs");
var serve = require("koa-static");
var session = require("koa-generic-session");
var bodyParser = require("koa-bodyparser");
var app = koa();

var db = require("knex")({
	client: "mysql",
	connection: {
		host: process.env.DB_HOST,
		database: process.env.DB_DATABASE,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		connectionLimit: 25,
		timezone: "UTC"
	},
	pool: {
		min: 1,
		max: 5
	}
});

app.use(function* (next) {
	this.db = db;
	yield next;
});

app.use(bodyParser());

render(app, {
	root: path.join(__dirname, "views"),
	layout: "template",
	viewExt: "ejs",
	cache: false
});

app.keys = ["KEYS", process.env.SESSION_KEY];

app.use(session({
	user: undefined
}));

app.use(function* (next) {
	if ( this.session.user ) {
		this.user = this.session.user;
	}
	yield next;
});

app.use(serve("./public"));
app.use(require("./src/server/routes/routes"));
app.use(require("./src/server/routes/api"));
app.use(require("./src/server/routes/auth"));

var server = http.createServer(app.callback());
server.listen(process.env.BLOCK_PARTY_PORT);
