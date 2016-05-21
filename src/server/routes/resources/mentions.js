require("dotenv").load();

var Twitter = require("twitter");
var thunkify = require("thunkify");
var router = require("koa-router")();

router.get("/", function *() {

	if (this.user) {
		var client = new Twitter({
			consumer_key: process.env.TWITTER_CONSUMER_KEY,
			consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
			access_token_key: this.user.token,
			access_token_secret: this.user.token_secret
		});

		var getTimeline = thunkify(client.get);

		var params = {screen_name: this.user.screen_name};
		var response = yield getTimeline.call(client, "statuses/mentions_timeline", params); 
		var tweets = response[0];
		
		this.body = {
			success: true,
			tweets: tweets
		};
	} else {
		this.redirect("/");
	}

})

module.exports = router
