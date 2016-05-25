"use strict";
require("dotenv").load();

const Twitter = require("twitter");
const thunkify = require("thunkify");
const router = require("koa-router")();
const analyzeWords = require("../../helpers/analyzeWords");

router.get("/", function *() {

	if (this.user) {
		const client = new Twitter({
			consumer_key: process.env.TWITTER_CONSUMER_KEY,
			consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
			access_token_key: this.user.token,
			access_token_secret: this.user.token_secret
		});

		const getTimeline = thunkify(client.get);

		const params = {screen_name: this.user.screen_name};
		const response = yield getTimeline.call(client, "statuses/mentions_timeline", params); 
		const tweets = response[0];
		
		this.body = {
			success: true,
			tweets: tweets
		};
	} else {
		this.redirect("/");
	}

});

router.post("/", function *() {

	console.log(this.request.body);
	
	// check trigger tweet authors' relationship to user 
	// return trigger tweets and authors

	const tweets = this.request.body;

	let usersToBlock = tweets.map(tweet) {
		if (analyzeWords(tweet)) {
			return tweet.user.screen_name;
		}
	}

	
	this.body = {
		success: true,
		tweets: "test"
	};

})

module.exports = router
