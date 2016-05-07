"use strict";
require("dotenv").load();

const router = require("koa-router")();
const thunkify = require("thunkify");
const OAuth = require("oauth").OAuth;
const callback = process.env.BLOCK_PARTY_URL + "/auth/callback";

const oa = new OAuth(
	"https://api.twitter.com/oauth/request_token",
	"https://api.twitter.com/oauth/access_token",
	process.env.TWITTER_CONSUMER_KEY,
	process.env.TWITTER_CONSUMER_SECRET,
	"1.0",
	callback,
	"HMAC-SHA1"
);

const getRequestToken = thunkify(oa.getOAuthRequestToken);
const getAccessToken = thunkify(oa.getOAuthAccessToken);

router.get("/auth/twitter", function *() {
	
	let tokenResponse = yield getRequestToken.call(oa);
	
	if ( tokenResponse[2].oauth_callback_confirmed ) {
		let oauth = {
			oauth_token: tokenResponse[0],
			oauth_token_secret: tokenResponse[1]
		};
		this.redirect("https://twitter.com/oauth/authenticate?oauth_token=" + oauth.oauth_token);
	}
	else {
		console.log("error", response);
	}
})

router.get("/auth/callback", function *() {

	console.log(this.query);
	// let response = yield getAccessToken.call(oa);
	// console.log(response);

	this.redirect("/mentions");

})

module.exports = router.routes();
