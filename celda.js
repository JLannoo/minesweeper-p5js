	
class Celda {
	constructor(x,y){
		this.cx = x;
		this.cy = y;
		this.x = x*grid + grid/2;
		this.y = y*grid + grid/2;

		this.cont = "";
		this.color = 180;
		this.tColor = 255;
		this.banderasCerca = 0;

		this.flipped = false;
		this.bandera = false;
	}

	mostrar(){
		//MUESTRA CELDA
		rectMode(CENTER);
		stroke(255);
		strokeWeight(1);
		fill(this.color);

		rect(this.x, this.y, grid, grid);

		//MUESTRA cont DE CELDA CUANDO flipped 
		if(this.flipped){
	   		this.color = 150;
			fill(255);
			textSize(30);
			textAlign(CENTER);
			if (this.bandera) {  //MUESTRA BANDERA
				stroke(0);
				strokeWeight(5);
				fill(255,0,0);
				text("F",this.x,this.y+10);
			} else if(this.cont == "*"){ //MUESTRA BOMBAS
				noStroke();
				fill(0);
				textSize(80);
				text(this.cont,this.x,this.y+45);
			} else { 				//MUESTRA NUMEROS
				noStroke();
				fill(this.tColor);
				text(this.cont,this.x,this.y+10);
			}
		}

		if(!this.flipped){
			this.color = 180;
		}
	}

	contiene(x,y){
		if(entre(x, this.x+grid/2, this.x-grid/2) && entre(y,this.y+grid/2, this.y-grid/2)){
			return true;
		}
	}

	/*
	Si una celda no esta flipped o tiene this.cont banderas rodeandola, this.flip
	Y si no es una bandera this.flip todas las adyacentes

	Si no, si ES una bandera y esta flipped, unflip
	*/

	flip(){
		if(!this.flipped){
		   	this.flipped = true;
		   	if(!this.bandera){
		   		this.flipAdy();
		   	}
	   	} else if(this.bandera && this.flipped){
	   		this.flipped = false;
	   	}
	}

	flipAdy(){
		if(this.cont === ""){
			let main = celdas[this.cx][this.cy];
			let a = adyacentes(this.cx,this.cy);

			a.forEach(s => {		
		   		let x = s[0];
	   			let y = s[1];

	   			if(!celdas[x][y].flipped){
	   				let ady = celdas[x][y];  	
	   				ady.flip();
	   			}
		   	});
		}
	}

	//FLIP ADYACENTES SI LA CANTIDAD DE BANDERAS ALREDEDOR = this.cont;
	flipAdyBanderas(){
		let main = celdas[this.cx][this.cy];
			let a = adyacentes(this.cx,this.cy);

			a.forEach(s => {		
		   		let x = s[0];
	   			let y = s[1];

	   			if(!celdas[x][y].flipped){
	   				let ady = celdas[x][y];  	
	   				ady.flipped = true;

	   				if(ady.cont === ""){
	   					ady.flipAdy();
	   				}
	   			}
		   	});
	}

	contarBombas(){
		let a = adyacentes(this.cx,this.cy);
		let c = 0;

		for(i=0;i<a.length;i++){
			if(celdas[a[i][0]] [a[i][1]].cont == "*"){c++}
		}

		if(c>0 && this.cont != "*"){
			this.cont = c;
		}

		this.cambiaColor();
	}

	contarBanderas(){
		let a = adyacentes(this.cx,this.cy);
		let c = 0;

		for(i=0;i<a.length;i++){
			if(celdas[a[i][0]] [a[i][1]].bandera){c++}
		}

		return c;
	}

	checkearPerdida(){
		if(this.flipped && !this.bandera && this.cont == "*"){
			perdida=true;
		}
	}

	cambiaColor(){
		colorMode(RGB);
		switch(this.cont){
			case 1: {this.tColor = color(50,50,240); break;}
			case 2: {this.tColor = color(0,220,50); break;}
			case 3: {this.tColor = color(220,50,50); break;}
			case 4: {this.tColor = color(50,50,120); break;}
			case 5: {this.tColor = color(120,50,50); break;}
			case 6: {this.tColor = color(20,100,100); break;}
			case 7: {this.tColor = color(0,0,0); break;}
			case 8: {this.tColor = color(200); break;}
		}
	}

	toggleBandera(){
		if(!this.bandera && !this.flipped){
			this.bandera = true;
			this.flip();
		} else if(this.bandera && this.flipped){
			this.flip();
			this.bandera = false;
		}
	}
}