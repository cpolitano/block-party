"use strict";
require("dotenv").load();

var router = require("koa-router")();
var thunkify = require("thunkify");
var OAuth= require("oauth").OAuth;

var oa = new OAuth(
	"https://api.twitter.com/oauth/request_token",
	"https://api.twitter.com/oauth/access_token",
	process.env.TWITTER_CONSUMER_KEY,
	process.env.TWITTER_CONSUMER_SECRET,
	"1.0",
	"/mentions",
	"HMAC-SHA1"
);

var loginWithTwitter = thunkify(oa.getOAuthRequestToken);

router.get("/auth/twitter", function *() {
	
	let response = yield loginWithTwitter.call(oa);
	
	if ( response[2].oauth_callback_confirmed ) {
		let oauth_token = response[0];
		let oauth_token_secret = response[1];
		this.redirect("https://twitter.com/oauth/authenticate?oauth_token=" + oauth_token);
	}
	else {
		console.log("error", response);
	}
})

module.exports = router.routes();
