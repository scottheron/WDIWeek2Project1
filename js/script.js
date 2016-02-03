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
	var gameArray = []; //stores the player and computer submitted cards
	var tempGameArray =[];//temp array to hold gameArray for popping
	var playersHands = 6; //6 cards in each players hand.
	var playerOnePlayerTwo = true;//determins which player array to use
	var whosTurn = true;//determins who's turn it is
	var draggableId;//stores the ID of the dropped card  
	var blackCardInUse;//black card in play
	var count1 = 0;//counter used for the next button
	var bool1 = false;/*used to determine if the black card has been
					    flipped over this turn*/
	var tempBlackCardInUse;//temporary holder for the black card in play
	var playerOneScore = 0;//player 1 score
	var playerTwoScore = 0;//player 2 score
	var computerScore = 0;//computer score
	
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
	* using .splice. Also take two random cards for the computer to 
	* play, add them to the gameArray and splice those off as well
	*/
	for (var i = 0; i < playersHands; i++) {
		randomNum = randomNumber(whiteCardArray);
		playerOneHandArray[i] = whiteCardArray[randomNum];
		whiteCardArray.splice(randomNum, 1);
		randomNum = randomNumber(whiteCardArray);
		playerTwoHandArray[i] = whiteCardArray[randomNum];
		whiteCardArray.splice(randomNum, 1);
	}
	for (var i = 0; i < 2; i++) {
		randomNum = randomNumber(whiteCardArray);
		gameArray.push('"'+whiteCardArray[randomNum]+'"');
		whiteCardArray.splice(randomNum, 1);
	}
	
	/*
	* Write the content for each card to the back of the card
	*/
	for (var i = 0; i < playersHands; i++) {
		$('#cardp0-'+i).html('<p>"'+playerOneHandArray[i]+'"</p>');
		$('#cardp1-'+i).html('<p>"'+playerTwoHandArray[i]+'"</p>');
	}
	
	/*
	* Clicking on the black card div generates a random number which
	* is used to pick an entry from blackCardArray[] and displaying
	* that entry to the sentence-space div. The card is then removed
	* from the deck using .splice. Once the last card has been played
	* a message is displayed. A check is doone to display only one
	* black card per turn
	*/
		
	$('#black-card-back').on('click', function(){
		if (bool1 === false) {
			if(blackCardArray.length) {
				randomNum = randomNumber(blackCardArray);
				$('#sentence-space').html('<p>"'+blackCardArray[randomNum]+'"</p>');
				blackCardInUse = blackCardArray[randomNum];
				tempBlackCardInUse = blackCardInUse;
				blackCardArray.splice(randomNum, 1);
			}
			else {
				$('#sentence-space').html('<p>"Aww no more cards :.("</p>');
			}	
		}
		bool1 = true;//resets back to false on reset button
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
	* and accesses the text held in the .back class div. the gameArray
	* is updated with the value from the white card the player 
	* dropped on the drop space
	*/
	function handleDropEvent( event, ui ) {
  		var draggable = ui.draggable;
  		var card = draggable.attr('id');
  		var cardInner = $('#'+card+' > .back').text();
  		if (gameArray.length != 3) {	
  			gameArray.push(cardInner); 
  			// tempGameArray = gameArray;
  			for (var i = 0; i < gameArray.length; i++){
  				tempGameArray.push(gameArray[i]);
  			}
  		}
  		
  	}
	
	/*
	* creates drop space
	*/
	$('#card-drop').droppable({
    	drop: handleDropEvent
  	});
	
	/*******************************************************************
	* Listen for a button click and scroll through the gameArray to    *
	* display each white card's text on the black card text. If it's a *
	* blank, write the white card text in its place, if it's not then  *
	* write the text on a new line below it. Once the player selects a *
	* winning card they click the FUCK YEAH button and the winner,     *
	* either a player or computer, has their score updated             *
	*******************************************************************/
	/*
	* next card button cycles through the white cards writing their
	* content to the black card
	*/
	$('#next').on('click', function(){	
		randomNum = randomNumber(tempGameArray);
		if (count1 < 3) {
			if (tempBlackCardInUse.indexOf('_________') != -1) {
  				tempBlackCardInUse = tempBlackCardInUse.replace('_________', tempGameArray[randomNum]);
  				$('#sentence-space').html('<p>"'+tempBlackCardInUse+'"</p>');
  				tempGameArray.splice(randomNum, 1);
  			}
  			else {
  				$('#sentence-space').html('<p>"'+tempBlackCardInUse+'"</p><br>'+tempGameArray[randomNum]);
  				tempGameArray.splice(randomNum, 1);
  			}
  			tempBlackCardInUse = blackCardInUse;
  			count1++;
  		}	
  		if (count1 == 3) {
  			count1 = 0; 
  			for (var i = 0; i < gameArray.length; i++){
  				tempGameArray.push(gameArray[i]);
  			}
  		} 
  	});

  	/*
  	* FUCK YEAH button selects a winner and updates the score
  	*/
  	$('#HECK').on('click', function(){
  		var playerText = '"'+blackCardInUse+'"'+gameArray[2];
  		var winningText = $('#sentence-space').text();
  		
  		if (playerText === winningText && whosTurn === true) {
  			console.log('whos turn '+whosTurn);
  			playerOneScore++;
  			$('#score-tracker-p1').html('<p>Player One - '+playerOneScore+'</p>');
  			whosTurn = false;
  		}
  		else if (playerText === winningText && whosTurn === false) {
  			console.log('whos turn '+whosTurn);
  			playerTwoScore++;
  			$('#score-tracker-p2').html('<p>Player Two - '+playerTwoScore+'</p>');
  			whosTurn = true;
  		}
  		else {
  			computerScore++;
  			$('#score-tracker-c').html('<p>Computer - '+computerScore+'</p>');
  			if (whosTurn === true) {
  				console.log('whos turn '+whosTurn);
  				whosTurn = false;
  			}
  			else if (whosTurn === false) {
  				console.log('whos turn '+whosTurn);
  				whosTurn = true;
			}
  		}
  	});
});

