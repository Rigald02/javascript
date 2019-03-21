var startTime;
var timer;
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