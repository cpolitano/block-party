require("dotenv").load();

var Twitter = require("twitter");

var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

var getTweets = function(params) {
	return client.get("statuses/user_timeline", params, function(error, tweets, response) {
		if (!error) {
			return tweets;
		}
	});
};

var router = require("koa-router")();

router.get("/:screen_name", function *() {

	var params = {screen_name: `${this.params.screen_name}`};

	this.body = yield getTweets(params);

})

module.exports = router
