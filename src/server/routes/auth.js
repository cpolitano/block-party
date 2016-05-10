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

		let accessTokens = yield getAccessToken.call(oa, tokens.oauth_token, tokens.oauth_token_secret, tokens.oauth_verifier, 
			function(error, oauth_access_token, oauth_access_token_secret, results) {
				if (error) {
					console.log(error);
				} else {
					let response = Object.assign({}, results, oauth_access_token, oauth_access_token_secret);
					// { user_id: '00000000',
					//   screen_name: 'blockdotparty',
					//   x_auth_expires: '0' }
					console.log("response inside function", response);
					return response;
				}
			}
		);

		console.log("after function", accessTokens);

		this.redirect("/mentions");

	} else {
		this.redirect("/");
	}

})

module.exports = router.routes();
