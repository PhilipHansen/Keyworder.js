Keyworder.js
============

Overview
--------
Keyworder.js is a simple javascript library that takes a block of text and allows the user to execute either a search for a set of keywords, strip a set of common words from the supplied text, or do both functions in one call. 
The common set of words to be stripped are by default the 100 most used words in English, but can be overwritten or added if desired. 
There are no keywords set by default, and instead need to be set if that function is wanted to be used.

Functions
=========
`keyworder.setOptions`
----------------------

Sets possible options for the library taking a javascript object.

+ `options`
	+ `common`: An array of words that can either overwrite or add to the existing set of common words depending on the `overwrite` option.
	+ `overwrite`: Boolean value (default false). Used in setting the new `common` as above.
	+ `keywords`: An array of words that will be used in the keyword matching function.
	+ `matchCase`: Boolean value (default false). Used in the keyword matching function. If it is true, will only detect words in the statement that match the case of the input keywords.

** Example **
`````javascript
keyworder.setOptions({
	common: ["blue", "green", "red"],
	overwrite: false,
	keywords: ["yellow", "orange", "purple"],
	matchCase: true
});
```````

