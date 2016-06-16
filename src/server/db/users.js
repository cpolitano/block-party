const logger = require("../logger");
const co = require("co");

function create(db, userData) {
	return db.transaction(co.wrap(function* (trx) {
		const user = yield trx.insert({
			id: userData.id,
			screen_name: userData.screen_name,
			name: userData.name,
			token: userData.token,
			token_secret: userData.token_secret
		}).into("users");
		return user;
	}));
}

function get(db, user_id) {
	return db("users")
		.where("users.id", user_id)
		.then(results => {
			return results[0];
		})
		.catch(err => {
			logger.error({
				id: user_id,
				error: err
			});
			throw err;
		});
}

module.exports = db => ({
	create: create.bind(null, db),
	get: get.bind(null, db)
});
