// 1. Grab data from search

var UI = {}

UI.search = function(){
		var searchData = document.querySelector(".js-search").value;
		SoundCloudAPI.getTrack(searchData);
	
}

var search = document.querySelector(".js-submit");

search.addEventListener("click", function(){
	UI.search();
});

var enter = document.querySelector(".input-search");

enter.addEventListener("keypress", function(e){
		if(e.key == 'Enter'){
			UI.search();
	}
});

var clear = document.querySelector('.remove');
clear.addEventListener('click', function(){
	localStorage.clear();
	var sidebar = document.querySelector('.js-playlist');
	sidebar.innerHTML = localStorage.getItem("key");
});


// 2. Query Soundcloud API


var SoundCloudAPI = {};

SoundCloudAPI.init = function(){
	SC.initialize({
	  client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
	});
}

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(inputValue){
	// find all sounds of buskers licensed under 'creative commons share alike'
	SC.get('/tracks', {
	  q: inputValue
	}).then(function(tracks) {
	  console.log(tracks);
	  SoundCloudAPI.renderTracks(tracks);
	});
}



// 3. Display the cards

SoundCloudAPI.renderTracks = function(tracks){
	var clear = document.querySelector(".js-search-results");
	clear.textContent = '';
	tracks.forEach(function(track){
		//card
		var card = document.createElement('div');
		var searchResults = document.querySelector(".js-search-results");
		card.classList.add("card");
		searchResults.appendChild(card);

		//image
		var image = document.createElement('div');
		image.classList.add("image");
		var img = document.createElement('img');
		img.classList.add("image_img");
		img.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract/'; //if artwork is null, then put a random image
		image.appendChild(img);

		//content
		card.appendChild(image);
		var content = document.createElement('div');
		content.classList.add("content");
		var header = document.createElement('div');
		header.classList.add("header");
		header.innerHTML = '<a href=' + track.permalink_url + ' target="_blank">' + track.title + '</a>';
		content.appendChild(header);
		card.appendChild(content);

		//button
		var button = document.createElement('div');
		button.classList.add("ui", "bottom", "attached", "button", "js-button");
		var i = document.createElement('i');
		i.classList.add("icon", "add");
		button.appendChild(i);
		var span = document.createElement('span');
		span.innerHTML = 'Add to playlist';

		button.addEventListener('click', function(){
			SoundCloudAPI.addSong(track.permalink_url);
		});

		button.appendChild(span);
		card.appendChild(button);
	});
	

}


// 4. Add to playlist and play

SoundCloudAPI.addSong = function(url) {
	SC.oEmbed(url, {
	  auto_play: true
	}).then(function(embed){
	  console.log('oEmbed response: ', embed);
	  var sidebar = document.querySelector('.js-playlist');
	  var box = document.createElement('div');
	  box.innerHTML = embed.html;
	  sidebar.insertBefore(box, sidebar.firstChild); //puts box before the first thing in sidebar, so new element will always be first
	  
	  localStorage.setItem("key", sidebar.innerHTML); //saving everything in sidebar, so we have songs even if person leaves

	});
}


//Load any songs user added earlier once they enter website
var sidebar = document.querySelector('.js-playlist');
sidebar.innerHTML = localStorage.getItem("key");