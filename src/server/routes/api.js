var mentions = require("./resources/mentions")
var blocks = require("./resources/blocks")

var router = require("koa-router")({
	prefix: "/api"
});

router.use("/mentions", mentions.routes(), mentions.allowedMethods())
router.use("/blocks", blocks.routes(), blocks.allowedMethods())

module.exports = router.routes();
