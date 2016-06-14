module.exports = db => ({
	users: require("./users")(db),
	words: require("./words")(db),
	tweets: require("./blocks")(db)
});
