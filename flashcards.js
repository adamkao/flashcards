var flashcards = [
[ "asustarse", "to become frightened", 0, 0 ],
[ "cobrar", "to charge money", 0, 0 ],
[ "enterarse", "to find out, to discover", 0, 0 ],
[ "envejecer", "to age, to become old", 0, 0 ],
[ "rogar", "to beg, to plead", 0, 0 ],
[ "la cicatriz", "scar", 0, 0 ],
[ "el novio", "boyfriend, fiancé", 0, 0 ],
[ "el noviazgo", "engagement", 0, 0 ],
[ "el ruego", "request", 0, 0 ],
[ "la solterona", "spinster, old maid", 0, 0 ],
[ "enamorado", "in love", 0, 0 ],
[ "soltero", "unmarried", 0, 0 ],
[ "vacio", "empty", 0, 0 ],
[ "la verguenza", "shame", 0, 0 ],
[ "avergonzado", "ashamed", 0, 0 ],
[ "el embarazo", "pregnancy", 0, 0 ],
[ "embarazada", "pregnant", 0, 0 ],
[ "el carácter", "inner character", 0, 0 ],
[ "el personaje", "character (in literature)", 0, 0 ],
[ "enamorarse", "to fall in love", 0, 0 ],
[ "estar enamorado", "to be in love", 0, 0 ],
[ "casarse", "to marry", 0, 0 ],
[ "por qué", "why", 0, 0 ],
[ "porque", "because", 0, 0 ],
[ "cargar", "to carry", 0, 0 ],
[ "cargar con", "to bear, to carry (a burden)", 0, 0 ],
[ "confiar", "to trust", 0, 0 ],
[ "deslumbrar", "to dazzle", 0, 0 ],
[ "disimular", "to hide", 0, 0 ],
[ "maldecir", "to curse", 0, 0 ],
[ "mandar", "to send", 0, 0 ],
[ "proponer", "to propose", 0, 0 ],
[ "regañar", "to scold", 0, 0 ],
[ "el anillo", "ring", 0, 0 ],
[ "el antepasado", "ancestor", 0, 0 ],
[ "el bisabuelo", "great grandfather", 0, 0 ],
[ "la cordura", "judgement, good sense; sanity", 0, 0 ],
[ "el deber", "duty, obligation", 0, 0 ],
[ "la herencia", "inheritance", 0, 0 ],
[ "la lágrima", "tear", 0, 0 ],
[ "los labios", "lips", 0, 0 ],
[ "la mejilla", "cheek", 0, 0 ],
[ "el sobre", "envelope", 0, 0 ],
[ "el viudo", "widower", 0, 0 ],
[ "arisco", "surly", 0, 0 ],
[ "desafiante", "challenging", 0, 0 ],
[ "húmedo", "damp, humid", 0, 0 ],
[ "tener razón", "to be right", 0, 0 ],
[ "valer la pena", "to be worth it", 0, 0 ],
[ "cantar", "to sing", 0, 0 ],
[ "contar", "to tell (a story); to count", 0, 0 ],
[ "la cuenta", "bill", 0, 0 ],
[ "el cuento", "story", 0, 0 ],
[ "bien", "well", 0, 0 ],
[ "el bien", "good (sustantivo)", 0, 0 ],
[ "bueno", "good (adjetivo)", 0, 0 ],
[ "mal", "badly", 0, 0 ],
[ "el mal", "harm, wrong", 0, 0 ],
[ "golpear", "to hit, to strike", 0, 0 ],
[ "llenarse", "to fill up", 0, 0 ],
[ "rechazar", "to reject", 0, 0 ],
[ "repartir", "to distribute", 0, 0 ],
[ "el cielo", "sky; heaven", 0, 0 ],
[ "el corazón", "heart", 0, 0 ],
[ "el golpe", "blow, hit", 0, 0 ],
[ "el viento", "wind", 0, 0 ],
[ "amargo", "bitter", 0, 0 ],
[ "corto", "short", 0, 0 ],
[ "sucio", "dirty", 0, 0 ],
[ "de pronto", "suddenly", 0, 0 ],
[ "de nuevo", "again", 0, 0 ],
[ "sobre", "on top of", 0, 0 ],
[ "amar", "to love (romantically)", 0, 0 ],
[ "querer", "to love; to want", 0, 0 ],
[ "encantarle", "to delight", 0, 0 ],
[ "creer", "to think, to believe", 0, 0 ],
[ "pensar", "to think", 0, 0 ],
[ "corto", "short, brief", 0, 0 ],
[ "largo", "long", 0, 0 ],
[ "pequeño", "small", 0, 0 ],
[ "grande", "large", 0, 0 ],
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
