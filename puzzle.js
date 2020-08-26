var clicks = 0;
var tiles = 9;

var images = new Array(3);

for (let i = 0; i < 3; i++)
	images[i] = new Array(3);

for (let i = 0; i < 3; i++)
	for (let j = 0; j < 3; j++)
		images[i][j] = ("images/cat" + ((i * 3) + j + 1) + ".png");

/*
	Adds the tiled image to the board
*/
function prepareBoard() {
	//Check the browser is capable of basic things
	if (!document.getElementsByTagName)
		return;
	if (!document.getElementById)
		return;
	
	//Find the board
	rows = new Array(3)
	for (let i = 0; i < 3; i++)
		rows[i] = document.getElementById('row' + (i + 1));
	
	//Add the images
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			newElement = document.createElement('img');
			newElement.src = images[i][j];
			newElement.id = (i + j);
			newElement.alt = "cat" + (i + j);
			
			var row = rows[i];
			row.appendChild(newElement);
		}
	}
	
	//Randomly shuffle the images
	
}

/*
	Documentation
*/
function move() {

}

/*
	Documentation
*/
function reset() {

}

window.onload = prepareBoard;
