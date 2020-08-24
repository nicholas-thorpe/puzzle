var clicks = 0;
var tiles = 9

var images = new Array();

for (let i = 0; i < tiles; i++) {
	images.push("images/cat" + (i + 1) + ".png");
}

/*
    Adds the tiled image to the board
*/
function prepareBoard() {
	//Check the browser is capable of basic things
	if (!document.getElementByTagName)
		return;
	if (!document.getElementById)
		return;
	if (!document.getElementbyId('gameboard'))
		return;
	
	//Find the board
	board = document.getElementById('gameboard');
	
	//Add the images
	for (i = 0; i < tiles; i++) {
		newElement = document.createElement('img');
		newElement.src = images[i];
		newElement.id = i;
		newElement.alt = "cat" + i;
		
		//newElement.onclick = function(){return move(this);};
		board.appendChild(newElement);
	}
}

/*
    Documentation
*/
function reset() {

}

window.onload = prepareBoard();
