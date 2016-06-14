var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require("async");

exports.up = function(db, callback) {
    async.series([
        db.addIndex.bind(db, "blocks", "idx_blocks_user_id", ["user_id"])
    ], callback);
};

exports.down = function(db, callback) {
    async.series([
        db.removeIndex.bind(db, "blocks", "idx_blocks_user_id")
    ], callback);
};
