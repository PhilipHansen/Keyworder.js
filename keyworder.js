var keyworder = keyworder || {};
(function(namespace) {

//generated from http://en.wikipedia.org/wiki/Most_common_words_in_English
var common = ["the","be","of","to","and","in","a","that","have","I","it","for","not","on","with","he","as","you","do","at","is",
			"this","but","his","by","from","they","we","say","her","she","or","an","we","will","my","one","all","would","there","their","what",
			"so","up","out","if","about","who","get","which","go","me","when","make","can","like","time","no","just","him","know","take",
			"people","into","year","your","good","some","could","them","see","other","than","then","now","look","only","come","its","over","think","also",
			"back","after","use","two","how","our","work","first","well","way","even","new","want","because","any","these","give","day","most","us"];
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
	if(options) {
		checkArray();
		if(options.common && Array.isArray(options.common)) {
			if(options.overwrite) { 
				common = options.common;
			}
			else {
				for(var i = 0; i < options.common.length; i++) {
					common.push(options.common[i]);
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
	if(!text || typeof text != "string" || !common || common.length < 1) {
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
		if(common.indexOf(word) == -1) {
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
