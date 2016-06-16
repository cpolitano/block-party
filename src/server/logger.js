const bunyan = require("bunyan");

const logger = bunyan.createLogger({
	name: "block_party",
	level: "info"
});

module.exports = logger;
