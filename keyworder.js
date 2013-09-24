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

//compatibility: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
function checkArray() {
	if(!Array.isArray) {
		Array.isArray = function (vArg) {
			return Object.prototype.toString.call(vArg) === "[object Array]";
		};
	}
}

/*set the options for the object
	common: adds more common words to the common array
	overwrite: if this is set, instead of adding new common words, it overwrites them
	keywords: sets the keywords that we are possible
	matchCase: sets wether the keyword matching will be case sensitive or not
*/
function setOptions(options) {
	if(!options) return;

	checkArray();
	if(options.common && Array.isArray(options.common)) {
		if(options.overwrite) { 
			common = {};
		}
		for(var i = 0; i < options.common.length; i++) {
			var word = options.common[i];
			if(!common[word]) {
				common[word] = true;
			}
		}
	}

	if(options.keywords && Array.isArray(options.keywords)) {
		keywords = options.keywords;
	}

	if(options.matchCase) {
		matchCase = options.matchCase;
	}
}
namespace.setOptions = setOptions;

//looks through the keywords array for specific keywords that match the input text
function keywordMatch(text) {
	if(!text || typeof text != "string" || !keywords || keywords.length < 1) {
		return [];
	}

	var matchingKeywords = [];
	if(!matchCase) {
		text = text.toUpperCase();
	}

	for(var i = 0; i < keywords.length; i++) {
		var key = keywords[i];
		if(!matchCase) {
			key = key.toUpperCase();
		}
		if(text.indexOf(key) != -1) {
			matchingKeywords.push(keywords[i]);
		}
	}

	return matchingKeywords;
}
namespace.keywordMatch = keywordMatch;

//takes a string of text, strips the common words from it, and returns a string of the result
function stripCommonWords(text, stripPunctuation) {
	if(!text || typeof text != "string" || !common || Object.keys(common).length < 1) {
		return text;
	}

	var arrayText = text.split(" ");
	var returnArray = [];
	for(var i = 0; i < arrayText.length; i++) {
		var word = arrayText[i].toLowerCase();
		if(word[word.length-1].match(/[\.,!%\^&\*;:?"'`]/)) {
			word = word.slice(0, -1);
		}
		if(word[0].match(/"'`/)) {
			word = word.slice(1);
		}
		if(!common[word]) {
			returnArray.push((stripPunctuation ? word : arrayText[i]));
		}
	}

	return returnArray.join(" ");
}
namespace.stripCommonWords = stripCommonWords;

//takes a string of text, strips common words out of it and then checks for matching keywords
function stripAndMatch(text, stripPunctuation) {
	text = stripCommonWords(text, stripPunctuation);
	return keywordMatch(text);
}
namespace.stripAndMatch = stripAndMatch;
})(keyworder);
