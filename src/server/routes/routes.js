require("dotenv").load();

var router = require("koa-router")();
var OAuth= require("oauth").OAuth;

var oa = new OAuth(
	"https://api.twitter.com/oauth/request_token",
	"https://api.twitter.com/oauth/access_token",
	process.env.TWITTER_CONSUMER_KEY,
	process.env.TWITTER_CONSUMER_SECRET,
	"1.0",
	"/mentions",
	"HMAC-SHA1"
);

const handler = function*() {
	yield this.render("template");
}

router.get("/health-check", function*() {
	this.status = 200;
	this.body = {};
});

router.get("/", handler);
router.get("/mentions", handler);
router.get("/blocks", handler);

router.get("/auth/twitter", function*() {
	oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
		if (error) {
			console.log(error);
		}
		else {
			this.request.session.oauth = {};
			this.request.session.oauth.token = oauth_token;
			console.log("oauth.token: " + this.request.session.oauth.token);
			this.request.session.oauth.token_secret = oauth_token_secret;
			console.log("oauth.token_secret: " + this.request.session.oauth.token_secret);
			this.response.redirect("https://twitter.com/oauth/authenticate?oauth_token=" + oauth_token);
		}
	});
});

module.exports = router.routes()
