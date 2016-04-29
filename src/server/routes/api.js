var mentions = require("./resources/mentions")

var router = require("koa-router")({
	prefix: "/api"
});

router.use("/mentions", mentions.routes(), mentions.allowedMethods())

module.exports = router.routes();
