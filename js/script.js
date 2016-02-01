/*
WDI 06 - Project 1, Cards Against Humanity. script.js file.
*/

$(document).ready(function(){

	/*General variables for counters, random number values etc. */
	var randomNum;

	/*Black card array holding the sentence card values*/
	var blackCardArrayInit = [
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
	
	/*blackcardArray is created from the blackCardArrayInit initialization array for pop purposes*/
	var blackCardArray = blackCardArrayInit;
	
	/*Random number generator picking an entry from blackCardArray[] and displaying that entry to the sentence-space div*/
	$('#black-card-back').on('click', function(){
		randomNum = Math.floor(Math.random() * blackCardArray.length);
		$('#sentence-space').html('<p>"'+blackCardArray[randomNum]+'"</p>');
		if(blackCardArray.length) {
			blackCardArray.splice(randomNum, 1);
			console.log(blackCardArray);
		}
		else {
			$('#sentence-space').html('<p>"Aww no more cards :.("</p>');
		}
	});


/*jQuery call to flip the card*/
/*
	$("#card").flip({
		axis: 'x',
  		trigger: 'hover'
	});
*/

});