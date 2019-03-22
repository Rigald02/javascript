var startTime;
var timer;

var difficulty;
var tableau;
var totalBombs;


// https://www.w3schools.com/js/js_htmldom_methods.asp
// https://www.w3schools.com/jsref/default.asp
// https://www.w3schools.com/jsref/met_document_addeventlistener.asp
// www.w3schools.com/js/js_htmldom_eventlistener.asp



class Tile {
	constructor() {
		this.hasBomb = false;
		this.uncovered = false;
		// this.uncovered = true;
		this.adjBombs = 0;
	}
}




function randomNumber(maxNumber)
{
	return Math.floor(maxNumber * Math.random()) /*+ 1*/;
}


function chrono() {
	var currentTime = Date.now();
	var diff = (currentTime - startTime)/1000;
	var min = Math.round(diff/60);
	var sec = Math.round(diff%60);

	var preMin = (min < 10) ? "0" : "";
	var preSec = (sec < 10) ? "0" : "";
	document.getElementById("timer").innerHTML = "Temps :  " + preMin + min + ":" + preSec + sec;
}


function startChrono() {
	startTime = Date.now();
	clearInterval(timer);
	timer = setInterval("chrono()", 50);
}


function gameSetup(){
	difficulty = document.getElementById("difficulty").value;
	//console.log(difficulty);
	switch (difficulty){
		case "beginner":
			setupBoard(9);
			totalBombs = 10;
			setupBombs(9, totalBombs);
			setupNumbers (9);
			break;
		case "medium":
			setupBoard(16);
			totalBombs = 40;
			setupBombs(16, totalBombs);
			setupNumbers (16);
			break;
		case "expert":
			setupBoard(22);
			totalBombs = 100;
			setupBombs(22, totalBombs);
			setupNumbers (22);
			break;
		case "master":
			setupBoard(30);
			totalBombs = 250;
			setupBombs(30, totalBombs);
			setupNumbers (30);
			break;
	}

	displayBoard();
}


function setupBoard(size){
	for (var i = 0; i < size; i++){

		var colonne = [];

		for (var j = 0; j < size; j++){
			colonne.push(new Tile());
		}

		tableau.push(colonne);
	}
}


function setupBombs(tableauSize, maxBombs){

	for (var i = 0; i < maxBombs; i++){

		var randY = randomNumber(tableauSize);
		var randX = randomNumber(tableauSize);

		if (tableau[randY][randX].hasBomb === false){
			tableau[randY][randX].hasBomb = true;
			tableau[randY][randX].adjBombs = null;
		}
		else{
			i--;
		}

	}
}

