function setup() {
	size = 800;
	gridN = 20;
	margen = 40;
	cantBombas = gridN * gridN/5;
	console.log(cantBombas);
	perdida = false;

	grid = size / gridN;

	celdas = [];

	//Declara todas las celdas
	for (var i = 0; i < gridN; i++) {
		celdas[i] = [];
		for(var j = 0; j < gridN; j++) {
			celdas[i][j] = new Celda(i,j);
		}
	}

	//Distribuye cantBombas bombas en las celdas
	for(i=0;i<cantBombas;i++){
		distBomba();
	}

	for (var i = 0; i < gridN; i++) {
		for(var j = 0; j < gridN; j++) {
			celdas[i][j].contarBombas();
		}
	}

	createCanvas(size,size+margen);
}

function draw() {
	background(180);

	fill(0);
	textAlign(LEFT);
	textSize(27);
	noStroke()
	text("Reveal - Left click", 15, size + margen-8);
	text("Flags - Middle click", size - 250, size + margen-8);

	for (var i = 0; i < celdas.length; i++) {
		for(var j = 0; j < celdas[i].length; j++) {
			celdas[i][j].mostrar();
			celdas[i][j].checkearPerdida();
		}
	}

	if(perdida){
		perder();
	}

	if(checkGanar()){
		ganar();
	}
}

//Pone una bomba en una celda aleatoria que no sea ya una bomba
function distBomba(){				
	let x = Math.floor(random(0,celdas.length));
		let y = Math.floor(random(0,celdas.length));

	if(celdas[x][y].cont != "*"){
			celdas[x][y].cont = "*";
	} else {
		distBomba();
	}
}

//Devuelve array con las coordenadas de las celdas adyacentes
function adyacentes(x,y){
	let ady = [];
	for(i=-1;i<=1;i++){
		for(j=-1;j<=1;j++){
			if((entre(x+i, celdas.length-1, 0) && entre(y+j, celdas.length-1, 0)) && (i != 0 || j != 0)){
				ady.push([x+i,y+j]);
			}
		}
	}
	return ady;
}

//Evalua si val esta entre max y min
function entre(val, max, min) { 		
  if (val <= max && val >= min) {
    return true;
  } else {
    return false;
  }
}

//FUNCIONES DE MOUSE
function mousePressed(){
	if(!perdida){
		let i = Math.floor(mouseX / grid);
		let j = Math.floor(mouseY / grid);
		let cel = celdas[i][j];

		if(mouseButton == LEFT && !cel.bandera){
			cel.flip();

			if(cel.contarBanderas() == cel.cont){
				cel.flipAdyBanderas();
			}
		}

		if(mouseButton == CENTER){
			cel.toggleBandera();
		}
	}
}

//SE FIJA SI TODAS LAS CELDAS ESTAN DADAS VUELTA
function checkGanar(){
	if(!perdida){
		let aux = true;

		for (var i = 0; i < celdas.length; i++) {
			for(var j = 0; j < celdas[i].length; j++) {
				if(!celdas[i][j].flipped){
					aux = false;
				} 
			}
		}
		return aux;
	}
}

//TEXTO DE PERDER
function perder(){
	fill(255,0,0);
	stroke(0);
	strokeWeight(5);
	textAlign(CENTER);
	textSize(140);

	text("PERDISTE", size/2, size/2);

	flipBombas();
}

//TEXTO DE GANAR
function ganar(){
	fill(0,255,0);
	stroke(0);
	strokeWeight(5);
	textAlign(CENTER);
	textSize(140);

	text("GANASTE", size/2, size/2);
}


//REVELA TODO
function flipAll(){
	for (var i = 0; i < celdas.length; i++) {
		for(var j = 0; j < celdas[i].length; j++) {
			if(!celdas[i][j].flipped){
				celdas[i][j].flip();
			}
		}
	}
}

function flipBombas(){
	for(fila of celdas){
		for(cel of fila){
			if (cel.cont == "*" && !cel.bandera){
				cel.flip();
			}
		}
	}
}