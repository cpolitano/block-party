var dbm = global.dbm || require("db-migrate");
var type = dbm.dataType;
var async = require("async");

exports.up = function(db, callback) {
	async.series([
		db.addForeignKey.bind(db, "users_words", "users", "fk_users_words_user_id",
			{
				user_id: "id"
			},
			{
				onDelete: "RESTRICT",
				onUpdate: "RESTRICT"
			}
		),
		db.addForeignKey.bind(db, "users_words", "words", "fk_users_words_word_id",
			{
				word_id: "id"
			},
			{
				onDelete: "RESTRICT",
				onUpdate: "RESTRICT"
			}
		)
	], callback);
};

exports.down = function(db, callback) {
	async.series([
		db.removeForeignKey.bind(db, "users_words", "fk_users_words_user_id"),
		db.removeForeignKey.bind(db, "users_words", "fk_users_words_word_id")
	], callback);
};
