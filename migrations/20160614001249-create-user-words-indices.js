var dbm = global.dbm || require("db-migrate");
var type = dbm.dataType;
var async = require("async");

exports.up = function(db, callback) {
	async.series([
		db.addIndex.bind(db, "users_words", "idx_users_words_user_id", ["user_id"]),
		db.addIndex.bind(db, "users_words", "idx_users_words_words_id", ["word_id"])
	], callback);
};

exports.down = function(db, callback) {
	async.series([
		db.removeIndex.bind(db, "users_words", "idx_users_words_user_id"),
		db.removeIndex.bind(db, "users_words", "idx_users_words_word_id")
	], callback);
};
