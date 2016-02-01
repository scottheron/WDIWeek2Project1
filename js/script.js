/*
WDI 06 - Project 1, Cards Against Humanity. script.js file.
*/

$(document).ready(function(){

/*Black card array holding the sentence card values*/
	var blackCardArray = [
		"How did I lose my virginity?",
		"Why can't I sleep at night?",
		"What's that smell?",
		"I got 99 problems but _________ ain't one.",
		"Maybe she's born with it, maybe it's _________.",
		"What's the next Happy Meal toy?",
		"Here is the church, Here is the people, Open the doors, and there is _________.",
		"It's a pitty that kids these days are all getting involved with _________.",
		"Today on Maury: 'Help! My son is'<br>_________"
	];

	$('#sentence-space').html('<p>"'+blackCardArray[6]+'"</p>');


/*jQuery call to flip the card*/
/*
	$("#card").flip({
		axis: 'x',
  		trigger: 'hover'
	});
*/

});