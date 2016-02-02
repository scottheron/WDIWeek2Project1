/************************************************************
*WDI 06 - Project 1, Cards Against Humanity. script.js file.*
************************************************************/

$(document).ready(function(){

	/*******************************************************************
	* General variables for counters, arrays, random number values etc.*
	*******************************************************************/
	var randomNum;//stores the random number from the function below.
	var playerOneHandArray = [];//stores text of player 1's cards
	var playerTwoHandArray = [];//stores text of player 2's cards
	var idPlayerOneHandArray = []; //links the div id's to the text
	var idPlayerTwoHandArray = []; //links the div id's to the text
	var gameArray = []; //stores the player and computer submitted cards
	var playersHands = 6; //6 cards in each players hand.
	var playerOnePlayerTwo = true;//determins which player array to use
	var draggableId;//stores the ID of the dropped card  
	var blackCardInUse;//black card in play
	
	/*
	* Black card array holding the sentence card values. This is the
	* Black card deck.
	*/
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

	/*
	* White card array holding the answer cards. This is the White
	* deck
	*/
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

	var idArray = [
		{"draggablep0-0" : "cardp0-0"}
	]

	/*
	* function to generate a random number between 0 and the length of
	* any given array passed to the function
	*/
	function randomNumber(array) {
		randomNum = Math.floor(Math.random() * array.length);
		return randomNum;
	}

	/*
	* Initially set up the start of the game by giving each player a
	* hand of six white cards randomly selected from the
	* whiteCardArray and remove those cards from the white card deck
	* using .splice
	*/
	for (var i = 0; i < playersHands; i++) {
		randomNum = randomNumber(whiteCardArray);
		playerOneHandArray[i] = whiteCardArray[randomNum];
		whiteCardArray.splice(randomNum, 1);
		randomNum = randomNumber(whiteCardArray);
		playerTwoHandArray[i] = whiteCardArray[randomNum];
		whiteCardArray.splice(randomNum, 1);
	}
	

	/*
	* Write the content for each card to the back of the card
	*/
	for (var j = 0; j < playersHands; j++) {
		$('#cardp0-'+j).html('<p>"'+playerOneHandArray[j]+'"</p>');
		$('#cardp1-'+j).html('<p>"'+playerTwoHandArray[j]+'"</p>');
	}
	
	/*
	* Clicking on the black card div generates a random number which
	* is used to pick an entry from blackCardArray[] and displaying
	* that entry to the sentence-space div. The card is then removed
	* from the deck using .splice. Once the last card has been played
	* a message is displayed.
	*/
	$('#black-card-back').on('click', function(){
		if(blackCardArray.length) {
			randomNum = randomNumber(blackCardArray);
			$('#sentence-space').html('<p>"'+blackCardArray[randomNum]+'"</p>');
			blackCardInUse = blackCardArray[randomNum];
			console.log(blackCardInUse);
			blackCardArray.splice(randomNum, 1);
		}
		else {
			$('#sentence-space').html('<p>"Aww no more cards :.("</p>');
		}
	});

	/*
	* when a white card is clicked, flip the card and display its
	* content on the back of the card.
	*/
	$('.player-cards').flip();
	
	/*
	* Makes all the white player cards draggable and droppable, the
	* for loops cycle through each card's ID applying the draggable
	* function.
	*/
	for (var j = 0; j < 2; j++) {
		for (var i = 0; i < playersHands; i++) {
			draggableId = '#draggablep'+j+'-'+i;
			$(draggableId).draggable({
				stack: 'draggableId',
				cursor: 'move'
			});
		}
	}

	/****************************************************************
	* Sets up a function that handles the drop event which is       *
	* triggered when a card is dragged to the drop space. Also sets *
	* up the drop space as a dropable object that can accept        *
	* the draggable cards.                                          *
	****************************************************************/
	/*
	* function detects a card drop and identifies the card by it's
	* specific ID. it then burrows down to the inner div's with '>'
	* and accesses the text held in the .back class div
	*/
	function handleDropEvent( event, ui ) {
  		var draggable = ui.draggable;
  		var card = draggable.attr('id');
  		var cardInner = $('#'+card+' > .back').text();
  		blackCardInUse = blackCardInUse.replace('_________', cardInner);
  		$('#sentence-space').html('<p>"'+blackCardInUse+'"</p>');

  	}
	
	/*
	* creates drop space
	*/
	$('#card-drop').droppable({
    	drop: handleDropEvent
  	});
	
  	

		
});

/*<span class="glyphicon glyphicon-ok-sign"></span>*/