"use strict";
require("dotenv").load();

const Twitter = require("twitter");
const thunkify = require("thunkify");
const router = require("koa-router")();
const analyze = require("../../helpers/analyze");

const checkTweets = (tweets) => {
	let usersToCheck = "";
	for (let tweet of tweets) {
		let userHash = {};
		let userCount = 0;
		// true if tweet language is potentially abusive
		// checks for user uniqueness
		// checks that number of unique users is < 100 per Twitter API 
		if (analyze.checkWords(tweet)) {
			let tweetAuthor = tweet.user.screen_name;
			if (!userHash[tweetAuthor] && userCount > 100) {
				userHash[tweetAuthor] = true;
				// TODO more efficient string building
				usersToCheck = tweet.user.screen_name + "," + usersToCheck;
				userCount++;
			} else {
				// either tweet author already accounted for
				// or volume of abuse is elevated
				// TODO handle overflow conditions
			}
			
		}
	};
	usersToCheck = usersToCheck.slice(0,-1);
	return usersToCheck;
}

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

	try {
		const tweets = this.request.body;
		let usersToCheck;

		if (tweets.length > 0) {
			usersToCheck = checkTweets(tweets);
		} else {
			this.body = {
				success: true,
				blocks: []
			};
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

			try {
				const response = yield getTwitter.call(client, "friendships/lookup", params); 
				let relationships = response[0];
				
				let blocks = relationships.map((relationship) => {
					let connection = relationship.connections;
					if ( connection.indexOf("following") < 0 && connection.indexOf("followed_by") < 0 ) {
						return relationship.screen_name;
					}
				})

				// TODO
				// block non-friends

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
				success: true,
				blocks: []
			};
		}
	} catch (err) {
		console.log(err);
		this.status = 500;
	}

})

module.exports = router
