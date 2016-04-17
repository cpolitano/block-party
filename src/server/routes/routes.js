var router = require("koa-router")();

const handler = function*() {
	yield this.render("template");
}

router.get("/", handler);

module.exports = router.routes()
