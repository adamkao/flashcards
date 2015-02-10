var flashcards = [
[ "alcanzar", "to reach, to catch up to", 0, 0 ],
[ "cumplir", "to reach an age, to fulfill", 0, 0 ],
[ "durar", "to last", 0, 0 ],
[ "ensayar", "to try out, to rehearse", 0, 0 ],
[ "entristecer", "to sadden", 0, 0 ],
[ "envejecer", "to age", 0, 0 ],
[ "heredar", "to inherit", 0, 0 ],
[ "jurar", "to swear", 0, 0 ],
[ "regalar", "to give a present", 0, 0 ],
[ "soler", "to be in the habit of", 0, 0 ],
[ "la búsqueda", "search", 0, 0 ],
[ "el despacho", "study, office", 0, 0 ],
[ "el destierro", "exile", 0, 0 ],
[ "la espera", "waiting, expectation", 0, 0 ],
[ "la oscuridad", "darkness", 0, 0 ],
[ "el vacío", "emptiness, void", 0, 0 ],
[ "dulce", "sweet, gentle, meek", 0, 0 ],
[ "encerrado", "shut in, confined", 0, 0 ],
[ "preciso", "necessary", 0, 0 ],
[ "a lo mejor", "maybe, probably", 0, 0 ],
[ "de ahora en adelante", "from now on", 0, 0 ],
[ "no obstante", "nevertheless, however", 0, 0 ],
[ "por lo tanto", "therefore", 0, 0 ],
[ "el compromiso", "obligation, commitment", 0, 0 ],
[ "el convenio", "agreement, compromise", 0, 0 ],
[ "darse cuenta de", "to realize", 0, 0 ],
[ "realizar", "to bring to fruition", 0, 0 ],
[ "la lengua, el idioma", "language", 0, 0 ],
[ "el lenguaje", "use of words, grammar, language", 0, 0 ],
[ "ya no", "no longer", 0, 0 ],
[ "todavía", "still", 0, 0 ],
[ "todavía no", "not yet", 0, 0 ],
[ "ya", "already", 0, 0 ],
[ "raro, extraño", "strange", 0, 0 ],
[ "único", "unique, rare", 0, 0 ],
[ "extranjero", "foreigner, foreign", 0, 0 ],
//[ "", "", 0, 0 ],
];

function shuffle( array ) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor( Math.random() * currentIndex );
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

var answer = "", correct = "", last = 0, attempts = 0, success = 0, pass = 1, rand = 0, prob = 0;

function done( e ) {
	attempts++;
	answer = $( "#answer" ).val();
	if (flashcards[last][0] == answer) {
		correct = "Right!";
		success++;
	} else {
		correct = "Wrong!";
	}
	correct += " " + success + "/" + attempts;
	$( "#response" ).html( correct + " " + flashcards[last][1] + '<br>' + flashcards[last][0] + '<br>' + prob );

	flashcards[last][3] = attempts;
	flashcards[last][2] = success;

	$( "#answer" ).val( '' );
	$( "#answer" ).focus();

	do {
		last++;
		if (last >= flashcards.length) {
			shuffle( flashcards );
			pass++;
			last = 0;
		}
		attempts = flashcards[last][3];
		success = flashcards[last][2];
		prob = (success*success)/((attempts*attempts) + 1);
		rand = Math.random();
	} while (rand < prob);
	$( "#question" ).html( pass + ":  " + flashcards[last][1] );	
}

$( document ).ready( function() {
	
	shuffle( flashcards );
	$( "#question" ).html( pass + ":  " + flashcards[last][1] );	
	attempts = flashcards[last][3];
	success = flashcards[last][2];

	$( '#answer' ).on( 'keydown', function( event ) {
		if ((event.which == 10) || (event.which == 13)) {
			done( event );
		}
	} );
	$( "#done" ).click( function( e ) { done } );
} );
