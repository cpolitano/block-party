const logger = require("../logger");
const co = require("co");

function create(db, wordData) {
	return db.transaction(co.wrap(function* (trx) {
		const word = yield trx.insert({
			id: wordData.id,
			word: wordData.word,
		}).into("words");
		return word;
	}));
}

function get(db, word_id) {
	return db("words")
		.where("words.id", word_id)
		.then(results => {
			return results[0];
		})
		.catch(err => {
			logger.error({
				id: word_id,
				error: err
			});
			throw err;
		});
}

module.exports = db => ({
	create: create.bind(null, db),
	get: get.bind(null, db)
});
