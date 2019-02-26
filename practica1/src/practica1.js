/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};


/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {

	var tipo_carta = ["8-ball", "potato", "dinosaur", "kronos",
		"rocket", "unicorn", "guy", "zeppelin"];
	var mensajes_juego = ["Ohhhh ,Try Again!!!", "Match Found!!!", "You Win <3 !!", "###MemoryGame###"]
	this.board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	this.puntuacion = 0;
	this.cartaVolteada = false;
	this.parEncontrado = false;
	this.busquedaErronea = false;
	this.bocaArriba = -1;

	//inicializa el juego desordenando las 16 cartas
	this.initGame = function(){
		
		for(i = 0; i < tipo_carta.length * 2; i++)
			this.board[i] = new MemoryGameCard(tipo_carta[Math.trunc(i/2)]);// mete las 16 cartas en orden
		this.shuffle(this.board); //desordena el tablero
		this.loop();

	}

	// se encarga de dibujar y de mostrar los mensajes segun la puntuacion
	this.draw = function(){

		if(this.puntuacion === 8) // has ganado 
			gs.drawMessage(mensajes_juego[2]);
		else if(this.busquedaErronea) // busqueda de pareja no valida
			gs.drawMessage(mensajes_juego[0]);
		else if(this.bocaArriba === -1) // es el inicio del juego 
			gs.drawMessage(mensajes_juego[3]);
		else if(this.parEncontrado) // has encontrado un par
			gs.drawMessage(mensajes_juego[1]);

		for (i = 0; i < 16; i++){ //se dibujan las cartas
			this.board[i].draw(gs, i);
		}

	}

	this.loop = function(){

		var x = this;
		setInterval(function(){x.draw()}, 16);
	}

	this.onClick = function(cardId){
			//El cardId la pos de la carta
		
		if(!this.board[cardId].cartaVolteada){ // si clickas en una carta que no esta dada la vuelta

			this.board[cardId].flip(); //da la vuelta a la que has clickado

			if(this.esta_dada_la_vuelta){ //si se ha dado bien la vuelta

				if (this.board[cardId].compareTo(this.board[this.bocaArriba]) ){ // compara la carta anterior con la nueva volteada

					if(cardId != this.bocaArriba){
					 //si coinciden actualizamos los valores
					this.esta_dada_la_vuelta = false;
					this.busquedaErronea = false
					this.parEncontrado = true;
					this.puntuacion++;
					}
				}
				else{//si no coincide les damos la vuelta a las 2

					this.busquedaErronea = true;
					var that = this;
					setTimeout(function(){that.showCards()}, 350);
					
				}
				this.esta_dada_la_vuelta = false;
			}
		
			else{
				this.esta_dada_la_vuelta = true;
				this.bocaArriba = cardId;
			}
		}

		this.showCards = function(){

			this.parEncontrado = false;
			this.board[cardId].flip();
			this.board[this.bocaArriba].flip();
		}
	}

	this.shuffle = function (tablero){
	    
	    var numAleatorio, posicion, i;
	    for (i = tablero.length - 1; i > 0; i--) {
	        numAleatorio = Math.floor(Math.random() * (i + 1)); //genera un num aletaorio entre 0 y 15
	        posicion = tablero[i]; // luego un swap  entre las posiciones de la i y del num aleatorio
	        tablero[i] = tablero[numAleatorio];
	        tablero[numAleatorio] = posicion;
	    }

    }



};

/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {
	
	this.esta_dada_la_vuelta = false;
	this.encontrada = false;
	this.carta = id; //Se guarda el id de una carta para dibujarla

	
	
	this.draw = function(gs, pos){ // llamamos al metodo draw de la clase auxiliar , con una posicion y el motorgrafico
		
		if(this.esta_dada_la_vuelta) //dibuja la carta que se ha dado la vuelta 
			gs.draw(this.carta, pos);
		else // si no esta dada la vuelta dibuja el back de las cartas
			gs.draw("back", pos);
		
	}

	this.found = function(){//para poder cambiar el estado desde otra clase de la carta
		
		this.encontrada = true;
		
	}
	
	this.compareTo = function(carta2){ //compara una carta con otra para ver si son iguales
		
		if (this.carta === carta2.carta)
			return true;
		else 
			return false;
		
	}
	this.flip = function(){ //hace el movimiento de dar la vuelta a la carta
		
		if (this.esta_dada_la_vuelta)
			this.esta_dada_la_vuelta = false;
		else
			this.esta_dada_la_vuelta = true;
		
	}
	

};