function setupNumbers (tableauSize) {

	if (tableau[0][0].hasBomb === false){

		if(tableau[0][1].hasBomb === true){
			tableau[0][0].adjBombs += 1;
		}

		if(tableau[1][0].hasBomb === true){
			tableau[0][0].adjBombs += 1;
		}

		if(tableau[1][1].hasBomb === true){
			tableau[0][0].adjBombs += 1;
		}
	}

	if (tableau[tableauSize - 1][0].hasBomb === false){

		if(tableau[tableauSize - 1][1].hasBomb === true){
			tableau[tableauSize - 1][0].adjBombs += 1;
		}

		if(tableau[tableauSize - 2][0].hasBomb === true){
			tableau[tableauSize - 1][0].adjBombs += 1;
		}

		if(tableau[tableauSize - 2][1].hasBomb === true){
			tableau[tableauSize - 1][0].adjBombs += 1;
		}
	}

	if (tableau[0][tableauSize - 1].hasBomb === false){

		if(tableau[1][tableauSize - 1].hasBomb === true){
			tableau[0][tableauSize - 1].adjBombs += 1;
		}

		if(tableau[0][tableauSize - 2].hasBomb === true){
			tableau[0][tableauSize - 1].adjBombs += 1;
		}

		if(tableau[1][tableauSize - 2].hasBomb === true){
			tableau[0][tableauSize - 1].adjBombs += 1;
		}
	}

	if (tableau[tableauSize - 1][tableauSize - 1].hasBomb === false){

		if(tableau[tableauSize - 2][tableauSize - 1].hasBomb === true){
			tableau[tableauSize - 1][tableauSize - 1].adjBombs += 1;
		}

		if(tableau[tableauSize - 1][tableauSize - 2].hasBomb === true){
			tableau[tableauSize - 1][tableauSize - 1].adjBombs += 1;
		}

		if(tableau[tableauSize - 2][tableauSize - 2].hasBomb === true){
			tableau[tableauSize - 1][tableauSize - 1].adjBombs += 1;
		}
	}

	for (var i = 1; i < tableauSize - 1; i++){

		if (tableau[0][i].hasBomb === false){

			if (tableau[+1][i].hasBomb === true){
				tableau[0][i].adjBombs += 1;
			}

			if (tableau[0][i - 1].hasBomb === true){
				tableau[0][i].adjBombs += 1;
			}

			if (tableau[0][i + 1].hasBomb === true){
				tableau[0][i].adjBombs += 1;
			}

			if (tableau[+1][i - 1].hasBomb === true){
				tableau[0][i].adjBombs += 1;
			}

			if (tableau[+1][i + 1].hasBomb === true){
				tableau[0][i].adjBombs += 1;
			}
		}
	}

	for (var i = 1; i < tableauSize - 1; i++){

		if (tableau[tableauSize - 1][i].hasBomb === false){

			if (tableau[tableauSize - 2][i].hasBomb === true){
				tableau[tableauSize - 1][i].adjBombs += 1;
			}

			if (tableau[tableauSize - 1][i - 1].hasBomb === true){
				tableau[tableauSize - 1][i].adjBombs += 1;
			}

			if (tableau[tableauSize - 1][i + 1].hasBomb === true){
				tableau[tableauSize - 1][i].adjBombs += 1;
			}

			if (tableau[tableauSize - 2][i - 1].hasBomb === true){
				tableau[tableauSize - 1][i].adjBombs += 1;
			}

			if (tableau[tableauSize - 2][i + 1].hasBomb === true){
				tableau[tableauSize - 1][i].adjBombs += 1;
			}
		}
	}

	for (var i = 1; i < tableauSize - 1; i++){

		if (tableau[i][0].hasBomb === false){

			if (tableau[i][+1].hasBomb === true){
				tableau[i][0].adjBombs += 1;
			}

			if (tableau[i + 1][+1].hasBomb === true){
				tableau[i][0].adjBombs += 1;
			}

			if (tableau[i - 1][+1].hasBomb === true){
				tableau[i][0].adjBombs += 1;
			}

			if (tableau[i + 1][0].hasBomb === true){
				tableau[i][0].adjBombs += 1;
			}

			if (tableau[i - 1][0].hasBomb === true){
				tableau[i][0].adjBombs += 1;
			}
		}
	}

	for (var i = 1; i < tableauSize - 1; i++){

		if (tableau[i][tableauSize - 1].hasBomb === false){

			if (tableau[i][tableauSize - 2].hasBomb === true){
				tableau[i][tableauSize - 1].adjBombs += 1;
			}

			if (tableau[i + 1][tableauSize - 2].hasBomb === true){
				tableau[i][tableauSize - 1].adjBombs += 1;
			}

			if (tableau[i - 1][tableauSize - 2].hasBomb === true){
				tableau[i][tableauSize - 1].adjBombs += 1;
			}

			if (tableau[i + 1][tableauSize - 1].hasBomb === true){
				tableau[i][tableauSize - 1].adjBombs += 1;
			}

			if (tableau[i - 1][tableauSize - 1].hasBomb === true){
				tableau[i][tableauSize - 1].adjBombs += 1;
			}
		}
	}


	for (var i = 1; i < tableau.length - 1; i++) {

		for (var j = 1; j < tableau[i].length - 1; j++) {

			if (tableau[i][j].hasBomb === false){

				if (tableau[i + 1][j + 1].hasBomb === true){
					tableau[i][j].adjBombs += 1;
				}
				if (tableau[i + 1][j].hasBomb === true){
					tableau[i][j].adjBombs += 1;
				}
				if (tableau[i + 1][j - 1].hasBomb === true){
					tableau[i][j].adjBombs += 1;
				}
				if (tableau[i][j - 1].hasBomb === true){
					tableau[i][j].adjBombs += 1;
				}
				if (tableau[i - 1][j - 1].hasBomb === true){
					tableau[i][j].adjBombs += 1;
				}
				if (tableau[i - 1][j].hasBomb === true){
					tableau[i][j].adjBombs += 1;
				}
				if (tableau[i - 1][j + 1].hasBomb === true){
					tableau[i][j].adjBombs += 1;
				}
				if (tableau[i][j + 1].hasBomb === true){
					tableau[i][j].adjBombs += 1;
				}

			}
		}
	}
}


function displayBoard(){

	var boardDisplay = document.getElementById("tableauDemineur");
	boardDisplay.innerHTML = "";

	for (var i = 0; i < tableau.length; i++){

		var line = document.createElement('tr');
		boardDisplay.appendChild(line);

		for (var j = 0; j < tableau[i].length; j++){

			var tile = document.createElement('td');

			// tile.dataset.row = "" + i;
			// tile.dataset.column = "" + j;

			var displayTile = new Image();

			if (tableau[i][j].uncovered === false){
				displayTile.src = './images/normal.png';
				line.appendChild(displayTile);
			}
			else if (tableau[i][j].hasBomb === true){
				displayTile.src = './images/bomb.png';
				line.appendChild(displayTile);
			}
			else if (tableau[i][j].adjBombs > 0) {
				switch (tableau[i][j].adjBombs) {
					case 1:
						displayTile.src = './images/1.png';
						line.appendChild(displayTile);
						break;
					case 2:
						displayTile.src = './images/2.png';
						line.appendChild(displayTile);
						break;
					case 3:
						displayTile.src = './images/3.png';
						line.appendChild(displayTile);
						break;
					case 4:
						displayTile.src = './images/4.png';
						line.appendChild(displayTile);
						break;
					case 5:
						displayTile.src = './images/5.png';
						line.appendChild(displayTile);
						break;
					case 6:
						displayTile.src = './images/6.png';
						line.appendChild(displayTile);
						break;
					case 7:
						displayTile.src = './images/7.png';
						line.appendChild(displayTile);
						break;
					case 8:
						displayTile.src = './images/8.png';
						line.appendChild(displayTile);
						break;
				}
			}
			else{
				displayTile.src = './images/empty.png';
				line.appendChild(displayTile);
			}

			// var currentTile = document.getElementById("tableauDemineur");
		}
	}
}


