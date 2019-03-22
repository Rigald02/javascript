var startTime;
var timer;

var difficulty = "beginner";
var tableau = [];


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
			bombe(10, 9);
			break;
		case "medium":
			setupBoard(16);
			bombe(40, 16);
			break;
		case "expert":
			setupBoard(22);
			bombe(100, 22);
			break;
		case "master":
			setupBoard(30);
			bombe(250, 30)
			break;
	}
}


function setupBoard(size){
	for (var i = 0; i < size; i++){

		var colonne = [];

		for (var j = 0; j < size; j++){
			colonne.push("X");
		}

		tableau.push(colonne);
	}
}



function displayBoardOnPage(){

	var boardDisplay = document.getElementById("tableauDemineur");
	boardDisplay.innerHTML = "";

	for (var i = 0; i < tableau.length; i++){

		var line = document.createElement('tr');
		boardDisplay.appendChild(line);

		for (var j = 0; j < tableau[i].length; j++){

			var tile = document.createElement('th');
			var normalTile = new Image();
			normalTile.src = './images/normal.png'

			line.appendChild(normalTile);
		}
	}
}

function bombe(number,size){
	var mine = 0;
	for(mine = 0; mine < number; mine++){
		var x= Math.floor(Math.random() * size);
		var y= Math.floor(Math.random() * size);
		if (tableau[i][j] == "X"){
			 tableau[i][j]="O"
			}else{ 
			mine--
		}
	}
}

function play(e){
	play = 0
	for (i = 0, i < mine, i++)
	{
		play++
		if (tab[i] == getElementsById(bombe("O")))
		{
			document.getElementsById('images/bomb')
			win = false
		}
		else
		{
			document.getElementsById('images/empty')
		}

	}


}

function start() {
	startChrono();
	tableau = [];
	diffcultySetup();
	// displayBoardOnConsole();
	displayBoardOnPage();
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

/*function displayBoardOnConsole(){

	for (var i = 0; i < tableau.length; i++){

		for (var j = 0; j < tableau[i].length; j++){
			console.log("X");
		}

		console.log("\n");
	}
}*/

/*function bombe(size){
	document.getElementsById(diffcultySetup)
	mines = 0;
	for (var x = 0; x < size; x++) {
		for (var y = 0; y < size; y++) {
			var random = Math.floor(Math.random() * 101);
			if (random <= conf[difficulty]) {
				tableau[y][x] = 'M';
					document.getElementById('tableau').children[y].children[x].children[0].classList.add('images/bomb');
				mines++;
			}
		}
	}

}*/