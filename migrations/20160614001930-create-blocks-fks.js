var dbm = global.dbm || require("db-migrate");
var type = dbm.dataType;
var async = require("async");

exports.up = function(db, callback) {
  async.series([
		db.addForeignKey.bind(db, "blocks", "users", "fk_blocks_user_id",
			{
				user_id: "id"
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
		db.removeForeignKey.bind(db, "blocks", "fk_blocks_user_id")
	], callback);
};
