var keyworder = keyworder || {};
(function(namespace) {

//generated from http://en.wikipedia.org/wiki/Most_common_words_in_English
var common = {"the":true,"be":true,"of":true,"to":true,"and":true,"in":true,"a":true,"that":true,"have":true,"I":true,"it":true,
			"for":true,"not":true,"on":true,"with":true,"he":true,"as":true,"you":true,"do":true,"at":true,"is":true,"this":true,
			"but":true,"his":true,"by":true,"from":true,"they":true,"we":true,"say":true,"her":true,"she":true,"or":true,"an":true,
			"we":true,"will":true,"my":true,"one":true,"all":true,"would":true,"there":true,"their":true,"what":true,"so":true,
			"up":true,"out":true,"if":true,"about":true,"who":true,"get":true,"which":true,"go":true,"me":true,"when":true,"make":true,
			"can":true,"like":true,"time":true,"no":true,"just":true,"him":true,"know":true,"take":true,"people":true,"into":true,
			"year":true,"your":true,"good":true,"some":true,"could":true,"them":true,"see":true,"other":true,"than":true,"then":true,
			"now":true,"look":true,"only":true,"come":true,"its":true,"over":true,"think":true,"also":true,"back":true,"after":true,
			"use":true,"two":true,"how":true,"our":true,"work":true,"first":true,"well":true,"way":true,"even":true,"new":true,
			"want":true,"because":true,"any":true,"these":true,"give":true,"day":true,"most":true,"us":true};
var keywords = [];
var matchCase = false;

/*set the options for the object
	common: adds more common words to the common object
	overwrite: if this is set, instead of adding new common words, it overwrites them
	keywords: sets the keywords that we are possible
	matchCase: sets wether the keyword matching will be case sensitive or not, defaults to false
*/
function setOptions(options) {
	if(!options) return;

	if(options.common && Array.isArray(options.common)) {
		if(options.overwrite) { 
			common = {};
		}
		options.common.forEach(function(word) {
			common[word] = true;
		});
	}

	if(options.keywords && Array.isArray(options.keywords)) {
		keywords = options.keywords;
	}

	matchCase = options.matchCase ? true : false;
}
namespace.setOptions = setOptions;

// looks through the keywords array for specific keywords that match the input text
function keywordMatch(text) {
	if(!text || typeof text != "string" || !keywords || keywords.length < 1) {
		return [];
	}

	if(!matchCase) {
		text = text.toUpperCase();
	}

	// return the keywords array filtered of possible keys
	return keywords.filter(function(word) {
		if(!matchCase)
			word = word.toUpperCase();

		return text.indexOf(word) != -1;
	});
}
namespace.keywordMatch = keywordMatch;

// takes a string of text, strips the common words from it, and returns a string of the result
function stripCommonWords(text, removePunctuation) {
	if(!text || typeof text != "string" || !common || Object.keys(common).length < 1) {
		return text;
	}

	// helper function to strip away puncutation
	function stripAwayPunctuation(word) {
		word = word.toLowerCase();
		if(word[word.length-1].match(/[\.,!%\^&\*;:?"'`]/)) {
			word = word.slice(0, -1);
		}
		if(word[0].match(/"'`/)) {
			word = word.slice(1);
		}
		return word;
	}

	var returnArray = text.split(" ").filter(function(word) {
		// Only return words that are not in the common library (after being lower cased and had their punctuation removed)
		return !common[stripAwayPunctuation(word)];
	});

	// If we want to return items with the punctuation striped away
	if(removePunctuation) {
		returnArray = returnArray.map(stripAwayPunctuation);
	}
	return returnArray.join(" ");
}
namespace.stripCommonWords = stripCommonWords;

//takes a string of text, strips common words out of it and then checks for matching keywords
function stripAndMatch(text, removePunctuation) {
	text = stripCommonWords(text, removePunctuation);
	return keywordMatch(text);
}
namespace.stripAndMatch = stripAndMatch;
})(keyworder);
