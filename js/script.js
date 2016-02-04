/************************************************************
*WDI 06 - Project 1, Cards Against Humanity. script.js file.*
************************************************************/

$(document).ready(function(){

	/*******************************************************************
	* General variables for counters, arrays, random number values etc.*
	*******************************************************************/
	var whiteCardArray = [];//holds the white card deck
	var blackCardArray = [];//holds the black card deck
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
	var comparisonCard//what the winning player card value would be
	var count1 = 0;//counter used for the next button
	var bool1 = false;/*used to determine if the black card has been
					    flipped over this turn*/
	var tempBlackCardInUse;//temporary holder for the black card in play
	var playerOneScore = 0;//player 1 score
	var playerTwoScore = 0;//player 2 score
	var computerScore = 0;//computer score
	var cardDropped = true;//track when a card has already been dropped
	var winnerChosen = false;//tracks if a winning card has been chosen

	/*
	* sweetAlert!! Welcome to the game
	*/
	swal({
  		title: "Welcome to Cards Against Humanity!",
  		text: "MUCH WARNINGS, MANY NSFW!",
  		type: "warning",
  		showCancelButton: false,
  		confirmButtonColor: "#DD6B55",
  		confirmButtonText: "I'm an adult DAMMIT!",
  		closeOnConfirm: true,
  		html: false
		});
	
	/*
	* the help screen. Click it to make it go away.
	*/
	$('.helpScreen').on('click', function(){
		$('.helpScreen').hide();
		$('.helpScreenBackground').hide();
	});
	$('.helpScreenBackground').on('click', function(){
		$('.helpScreen').hide();
		$('.helpScreenBackground').hide();
	});

	/*
	* Black card array holding the sentence card values. This is the
	* Black card deck.
	*/
	function shuffleBlack () {
		blackCardArray = [
		"How did I lose my virginity?",
		"Why can't I sleep at night?",
		"What's that smell?",
		"I got 99 problems but _________ ain't one.",
		"Maybe she's born with it, maybe it's _________.",
		"What's the next Happy Meal toy?",
		"Here is the church, Here is the people, Open the doors, and there is _________.",
		"It's a pitty that kids these days are all getting involved with _________.",
		"Today on Maury: 'Help! My son is _________.",
		"Alternative medicine is now embracing the curative powers of _________.",
		"What's that sound?",
		"What ended my last relationship?",
		"MTV's new reality show features eight washed-up celebrities living with _________.",
		"I drink to forget _________.",
		"I'm sorry, Professor, but I couldn't complete my homework because of _________.",
		"What is Batman's guilty pleasure?",
		"This is the way the world ends. Not with a bang, but with a _________.",
		"What's a girl's best friend?",
		"TSA guidelines now prohibit _________ on airplanes.",
		"_________. That's how I want to die.",
		"In teh new Disney Channel Original Movie, Hannah Montana struggles with _________ for the first time.",
		"I get by with a little help from _________.",
		"Dear Abby, I'm having some trouble with _________ and would like your advice.",
		"Instead of coal, Santa now gives the bad children _________.",
		"What's the most emo?",
		"in 1,000 years, when paper money is a distant memory, how will we pay for goods and services?",
		"A romantic, candlelit dinner would be incomplete without _________.",
		"_________, Betcha can't have just one!",
		"White people like _________.",
		"_________, High five, bro.",
		"Next from J.K. Rowling: Harry Potter and the Chamber of _________.",
		"Introducing Xtreme Baseball! It's like baseball, but with _________!",
		"War! what is it good for?",
		"During sex, I like to think about _________."
		];
	}
	shuffleBlack();

	/*
	* White card array holding the answer cards. This is the White
	* deck
	*/
	function shuffleWhite () {
		whiteCardArray = [
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
		"scientology",
		"dry Heaving",
		"skeletor",
		"Darth Vader",
		"figgy Pudding",
		"advice from a wise, old black man",
		"five-Dollar Footlongs",
		"elderly Japanese men",
		"free samples",
		"estrogen",
		"sexual tension",
		"famine",
		"a stray pube",
		"men",
		"Heartwarming orphans",
		"chunks of dead hitchhiker",
		"a bag of magic beans",
		"repression",
		"prancing",
		"my relationship status",
		"overcompensation",
		"peeing a little bit",
		"pooping back and forth. Forever",
		"a ball of earwax, semen, and toenail clippings",
		"testicular torsion",
		"the devil himself",
		"The World of Warcraft",
		"Dick Cheney",
		"MechaHitler",
		"being fabulous",
		"pictures of boobs",
		"a gentle caress of the inner thigh",
		"the Amish",
		"the rhythms of Africa",
		"Lance Armstrong's missing testicle",
		"pedophiles",
		"the Pope",
		"flying sex snakes",
		"Sarah palin",
		"feeding Rosie O'Donnel",
		"sexy pillow fights",
		"invading Poland",
		"cybernetic enhancements",
		"civilian casualties",
		"jobs",
		"the female orgasm",
		"bitches",
		"the Boy Scouts of America",
		"Auschwitz",
		"finger painting",
		"the Care Bear Stare",
		"The Jews",
		"being marginalized",
		"the blood of Christ",
		"dead parents",
		"the art of seduction",
		"dying of dysentery",
		"Mr. Clean, right behind you",
		"magnets",
		"Jewish fraternities",
		"Hot Pockets",
		"Natalie Portman",
		"Agriculture",
		"Judge Judy",
		"surprise sex!",
		"the homosexual agenda",
		"Robert Downey, Jr.",
		"the trail of tears",
		"an M. Night Shyamalan plot twist",
		"funky fresh rhymes",
		"the light of a billion suns",
		"amputees",
		"throwing a virgin into a volcana",
		"Italians",
		"explosions",
		"a good sniff",
		"destroying the evidence"
		];
	}
	shuffleWhite();
	
	/*
	* Function to set player 2 as the active player
	*/
	function setPlayerTwoActive () {
		$('#score-tracker-p2').removeClass('colorWhite');
  		$('#score-tracker-p2').addClass('colorGreen');
		$('#score-tracker-p1').removeClass('colorGreen');
		$('#score-tracker-p1').addClass('colorWhite');
		
	}

	/*
	* Function to set player 1 as the active player
	*/
	function setPlayerOneActive () {
		$('#score-tracker-p1').removeClass('colorWhite');
  		$('#score-tracker-p1').addClass('colorGreen');
		$('#score-tracker-p2').removeClass('colorGreen');
		$('#score-tracker-p2').addClass('colorWhite');
		
	}

	/*
	* function to check for the white card deck status, if it's low
	* on cards, refresh the deck and the cards in the players hands.
	*/
	function outOfWhiteCards () {
  		if (whiteCardArray.length < 14) {
  			shuffleWhite();
  			theHandSetup();
  		}
  	}

  	/*
  	* function to check for the black card deck status, if it's low
  	* on cards, refresh the deck and the cards in the players hands.
  	*/
  	function outOfBlackCards () {
  		if (blackCardArray.length < 1) {
  			shuffleBlack();
  		}
  	}


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
	* using .splice. Check the deck isnt too low on cards
	*/
	function theHandSetup () {
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
		for (var i = 0; i < playersHands; i++) {
			$('#cardp0-'+i).html('<p>"'+playerOneHandArray[i]+'"</p>');
			$('#cardp1-'+i).html('<p>"'+playerTwoHandArray[i]+'"</p>');
		}
	}
	theHandSetup();
	
	/*
	* sets the computers hand up in the game array. check the deck
	* isnt low on cards
	*/
	function theComputerHandSetup () {
		outOfWhiteCards();
		gameArray = [];
		for (var i = 0; i < 2; i++) {
			randomNum = randomNumber(whiteCardArray);
			gameArray.push('"'+whiteCardArray[randomNum]+'"');
			whiteCardArray.splice(randomNum, 1);
		}
	}
		
	/*
	* Initially set player 1's label to green as they are the first
	* active player. Set Player 2's label to white
	*/
	$('#score-tracker-p1').addClass('colorGreen');
	$('#score-tracker-p2').addClass('colorWhite');
	
	/*
	* Clicking on the black card div generates a random number which
	* is used to pick an entry from blackCardArray[] and displaying
	* that entry to the sentence-space div. The card is then removed
	* from the deck using .splice. Once the last card has been played
	* a message is displayed. A check is done to display only one
	* black card per turn. If the cards run out the deck is refreshed.
	*/
	$('#black-card-back').on('click', function(){
		if (cardDropped === true) {
			outOfBlackCards();
			if (bool1 === false) {
				randomNum = randomNumber(blackCardArray);
				$('#sentence-space').html('<p>"'+blackCardArray[randomNum]+'"</p>');
				blackCardInUse = blackCardArray[randomNum];
				tempBlackCardInUse = blackCardInUse;
				blackCardArray.splice(randomNum, 1);
				bool1 = true;/*resets back to false on start OVER!
				               button*/
				winnerChosen = false;
			}
			else {
  				swal({
  					title: "... ... Rosebud ... .. .. has anyone seen Citizen Kane?!?",
  					text: "You can only flip off I MEAN flip OVER one black card at a time.",
  					type: "warning",
  					showCancelButton: false,
  					confirmButtonColor: "#DD6B55",
  					confirmButtonText: "FUCK OFF!",
  					closeOnConfirm: true,
  					html: false
				});
  			}
			cardDropped = false;
		}
		else {
  			swal({
  				title: "Who's your Daddy, and what does he do?.. I AM DETECTIVE JOHN KIMBLE!!1!",
  				text: "You need to drop a load.. I MEAN a white card first.",
  				type: "warning",
  				showCancelButton: false,
  				confirmButtonColor: "#DD6B55",
  				confirmButtonText: "FUCK OFF!",
  				closeOnConfirm: true,
  				html: false
			});
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
	* and accesses the text held in the .back class div. the gameArray
	* is updated with the value from the white card the player 
	* dropped on the drop space
	*/
	function handleDropEvent( event, ui ) {
  		var draggable = ui.draggable;
  		var card = draggable.attr('id');
  		$('#'+card+'').addClass('noflip');
  		$('.noflip').flip('toggle');
  		$('#'+card+'').removeClass('noflip');
  		if (cardDropped === false) {
  			
  			var cardInner = $('#'+card+' > .back').text();
  			theComputerHandSetup();
  			gameArray[2] = cardInner;
  			tempGameArray = [];
  			for (var i = 0; i < gameArray.length; i++){
  				tempGameArray.push(gameArray[i]);
  			}
  		  		
  			/*
  			* Turn the dropped card in to a winning card for that
  			* player. This will be the card that is checked against 
  			* for a winning senario for the player.
  			*/
  			tempBlackCardInUse = blackCardInUse;
  			if (blackCardInUse.indexOf('_________') != -1) {
  				tempBlackCardInUse = '"'+blackCardInUse+'"';
  				tempBlackCardInUse = tempBlackCardInUse.replace('_________', gameArray[2]);
  				comparisonCard = tempBlackCardInUse;
  			}
  			else {
  				comparisonCard = '"'+tempBlackCardInUse+'"'+gameArray[2];
  			}
  		
  			/*
  			* Refresh the content of the card with another card from 
  			* the white deck and remove that card from the deck. If the 
  			* deck has fewer than 14 cards (12 for the two players and 2
  			* for the computer) then add back in all the cards.
  			*/
  			outOfWhiteCards();
  			randomNum = randomNumber(whiteCardArray);
  			var newCard = whiteCardArray[randomNum]
  			cardInner = $('#'+card+' > .back').html('<p>'+newCard+'</p>');
  			whiteCardArray.splice(randomNum, 1);
  			cardDropped = true;
  		}
  		else {
  			swal({
  				title: "Uh uh uh, you didn't say the magic word!... ... ... IT'S FROM JURASSIC PARK MORON!",
  				text: "You can only drop one card at a time... *mumbles under breath*'idiot'.",
  				type: "warning",
  				showCancelButton: false,
  				confirmButtonColor: "#DD6B55",
  				confirmButtonText: "FUCK OFF!",
  				closeOnConfirm: true,
  				html: false
			});
  		}
  	}
	

	/*
	*turning the player one card div into a droppable zone 
	*/
	function baseDropEvent( event, ui ) {
  		var draggable = ui.draggable;
  		var card = draggable.attr('id');
  		$('#'+card+'').addClass('noflip');
  		$('.noflip').flip('toggle');
  		$('#'+card+'').removeClass('noflip');
  	}

  	/*
	*turning the player two card div into a droppable zone 
	*/
	function topDropEvent( event, ui ) {
  		var draggable = ui.draggable;
  		var card = draggable.attr('id');
  		$('#'+card+'').addClass('noflip');
  		$('.noflip').flip('toggle');
  		$('#'+card+'').removeClass('noflip');
  	}

	/*
	* creates drop spaces for the drop zone and each of the players
	* divs that contain the cards.
	*/
	$('#card-drop').droppable({
    	drop: handleDropEvent
    });
	
	$('#handp1').droppable({
    	drop: baseDropEvent
    });

    $('#handp2').droppable({
    	drop: topDropEvent
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
	* content to the black card in a random order each time.
	*/
	$('#next').on('click', function(){	
		tempBlackCardInUse = blackCardInUse;
		randomNum = randomNumber(tempGameArray);
		if (count1 < 3) {
			if (blackCardInUse.indexOf('_________') != -1) {
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
  	* FUCK YEAH button selects a winner and updates the score board.
  	* The winner is determined by matching the text on the chosen
  	* white card (reading the value on the sentence space) and 
  	* comparing that string value to the 3rd gameArray entry which 
  	* is always the players chosen card. The black cards sentence
  	* is added to the string value of the players white card string
  	* to make the comparison easier. also the players label is set 
  	* to either green or white depending on if they are the active
  	* player. The computer's label is always white. 
  	*/
  	$('#HECK').on('click', function(){
  		if (winnerChosen === false) {
  			var winningText = $('#sentence-space').text();
  			if (comparisonCard === winningText && whosTurn === false) {
  				playerOneScore++;
  				$('#score-tracker-p1').html('<p>Player One - '+playerOneScore+'</p>');
  				whosTurn = true;
  				setPlayerOneActive();
  			}
  			else if (comparisonCard === winningText && whosTurn === true) {
  				playerTwoScore++;
  				$('#score-tracker-p2').html('<p>Player Two - '+playerTwoScore+'</p>');
  				whosTurn = false;
  				setPlayerTwoActive();
  			}
  			else {
  				computerScore++;
  				$('#score-tracker-c').html('<p>Computer - '+computerScore+'</p>');
  				if (whosTurn === true) {
  					whosTurn = false;
  					setPlayerTwoActive();
  				}
  				else if (whosTurn === false) {
  					whosTurn = true;
  					setPlayerOneActive();
				}
  			}
  			if (playerOneScore === 10) {
  				swal({
  					title: "GAME OVER",
  					text: "Player One Wins!",
  					type: "success",
  					showCancelButton: false,
  					confirmButtonColor: "#DD6B55",
  					confirmButtonText: "Congratulations!",
  					closeOnConfirm: true,
  					html: false
				});
  			}	
  			else if (playerTwoScore === 10){
  				swal({
  					title: "GAME OVER",
  					text: "Player Two Wins!",
  					type: "success",
  					showCancelButton: false,
  					confirmButtonColor: "#DD6B55",
  					confirmButtonText: "Congratulations!",
  					closeOnConfirm: true,
  					html: false
				});
  			}
  			else if (computerScore === 10) {
  				swal({
  					title: "GAME OVER",
  					text: "Computer Wins!",
  					type: "success",
  					showCancelButton: false,
  					confirmButtonColor: "#DD6B55",
  					confirmButtonText: "Congratulations!",
  					closeOnConfirm: true,
  					html: false
				});
  			}
  			
  			/*reset back to false to allow a new black card to be
  			flipped*/
  			bool1 = false; 
  			winnerChosen = true;
  		}
  		else {
  			swal({
  				title: "We are no longer the knights who say ni! We are now the knights who say ekki-ekki-ekki-pitang-zoom-boing!",
  				text: "You have already chosen a winner.. RTFM!",
  				type: "warning",
  				showCancelButton: false,
  				confirmButtonColor: "#DD6B55",
  				confirmButtonText: "FUCK OFF!",
  				closeOnConfirm: true,
  				html: false
			});
  		}	
  	});
	
	/*
	* function reset is called when the start over button is pressed.
	* the state of the game is reset.
	*/
	function reset (){
		console.log('here');
		shuffleWhite();
		shuffleBlack();
		theHandSetup();
		playerOnePlayerTwo = true;
		whosTurn = true;
		count1 = 0;
		cardDropped = true;
		bool1 = false;
		playerOneScore = 0;
		$('#score-tracker-p1').html('<p>Player One - '+playerOneScore+'</p>');
		playerTwoScore = 0;
		$('#score-tracker-p2').html('<p>Player Two - '+playerTwoScore+'</p>');
		computerScore = 0;
		$('#score-tracker-c').html('<p>Computer - '+computerScore+'</p>');
		setPlayerOneActive();
		$('#sentence-space').html('<p>Here comes some innapropriate fun!<br> <span class="fa fa-hand-o-left"></span> Click the deck to start!</p>');
	}

	$('#resetButton').on('click', function(){
		reset();
	});
});

