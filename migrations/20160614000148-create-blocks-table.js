var dbm = global.dbm || require("db-migrate");
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable("blocks", {
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
		tweet_created: {
			type: type.DATE_TIME,
			notNull: true
		},
		date_blocked: {
			type: type.DATE_TIME,
			notNull: true
		},
		tweet_text: {
			type: type.STRING,
			notNull: true
		},
		tweet_id: {
			type: type.STRING,
			notNull: true
		},
		notes: {
			type: type.TEXT
		},
		user_id: {
			type: type.STRING,
			notNull: true
		}
	}, callback);
};

exports.down = function(db, callback) {
  	db.dropTable("blocks", {ifExists:true}, callback);
};
