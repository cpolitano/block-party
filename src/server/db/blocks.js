const logger = require("../logger");
const co = require("co");

function create(db, blockData) {
	return db.transaction(co.wrap(function* (trx) {
		const block = yield trx.insert({
			id: blockData.id,
			screen_name: blockData.screen_name,
			name: blockData.name,
			tweet_created: blockData.tweet_created,
			date_blocked: blockData.date_blocked,
			tweet_text: blockData.tweet_text,
			tweet_id: blockData.tweet_id,
			notes: blockData.notes,
			user_id: blockData.user_id
		}).into("blocks");
		return block;
	}));
}

function get(db, block_id) {
	return db("blocks")
		.where("blocks.id", block_id)
		.then(results => {
			return results[0];
		})
		.catch(err => {
			logger.error({
				id: block_id,
				error: err
			});
			throw err;
		});
}

module.exports = db => ({
	create: create.bind(null, db),
	get: get.bind(null, db)
});
