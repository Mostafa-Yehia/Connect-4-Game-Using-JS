window.onload = function () {

    userModeChoice = "";
    userDataChoice = [];
    userLevelChoice = "";

    gameMode = document.getElementsByClassName("gameMode")[0];
    gameData = document.getElementsByClassName("gameData")[0];
    gameLevel = document.getElementsByClassName("gameLevel")[0];
    gameboard = document.getElementsByClassName("gameboard")[0]
      script1 = document.createElement('script');
      script2 = document.createElement('script');
    script1.src = 'SinglePlayerMode.js';
    script2.src = 'MultiPlayerMode.js';    


    gameMode.classList.remove("gameMode");
    gameMode.classList.add("divAnimate");



    document.querySelectorAll(".mode").forEach((e) =>
        e.addEventListener("click", function (e) {
            userModeChoice = e.target.name;

            if (userModeChoice == "single") {
                document.querySelector("input[name=player2]").remove();
            }

            gameMode.classList.remove("divAnimate");
            gameMode.classList.add("divHide");

            gameData.classList.remove("gameData");
            gameData.classList.add("divAnimate");
        })
    );


    document.querySelectorAll(".submit").forEach((e) =>
        e.addEventListener("click", function (e) {


          

            // if (x == "" || x == null && y == "" || y == null) {
            //     alert("Name must be filled out");
            //     return false
            // }

            if (userModeChoice == "single") {
                userDataChoice[0] = document.querySelector("input[name=player1]").value;
                var z = document.forms["myForm"]["player1"].value;
                if (z === "" || z === null ) {
                alert("Name must be filled out");
                return false
            }
            }
            else {
                userDataChoice[0] = document.querySelector("input[name=player1]").value;
                userDataChoice[1] = document.querySelector("input[name=player2]").value;
                var x = document.forms["myForm"]["player1"].value;
                 var y = document.forms["myForm"]["player2"].value;
                if (x == "" || x == null && y == "" || y == null) {
                alert("Name must be filled out");
                return false
            }
            }

            gameMode.classList.remove("divHide");
            gameMode.classList.add("gameMode");

            gameData.classList.remove("divAnimate");
            gameData.classList.add("divHide");

            gameLevel.classList.remove("gameLevel");
            gameLevel.classList.add("divAnimate");


        })
    );


    document.querySelectorAll(".level").forEach((e) =>
        e.addEventListener("click", function (e) {
            userLevelChoice = e.target.name;

            gameData.classList.remove("divHide");
            gameData.classList.add("gameMode");
            gameLevel.classList.remove("divAnimate");
            gameLevel.classList.add("divHide");
            document.querySelector(".player1").innerText=  userDataChoice[0] ;
            if (userModeChoice == "single") {
                document.head.appendChild(script1);
                 document.querySelector(".player2").innerText = "Computer" ; 
                 userDataChoice[1] = "Computer";
                 document.querySelector(".playmode").innerText = "Single Player Vs Computer";
            }else{
                document.head.appendChild(script2);
                document.querySelector(".playmode").innerText = "MultiPlayer"
                document.querySelector(".player2").innerText=  userDataChoice[1] ;
              
            }
            gameboard.classList.remove("gameboard")
            gameboard.classList.add("gameboardDisplay")
            // document.getElementById("main").innerHTML += `<h1 style='color:white;'>${userDataChoice} requested a ${userModeChoice} player game in level ${userLevelChoice}</h1>`;
            


        })
    );


    // Display Names of Players in Single and Multiplayers mode

    
    
};
