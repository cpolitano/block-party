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
		var response = yield getTimeline.call(client, "blocks/list", params); 
		var blocks = response[0].users;
		
		this.body = {
			success: true,
			blocks: blocks
		};
	} else {
		this.redirect("/");
	}

});

router.post("/", function *() {

	if (this.user) {
		var client = new Twitter({
			consumer_key: process.env.TWITTER_CONSUMER_KEY,
			consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
			access_token_key: this.user.token,
			access_token_secret: this.user.token_secret
		});

		var getTimeline = thunkify(client.post);
		var userToUnblock = this.request.body.screen_name;
		var params = {screen_name: userToUnblock};
		var response = yield getTimeline.call(client, "blocks/destroy", params); 
		if (response[0].screen_name === userToUnblock) {
			this.body = {
				success: true
			};
		} else {
			this.body = {
				success: false
			};
		}
	} else {
		this.redirect("/");
	}

});

module.exports = router
