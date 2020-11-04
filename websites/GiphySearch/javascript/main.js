// 1. Grab the input value

	document.querySelector(".js-go").addEventListener('click', function(){
		var input = document.querySelector("input").value;
		input = fixString(input);
		var url = "http://api.giphy.com/v1/gifs/search?q="+ input +"&api_key=SgVD5QUbEo4Grs4vs15UORLueuzkiAw5";
		getData(url);
	});

	document.querySelector(".js-userinput").addEventListener('keyup', function(event){
		if(event.key == "Enter"){
			var input = document.querySelector("input").value;
			var url = "http://api.giphy.com/v1/gifs/search?q="+ input +"&api_key=SgVD5QUbEo4Grs4vs15UORLueuzkiAw5";
			getData(url);
		}
	});


// 2. Do stuff with that data and the API

	// AJAX Request, this gets data from the API (Read more AJAX documentation)
	function getData(url){
		var GiphyAJAXCall = new XMLHttpRequest();
		GiphyAJAXCall.open( 'GET', url );
		GiphyAJAXCall.send();

		GiphyAJAXCall.addEventListener("load", function(event){ //we store the data in a variable once it is loaded
			var data = event.target.response;
			pushToDom(data);
		});
	}
		

// 3. Show me the GIFS

function pushToDom(input) {
	var container = document.querySelector(".js-container");
	var response = JSON.parse(input); //turns data into a js object
	var imageUrl = response.data;  
	container.innerHTML = "";
	imageUrl.forEach(function(image){ //iterates through imageUrl array, could also use for loop since we know the length of the array
		var src = image.images.fixed_height.url; //this is basically data[i].images.fixed_height.url
		container.innerHTML += "<img src=" + src + "class=container-image>";
	});
}


//Utility functions

function fixString(string){ //puts + in between words instead of spaces
	string = string.replace(/ /g, "+");
	return string;
}