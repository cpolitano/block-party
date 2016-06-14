var dbm = global.dbm || require("db-migrate");
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable("words", {
		id: {
			type: type.STRING,
			primaryKey: true,
			notNull: true
		},
		word: {
			type: type.STRING,
			notNull: true
		}
	}, callback);
};

exports.down = function(db, callback) {
  	db.dropTable("words", {ifExists:true}, callback);
};
