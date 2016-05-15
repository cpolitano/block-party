"use strict";
require("dotenv").load();

const router = require("koa-router")();
const thunkify = require("thunkify");
const OAuth = require("oauth").OAuth;
const callback = process.env.BLOCK_PARTY_URL + "/auth/callback";

let oauthTokens;

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

		oauthTokens = {
			oauth_token: tokenResponse[0],
			oauth_token_secret: tokenResponse[1]
		};
		
		this.redirect("https://twitter.com/oauth/authenticate?oauth_token=" + oauthTokens.oauth_token);
	}
	else {
		console.log("error", response);
	}
})

router.get("/auth/callback", function *() {

	if (this.query.oauth_verifier) {

		let tokens = Object.assign({}, oauthTokens, this.query);

		let accessTokens = yield getAccessToken.call(oa, tokens.oauth_token, tokens.oauth_token_secret, tokens.oauth_verifier); 

		this.session.user = {
			token: accessTokens[0],
			token_secret: accessTokens[1],
			user_id: accessTokens[2].user_id,
			screen_name: accessTokens[2].screen_name,
			expires: accessTokens[2].x_auth_expires
		};
		
		this.redirect("/mentions");

	} else {
		this.redirect("/");
	}

})

module.exports = router.routes();
