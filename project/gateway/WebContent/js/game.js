var gameId = "";
var gameInterval;
function joinGame(id){
	gameId = id;
	clearInterval(gameInterval);
	gameInterval = setInterval(updateGame, 500);
	updateGame();
}

function updateGame(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:9002/game/game/'+gameId, true);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.withCredentials = true;
	xhr.onreadystatechange = function (oEvent) {  
    if (xhr.readyState === 4) {  
        if (xhr.status === 200) {  
           renderGame(JSON.parse(xhr.responseText));  
        } else {  
           console.log("Error", xhr.statusText);
           console.log(xhr.responseText)  
        }  
    }};
	xhr.send();	
}

function renderGame(game){
	var gameBoard = document.getElementById("gameBoard");
	//Fix this since table doesn't technically support setting innerHTML
	newHTML = "";
	for(i = 0 ; i < game.board.length ; i++){
		newHTML += "<tr>"
		for(j = 0 ; j < game.board[i].length ; j++){
			newHTML+= "<td style=\"border-color: black;border-style: solid;\" onclick=\"gameClick("+i+","+j+")\">"+ (game.board[i][j] == " " ? "&nbsp;" : game.board[i][j]) + "</td>"
		}
		newHTML+= "</tr>"
	}
	gameBoard.innerHTML = newHTML;
}

function gameClick(row, column){
	move = {
			row:row,
			column:column
	};
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://localhost:9002/game/game/'+gameId+'/move', true);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.withCredentials = true;
	xhr.onreadystatechange = function (oEvent) {  
    if (xhr.readyState === 4) {  
        if (xhr.status === 200) {  
          console.log(xhr.responseText)  
        } else {  
           console.log("Error", xhr.statusText);
           console.log(xhr.responseText)  
        }  
    }};
	xhr.send(JSON.stringify(move));
}

