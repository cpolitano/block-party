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

app.use(require("./src/server/routes/routes"));

var Twitter = require("twitter");

var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

var params = {screen_name: "blockdotparty"};
client.get("statuses/user_timeline", params, function(error, tweets, response){
	if (!error) {
		console.log(tweets);
	}
});

var server = http.createServer(app.callback());
server.listen(7000);