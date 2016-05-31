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

	// check mentions for abusive language 
	// check friendship of tweet authors
	// block non-friends

	try {
		const tweets = this.request.body;
		let usersToCheck = "";

		// TODO
		// check for user uniqueness
		// check that number of unique users is < 100 per Twitter API 
		if (tweets.length > 0) {
			for (let tweet of tweets) {
				if (analyze.checkWords(tweet)) {
					usersToCheck = tweet.user.screen_name + "," + usersToCheck;
				}
			};
			usersToCheck = usersToCheck.slice(0,-1);
		}

		if (usersToCheck.length > 0) {

			const client = new Twitter({
				consumer_key: process.env.TWITTER_CONSUMER_KEY,
				consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
				access_token_key: this.user.token,
				access_token_secret: this.user.token_secret
			});

			const getTwitter = thunkify(client.get);
			const params = {screen_name: usersToCheck};
			let relationships = [];
			// https://api.twitter.com/1.1/friendships/lookup.json?screen_name=episod,twitterapi,whiteleaf,andypiper

			try {
				const response = yield getTwitter.call(client, "friendships/lookup", params); 
				relationships = relationships.concat(response.body);
				console.log(relationships);
				
				let blocks = relationships.map((relationship) => {
					let friendship = relationship.connections;
					if ( !friendship.includes("following") && !friendship.includes("followed_by") ) {
						return relationship.screen_name;
					}
				})

				console.log(blocks);
				this.body = {
					success: true,
					blocks: blocks
				};

			} catch (err) {
				console.log(err);
				this.status = 500;
			}

		} else {
			this.body = {
				success: true
			};
		}
	} catch (err) {
		console.log(err);
		this.status = 500;
	}

})

module.exports = router
