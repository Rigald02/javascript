var startTime;
var timer;

var difficulty = "beginner";
var tableau = [];

var totalBombs;


// https://www.w3schools.com/js/js_htmldom_methods.asp
// https://www.w3schools.com/jsref/default.asp
// https://www.w3schools.com/jsref/met_document_addeventlistener.asp
https://www.w3schools.com/js/js_htmldom_eventlistener.asp


function randomNumber(maxNumber)
{
	return Math.floor(maxNumber * Math.random()) /*+ 1*/;
}

class Tile {
	constructor() {
		this.hasBomb = false;
		this.uncovered = false;	// Set to false
		this.adjBombs = 0;
	}
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


function diffcultySetup(){
	difficulty = document.getElementById("difficulty").value;
	//console.log(difficulty);
	switch (difficulty){
		case "beginner":
			setupBoard(9);
			totalBombs = 10;
			setupBombs(9, totalBombs);
			break;
		case "medium":
			setupBoard(16);
			totalBombs = 40;
			setupBombs(16, totalBombs);
			break;
		case "expert":
			setupBoard(22);
			totalBombs = 100;
			setupBombs(22, totalBombs);
			break;
		case "master":
			setupBoard(30);
			totalBombs = 250;
			setupBombs(30, totalBombs);
			break;
	}
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

		if (tableau[randY][randX].hasBomb == false){
			tableau[randY][randX].hasBomb = true;
		}
		else{
			i--;
		}

	}
}


function displayBoardOnConsole(){

	for (var i = 0; i < tableau.length; i++){

		for (var j = 0; j < tableau[i].length; j++){
			console.log("X");
		}

		console.log("\n");
	}
}


function displayBoardOnPage(){

	var boardDisplay = document.getElementById("tableauDemineur");
	boardDisplay.innerHTML = "";

	for (var i = 0; i < tableau.length; i++){

		var line = document.createElement('tr');
		boardDisplay.appendChild(line);

		for (var j = 0; j < tableau[i].length; j++){

			var tile = document.createElement('td');

			tile.dataset.row = "" + i;
			tile.dataset.column = "" + j;

			var displayTile = new Image();

			if (tableau[i][j].uncovered == false){
				displayTile.src = './images/normal.png';
				line.appendChild(displayTile);
			}
			else if (tableau[i][j].hasBomb == true){
				displayTile.src = './images/bomb.png';
				line.appendChild(displayTile);
				// YOU LOOSE !!!
			}
			else{
				displayTile.src = './images/empty.png';
				line.appendChild(displayTile);
			}

			// var currentTile = document.getElementById("tableauDemineur");
		}
	}
}


function start() {
	startChrono();
	tableau = [];
	diffcultySetup();
	displayBoardOnPage();
	console.log(totalBombs);
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
