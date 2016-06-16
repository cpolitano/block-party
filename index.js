"use strict";

require("dotenv").load();
const path = require("path");
const http = require("http");
const koa = require("koa");
const render = require("koa-ejs");
const serve = require("koa-static");
const session = require("koa-generic-session");
const bodyParser = require("koa-bodyparser");
const logger = require("./src/server/logger");
const app = koa();

const db = require("knex")({
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

app.on("error", err => {
	logger.warn(err);
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
logger.info("App listening on " + process.env.BLOCK_PARTY_PORT);
