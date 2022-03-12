overlay = document.querySelector("#overlay")
overlaywin = document.querySelector("#overlaywin")
turn = 0
playerColor = ["red","yellow"]
win = -1
tos = [0,0,0,0,0,0,0]
full = []

var p1turn = document.querySelector(".player1")
var p2turn = document.querySelector(".player2")

p1turn.style.border = '5px solid red';


if (userLevelChoice == 2) {
	var i = 1
	var leftFinished = false
	var rightFinished = false
	diagonal = true
	leftDiagonals = [ [], [], [], [] ]
	var leftDiagonalsFiller = {1:[0,0],
				   2:[0,1],
				   3:[0,2], //stop according to last col
				   4:[1,0]
				  }
	while(!leftFinished) {

		var currentList = leftDiagonalsFiller[i]
		var r = currentList[0]
		var c = currentList[1]

		if (i == 3) {
			stop = 4
		}
		else {
			stop = 5
		}

		for (x=0; r<stop+1; x++) {
			bufferDiv = document.querySelector("[class='circle R" + r++ + " C" + c++ + "']")
			leftDiagonals[i-1].push(bufferDiv)
		}

		i++

		if (i >= 5) {
			leftFinished = true
			i = 1
		}
	}


	rightDiagonals = [ [], [], [], [] ]
	var rightDiagonalsFiller = {1:[0,4], //stop according to first col
				   2:[0,5],
				   3:[0,6],
				   4:[1,6]
				  }
	while(!rightFinished) {

		var currentList = rightDiagonalsFiller[i]
		var r = currentList[0]
		var c = currentList[1]

		if (i == 1) {
			stop = 4
		}
		else {
			stop = 5
		}

		for (x=0; r<stop+1; x++) {
			bufferDiv = document.querySelector("[class='circle R" + r++ + " C" + c-- + "']")
			rightDiagonals[i-1].push(bufferDiv)
		}

		i++

		if (i >= 5) {
			rightFinished = true
			i = 1
		}
	}


	
}
else {
	diagonal = false
}
function off() {
	if(win == -1)
	document.getElementById("overlaywin").style.display = "none";
  }

init = function(e) {
		temp = e.target.getAttribute("class").substring(11,12)
		if (parseInt(tos[temp]) < 6) {
			document.querySelector("[class='circle R" + (5-tos[temp]) + " C" + temp + "']").style.backgroundColor = playerColor[turn]
			if (parseInt(tos[temp]) == 5) {
				e.target.style.animationName = 'none'
			}
			tos[temp] += 1
			win = checks(turn, playerColor[turn])
			if (!win) {
				if (turn == 0) {turn = 1; p2turn.style.border = '1px solid red'; p1turn.style.border = ''; overlay.style.width = "100vw"; overlay.style.height = "100vh"}
				else {turn = 0; p1turn.style.border = '1px solid red'; p2turn.style.border = '' ; overlay.style.width = "0vw"; overlay.style.height = "0vh"}
			}
			else {
			 
				overlaywin.style.display="block"
				overlaywin.innerHTML=`<h1 style="color:${ playerColor[turn]}; font-size:45px">Wooow:  ${ userDataChoice[turn]} Won!!</h1>
				<input type="button" class= "playag"value="Play Again" onclick="restart()">
				<input type="button" class="home" value="Home" onclick="Home()">`
				//alert("wooow: " + userDataChoice[turn] + " won !!!")
				end()
			}
		}
		else {
			full.push(temp)
			if (turn == 0) {
				alert ("COLUMN IS FULL !!!")
			}
		}
		if (turn == 1) {
			setTimeout("computerTurn()", 1500)
		}
	}

function Home()
{
	  result = confirm("Are you Sure You Want Back To Home")
	if(result == true)
	{
		 location.reload();
	}else{
		off()
	}
}
function start() {

document.querySelectorAll(".R0").forEach( function (e) {

	console.log("starting...")
	document.getElementsByClassName("start-btn")[0].disabled = true
	document.getElementsByClassName("start-btn")[0].style.opacity=0.5
	e.addEventListener('click', init)
})
}

function end() {

document.querySelectorAll(".R0").forEach( function (e) {

	overlay.style.width = "0vw"
	overlay.style.height = "0vh"
	console.log("ending...")
	e.removeEventListener('click', init)


})
}


function restart() {

document.querySelectorAll(".circle").forEach( function (e) {

	off()
	console.log("restarting...")
	e.addEventListener('click', init)
	e.removeAttribute("style")
	tos = [0,0,0,0,0,0,0]
	turn = 0
	win = -1
	full = []
	p1turn.style.border = '1px solid red';
	p2turn.style.border = '';

})
}


function computerTurn() {

	do {
		col = Math.floor(Math.random() * (7))
	}
	while (full.includes(col))

	document.querySelector(".C" + col).click()

}


function checks(player, playerColor) {

	var counter = 0
	var bool = false

	for (i=0; i<6; i++) {
		counter = 0
		document.querySelectorAll(".R"+i).forEach(function(e){
		currentColor = e.style.backgroundColor
		if (currentColor == "") {
			counter = 0
		}
		if (currentColor == playerColor) {
			counter = counter+1
			//e.innerText = counter
			//console.log(`counter is: ${counter}`)
		}
		else {
			counter = 0
		}
		if (userLevelChoice == 1 && counter > 3) {
			bool = true
		}
		if (userLevelChoice == 2 && counter > 4) {
			bool = true
		}
	})
	}

	if (bool) {
		return bool
	}



	//console.log("after row checks")



	for (i=0; i<7; i++) {
		counter = 0
		document.querySelectorAll(".C"+i).forEach(function(e){
		currentColor = e.style.backgroundColor
		if (currentColor == "") {
			counter = 0
		}
		if (currentColor == playerColor) {
			counter = counter+1
			//e.innerText = counter
			//console.log(`counter is: ${counter}`)
		}
		else {
			counter = 0
		}
		if (userLevelChoice == 1 && counter > 3) {
			bool = true
		}
		if (userLevelChoice == 2 && counter > 4) {
			bool = true
		}
	})
	}

	if (bool) {
		return bool
	}

	//console.log("after col checks")


	if (diagonal) {
		//logic

	for (i=0; i<4; i++) {
		counter = 0
		list = rightDiagonals[i]
		for (x=0; x<list.length; x++) {
		currentColor = list[x].style.backgroundColor
		//list[x].innerText = counter
		if (currentColor == "") {
			counter = 0
		}
		if (currentColor == playerColor) {
			counter = counter+1
			//list[x].innerText = counter
			//console.log(`counter is: ${counter}`)
		}
		else {
			counter = 0
		}
		if (counter > 4) {
			bool = true
		}
		
		}
	}

	if (bool) {
		return bool
	}

	//console.log("after right diagonals checks")




	for (i=0; i<4; i++) {
		counter = 0
		list = leftDiagonals[i]
		for (x=0; x<list.length; x++) {
		currentColor = list[x].style.backgroundColor
		//list[x].innerText = counter
		if (currentColor == "") {
			counter = 0
		}
		if (currentColor == playerColor) {
			counter = counter+1
			//list[x].innerText = counter
			//console.log(`counter is: ${counter}`)
		}
		else {
			counter = 0
		}
		if (counter > 4) {
			bool = true
		}
		
		}
	}

	if (bool) {
		return bool
	}

	//console.log("after left diagonals checks")




	}
}
