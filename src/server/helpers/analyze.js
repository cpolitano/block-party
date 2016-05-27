"use strict";
require("dotenv").load();

let WORDS = process.env.WORDS.split(",");
let WORDS_HASH = {};
for (var i = 0; i < WORDS.length; i++) {
	WORDS_HASH[WORDS[i]] = true;
}

const checkWords = (mention) => {
	let mentionWords = mention.text.toLowerCase().replace(/[^\w\s]/gi, "").split(" ");

	for (var i = 0; i < mentionWords.length; i++) {
		if ( WORDS_HASH[mentionWords[i]] ) {
			return true;
		}
	}
}

const checkFriendship = (user) => {
	// check if user is friends with author of blocking tweet
}

module.exports = {
	checkWords: checkWords,
	checkFriendship: checkFriendship
}
