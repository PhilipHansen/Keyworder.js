Keyworder.js
============

Overview
--------
Keyworder.js is a simple javascript library that takes a block of text and allows the user to execute either a search for a set of keywords, strip a set of common words from the supplied text, or do both functions in one call. 
The common set of words to be stripped are by default the 100 most used words in English, but can be overwritten or added if desired. 
There are no keywords set by default, and instead need to be set if that function is wanted to be used.

Functions
=========
`keyworder.setOptions(options)`
--

Sets possible options for the library taking a javascript object.

+ `options`
	+ `common`: An array of words that can either overwrite or add to the existing set of common words depending on the `overwrite` option.
	+ `overwrite`: Boolean value (default false). Used in setting the new `common` as above.
	+ `keywords`: An array of words that will be used in the keyword matching function.
	+ `matchCase`: Boolean value (default false). Used in the keyword matching function. If it is true, will only detect words in the statement that match the case of the input keywords.

####Example
```javascript
keyworder.setOptions({
	common: ["blue", "green", "red"],
	overwrite: false,
	keywords: ["yellow", "orange", "roger"],
	matchCase: true
});
```

`keyworder.keywordMatch(text)`
--

Takes a string of text and searches through it for a matching keyword. If the `matchCase` variable is set to true, then it will only return values that have the same case as the keywords. Returns the values as an array object.

+ `text`: A string of text that is to be searched through for keywords.

####Example
```javascript
//with matchCase on:
keyworder.setOptions({keywords:["yellow", "orange", "roger"], matchCase: true});
keyworder.keywordMatch("Roger picked up the orange pumpkin."); //returns ["orange"]

//with matchCase off:
keyworder.setOptions({matchCase: false});
keyworder.keywordMatch("Roger picked up the orange pumpkin."); //returns ["orange", "roger"]
```

`keyworder.stripCommonWords(text, stripPunctuation)`
--

Takes a string of text and strips out the common words (as specified in the common array) from it, returning the result as a string. 

+ `text`: A string of text that is to be stripped of all common words.
+ `stripPunction`: Boolean value (default false) to determine how the word is returned. If true, will remove all capitalization and punctuation from the returning sentance.

####Example
```javascript
//with no additional common words set:
keyworder.stripCommonWords("The yellow sun is high in the blue sky."); //returns "yellow sun high blue sky."

//with added common words:
keyworder.setOptions({common: ["blue", "green", "red"]});
keyworder.stripCommonWords("The yellow sun is high in the blue sky."); //returns "yellow sun high sky."

keyworder.stripCommonWords("The yellow sun is high in the blue sky.", true); //returns "yellow sun high sky"

//with overwritten common words:
keyworder.setOptions({common: ["blue", "green", "red"], overwrite: true});
keyworder.stripCommonWords("The yellow sun is high in the blue sky."); //returns "The yellow sun is high in the sky."
```

`keyworder.stripAndMatch(text, stripPunctuation)`
--

Takes a string of text and first calls `keyworder.stripCommonWords` on it, then takes the result and calls `keyworder.keywordMatch` on it. Returns an array of matching keywords.

+ `text`: A string of text that is to be stripped of all common words than matched agains keywords.
+ `stripPunctuation`: Boolean value that is used in `keyworder.stripCommonWords`.

#####Note:
Since the stripping of common words executes first, if you have a keyword that is also a common word, it will not be returned in this function call.

####Example
```javascript
keyworder.setOptions({common: ["blue", "green", "red"], keywords: ["yellow", "blue", "sun"]});
keyworder.stripAndMatch("The yellow sun is high in the blue sky."); //returns ["yellow", "sun"]
```



License
=======
MIT Licensed
