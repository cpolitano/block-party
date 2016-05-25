"use strict";
require("dotenv").load();

const WORDS = process.env.WORDS_ARRAY; 

const analyzeWords = (mention) => {
	let mentionWords = mention.text.toLowercase().split(" ");
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
	analyzeWords: analyzeWords,
	checkFriendship: checkFriendship
}
