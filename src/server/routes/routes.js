var router = require("koa-router")();

const handler = function*() {
	yield this.render("template");
}

router.get("/", handler);
router.get("/mentions", handler);
router.get("/blocks", handler);

module.exports = router.routes()
