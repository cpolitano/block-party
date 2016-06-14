var dbm = global.dbm || require("db-migrate");
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable("users", {
		id: {
			type: type.STRING,
			primaryKey: true,
			notNull: true
		},
		screen_name: {
			type: type.STRING,
			notNull: true
		},
		name: {
			type: type.STRING,
			notNull: true
		},
		token: {
			type: type.STRING,
			notNull: true
		},
		token_secret: {
			type: type.STRING,
			notNull: true
		}
	}, callback);
};

exports.down = function(db, callback) {
  	db.dropTable("users", {ifExists:true}, callback);
};
