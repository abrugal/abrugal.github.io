
//Updates original paragraph with red and green colors based on if you typed it right or wrong

var text = document.querySelector(".text");
var templateText = document.querySelector(".original-text p");
var ORIGINAL = templateText.innerHTML.split('');
var ORIGINALTEXT = templateText.innerHTML;
var timer = document.querySelector('.timer');
var flag = false;



text.addEventListener('keyup', function(){
	let textArray = text.value.split('');
	updateParagraph(ORIGINAL, textArray);
});

function colorGreen(letter, p){
	let span = document.createElement('SPAN');
	span.classList.add('green');
	let textNode = document.createTextNode(letter);
	span.appendChild(textNode);
	p.appendChild(span);
}

function colorRed(letter, p){
	let span = document.createElement('SPAN');
	span.classList.add('red');
	let textNode = document.createTextNode(letter);
	span.appendChild(textNode);
	p.appendChild(span);
}

function updateParagraph(originalPg, yourPg){
	if(yourPg.length > originalPg.length){
		return;
	}

	let p = document.createElement('P');

	for(var i=0; i<yourPg.length; i++){
		if(yourPg[i] == originalPg[i]){
			colorGreen(originalPg[i], p);
		}else{
			colorRed(originalPg[i], p);
		}	
	}
	while(i < originalPg.length){
		let textNode = document.createTextNode(originalPg[i]);
		p.appendChild(textNode);
		i++;
	}
	templateText.innerHTML = p.innerHTML;
}

//Start timer---------------------------------------------------------------------

var timerStarter;

text.addEventListener('keydown', function(){
	let length = text.value.length;
	let min = 0;
	let sec = 0;
	let milli = 0;
	if(length == 0 && flag == false){
		flag = true;
		timerStarter = setInterval(function(){
			if(milli == 100){
				sec++;
				milli = 0;
			}
			if(sec == 60){
				min++;
				sec = 0;
			}
			milli++;
			timer.innerHTML = addLeadingZero(min) + ':' + addLeadingZero(sec) + ':' + addLeadingZero(milli);
		}, 10);
	}
});

function addLeadingZero(num){
	if(num < 10){
		return ('0'+num); 
	}
	return num;
}

//Stop timer and disable typing---------------------------------------------------------------------

text.addEventListener('keyup', function(){
	let textArray = text.value.split('');
	if(textArray.length == ORIGINAL.length){
		for(let i=0; i<textArray.length; i++){
			if(textArray[i] != ORIGINAL[i])
				return;
		}
		clearInterval(timerStarter);
		text.setAttribute("disabled", "");
		showWPM(wpm());
	}
});

//Start Over button

var button = document.querySelector(".reset");

button.addEventListener("click", function(){
	text.removeAttribute("disabled");
	text.value = "";
	resetTimer();
});

function resetTimer() {
	timer.innerHTML = '00:00:00';
	flag = false;
	getRandomParagraph(url);
	clearInterval(timerStarter);
	removeWPM();
}

//Show words per minute---------------------------------------------------------------------

function wpm() {
	let length = text.value.split('').length;
	let time = timer.innerHTML.split(':');
	let min = ((Number(time[0])*60) + Number(time[1]))/60;
	let wpm = (length/5)/(min);
	return wpm.toFixed(2);
}

function showWPM(wpm){
	let show = document.querySelector(".result");
	show.style.display = 'block';
	let p = show.querySelector(".wpm");
	p.innerHTML = wpm + " wpm";
}

function removeWPM(){
	let show = document.querySelector(".result");
	show.style.display = 'none';
}

//Gets a random paragraph using metaphorpsum API

var url = 'http://metaphorpsum.com/paragraphs/1';

function getRandomParagraph(url){
		var metaphorpsumAJAXCall = new XMLHttpRequest();
		metaphorpsumAJAXCall.open( 'GET', url );
		metaphorpsumAJAXCall.send();

		metaphorpsumAJAXCall.addEventListener("load", function(event){ //we store the data in a variable once it is loaded
			var paragraph = event.target.response;
			changeParagraph(paragraph);
		});
}

function changeParagraph(paragraph){
	ORIGINAL = paragraph.split('');
	ORIGINALTEXT = paragraph;
	templateText.innerHTML = ORIGINALTEXT;
}


getRandomParagraph(url);


