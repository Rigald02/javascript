var startTime = Date.now();
function chrono() {
	var currentTime = Date.now();
	var diff = (currentTime - startTime)/1000;
	var min = Math.round(diff/60);
	var sec = Math.round(diff%60);

	var preMin = "";
	var preSec = "";
	if(min < 10) {
		preMin = "0";
	}
	if(sec < 10) {
		preSec = "0";
	}
	document.getElementById("timer").innerHTML = "Temps :  " + preMin + min + ":" + preSec + sec;
	setTimeout("chrono()", 50);
}
chrono();