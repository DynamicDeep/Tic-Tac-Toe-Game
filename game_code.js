//Hello this is a JS file for Tic-Tac-Toe game, Hopefully you will enjoy it...

// this are the elements from the html file which I am going to access by using JS.
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;

let turnO = true; //player X, playerY
const winPattern = [  // these are the win patterns of the game
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

/* this bit of code [24 to 46] is to function a part which defines what will be sign [O or X] on particular click.
e.g. imagine the the first click on the box is sign O. so the next time when we click the other button is has to be
sign X. this process repeat it until we get the winner or the game ended in draw.
-> the second thing which happen in this code is every time we click button it saves it as an count. This thing
going to help me to decide the game is ended in draw[this will be more clear in further part of the code]*/

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            box.classList.add("turnO-color");
            turnO = false;
        } 
        else {
            box.innerText = "X";
            box.classList.add("turnX-color");
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }

    });
});


/* This part of the code [57 to 69] is to check Winner. Obviously you will get it by the function name. hahahaha...
no worries, but let me explain, what I want to explain here as per my understanding of this code is this function
 takes one of a winning pattern and check the position of an object to match winner from the winning patterns. */
const checkWinner = () => {
    for( let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }
    }
}

/* this function is just to show the winner and winner msg, and disable all the boxes so that the game stops after
 we get our first winner and no one can play the game further once the results declared. */
const showWinner = (Winner) => {
    msg.innerText = `Congratulations, Winner is ${Winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

// this is a disabled function. the utility of this funtion is to disable the btns or borxes.
const disabledBoxes = () => {
    for(let box of boxes){
        box.disabled= true;
    }
}

/*this is a enable function. Just to enable the buttons again when we start a new game again. The code isNothing but 
 when you turn false to disable button then it automatically enabled.*/
const enabledBoxes = () => {
    for(let box of boxes){
        box.disabled= false;
        box.innerText = "";
    }
}

/* this is a reset game function. it is for reset the game or start a new game again. */
const resetGame = () => {
    turnO = true;
    count = 0;
    enabledBoxes();
    msgContainer.classList.add("hide");
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

/* Implement practice problem
(Solution Code is given in the Description Box)

Implement the logic for "Draw" condition.
You have to track when the game has no winner.
In this case, print a different message in the msg.

Hint - Use a new variable count, which count button clicks.
When the total count reaches 9 but Game has no winners, that 
means the Game was a Draw.*/

// the gameDraw function is to show the msg that this game is drawn and disabled the boxes.
const gameDraw = () => {
    msg.innerText = "The Game was ended in Draw!";
    msgContainer.classList.remove("hide");
    disabledBoxes();
};