function tileClicked(posY, posX){

	if (tableau[posY][posX].hasBomb === true){
		//
		// Fin de partie
		//
		tableau[posY][posX].uncovered = true;
	}
	else if (tableau[posY][posX].adjBombs === 0){
		tileReveal(posY, posX);
	}
	else{
		tableau[posY][posX].uncovered = true;
	}

	displayBoard();
}


function tileReveal(posY, posX){

	tableau[posY][posX].uncovered = true;

	// Check Down Right
	if (posY + 1 < tableau.length && posX + 1 < tableau.length && tableau[posY + 1][posX + 1].uncovered === false &&
		tableau[posY + 1][posX + 1].hasBomb === false){
		if(tableau[posY + 1][posX + 1].adjBombs > 0){
			tableau[posY + 1][posX + 1].uncovered = true;
		}
		else{
			tileReveal(posY + 1, posX + 1);
		}
	}

	// Check Down
	if (posY + 1 < tableau.length && tableau[posY + 1][posX].uncovered === false &&
		tableau[posY + 1][posX].hasBomb === false){
		if(tableau[posY + 1][posX].adjBombs > 0){
			tableau[posY + 1][posX].uncovered = true;
		}
		else{
			tileReveal(posY + 1, posX);
		}
	}

	// Check Down Left
	if (posY + 1 < tableau.length && posX - 1 >= 0 && tableau[posY + 1][posX - 1].uncovered === false &&
		tableau[posY + 1][posX - 1].hasBomb === false){
		if(tableau[posY + 1][posX - 1].adjBombs > 0){
			tableau[posY + 1][posX - 1].uncovered = true;
		}
		else{
			tileReveal(posY + 1, posX - 1);
		}
	}

	// Check Left
	if (posX - 1 >= 0 && tableau[posY][posX - 1].uncovered === false &&
		tableau[posY][posX - 1].hasBomb === false){
		if(tableau[posY][posX - 1].adjBombs > 0){
			tableau[posY][posX - 1].uncovered = true;
		}
		else {
			tileReveal(posY, posX - 1);
		}
	}

	// Check Top Left
	if (posY - 1 >= 0 && posX - 1 >= 0 && tableau[posY - 1][posX - 1].uncovered === false &&
		tableau[posY - 1][posX - 1].hasBomb === false){
		if(tableau[posY - 1][posX - 1].adjBombs > 0){
			tableau[posY - 1][posX - 1].uncovered = true;
		}
		else {
			tileReveal(posY - 1, posX - 1);
		}
	}

	// Check Top
	if (posY - 1 >= 0 && tableau[posY - 1][posX].uncovered === false &&
		tableau[posY - 1][posX].hasBomb === false){
		if(tableau[posY - 1][posX].adjBombs > 0){
			tableau[posY - 1][posX].uncovered = true;
		}
		else {
			tileReveal(posY - 1, posX);
		}
	}

	// Check Top Right
	if (posY - 1 >= 0 && posX + 1 < tableau.length && tableau[posY - 1][posX + 1].uncovered === false &&
		tableau[posY - 1][posX + 1].hasBomb === false){
		if(tableau[posY - 1][posX + 1].adjBombs > 0){
			tableau[posY - 1][posX + 1].uncovered = true;
		}
		else {
			tileReveal(posY - 1, posX + 1);
		}
	}

	// Check Right
	if (posX + 1 < tableau.length && tableau[posY][posX + 1].uncovered === false &&
		tableau[posY][posX + 1].hasBomb === false){
		if(tableau[posY][posX + 1].adjBombs > 0){
			tableau[posY][posX + 1].uncovered = true;
		}
		else {
			tileReveal(posY, posX + 1);
		}
	}
}


function start() {
	tableau = [];
	startChrono();
	gameSetup();
	tileClicked(5 - 1, 5 - 1);
	tileClicked(3 - 1, 6 - 1);
}




/*
function  drapeau(i, j, toggle){
	var Flag = document.getElementsById('images/flag.png');
	if(toggle == 1){
		//$(Case).parentElement.appendChild(Flag)
		document.getElementsById('colonne').children[j].children[i].children[0].classList.add(Flag)
	}
	else{
		//$(Case).remove(Flag)
		document.getElementsById('colonne').children[j].children[i].children[0].classList.remove(Flag)
	}
}
*/