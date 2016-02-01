/*
WDI 06 - Project 1, Cards Against Humanity. script.js file.
*/

$(document).ready(function(){

	/*General variables for counters, random number values etc. */
	var randomNum;
	var replaceString;

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

	/*White card array holding the answer cards*/
	var whiteCardArray = [
		"being on fire",
		"racism",
		"old-people smell",
		"a Micropenis",
		"women in yogurt commercials",
		"classist undertones",
		"not giving a shit about the Third World",
		"inserting a mason jar into my anus",
		"court-ordered rehab",
		"a windmill full of corpses",
		"the gays",
		"an oversized lollipop",
		"african children",
		"an asymmetric boob job",
		"bingeing and purging",
		"the hardworking Mexican",
		"an Oedipus complex",
		"a tiny horse",
		"boogers",
		"penis envy",
		"Barack Obama",
		"my humps",
		"the Tempur-Pedic Swedish Sleep System",
		"scientology"
	]

	
	/*Clicking on the black card div generates a random number which is used to pick an entry from blackCardArray[] and displaying that entry to the sentence-space div. The card is then removed from the deck using .splice. once the last card has been played a message is displayed.*/
	$('#black-card-back').on('click', function(){
		if(blackCardArray.length) {
			randomNum = Math.floor(Math.random() * blackCardArray.length);
			$('#sentence-space').html('<p>"'+blackCardArray[randomNum]+'"</p>');
			console.log(blackCardArray[randomNum]);
			blackCardArray.splice(randomNum, 1);
		}
		else {
			$('#sentence-space').html('<p>"Aww no more cards :.("</p>');
		}
	});

	/*Replacing the underscore blank in the blackCardArray with text from the whiteCardArray*/
	console.log(blackCardArray[3]);
	console.log(whiteCardArray[0]);
	blackCardArray[3] = blackCardArray[3].replace('_________', whiteCardArray[0]); 
	console.log(blackCardArray[3]);



/*jQuery call to flip the card*/
/*
	$("#card").flip({
		axis: 'x',
  		trigger: 'hover'
	});
*/

});