var router = require("koa-router")();

const rootHandler = function*() {
	yield this.render("template", {user: this.user ? this.user.screen_name : ""});
}

const authHandler = function*() {
	if (this.user) {
		yield this.render("template", {user: this.user.screen_name});
	}
	else {
		this.redirect("/");
	}
}

router.get("/", rootHandler);
router.get("/mentions", authHandler);
router.get("/blocks", authHandler);

module.exports = router.routes()
