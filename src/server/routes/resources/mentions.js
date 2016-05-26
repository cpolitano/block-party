"use strict";
require("dotenv").load();

const Twitter = require("twitter");
const thunkify = require("thunkify");
const router = require("koa-router")();
const analyze = require("../../helpers/analyze");

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
		let tweets = [];

		try {
			const response = yield getTimeline.call(client, "statuses/mentions_timeline", params); 
			tweets = tweets.concat(response[0]);
		} catch (err) {
			console.log(err);
			this.status = 500;
		}
		
		this.body = {
			success: true,
			tweets: tweets
		};
	} else {
		this.redirect("/");
	}

});

router.post("/", function *(next) {
	// check trigger tweet authors' relationship to user 
	// return trigger tweets and authors
	try {
		const tweets = this.request.body;
		let usersToCheck = []

		if (tweets.length > 0) {

			for (let tweet of tweets) {
				if (analyze.checkWords(tweet)) {
					usersToCheck.push(tweet.user.screen_name);
				}
			};

		}

		this.body = {
			success: true,
			possibleBlocks: usersToCheck
		};

	} catch (err) {
		console.log(err);
		this.status = 500;
	}

})

module.exports = router
