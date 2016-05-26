"use strict";
require("dotenv").load();

const WORDS = process.env.WORDS_ARRAY; 

const checkWords = (mention) => {
	let mentionWords = mention.text.toLowerCase().split(" ");
	for (let word of mentionWords) {
		if ( WORDS.includes(word) ) {
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
