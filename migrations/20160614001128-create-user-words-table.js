var dbm = global.dbm || require("db-migrate");
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable("users_words", {
		user_id: {
			type: type.STRING,
			notNull: true
		},
		word_id: {
			type: type.STRING,
			notNull: true
		}
	}, callback);
};

exports.down = function(db, callback) {
  	db.dropTable("users_words", {ifExists:true}, callback);
};
