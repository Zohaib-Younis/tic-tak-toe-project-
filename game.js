let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO=  true//Player x, player y

let player1 = document.querySelector("#player1Btn");

player1.addEventListener("click", () => {
    player1.innerText = prompt("Enter Player-1 Name");
});

let player2 = document.querySelector("#player2Btn");

player2.addEventListener("click", () => {
    player2.innerText = prompt("Enter Player-2 Name");
});

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () =>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");

}




boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if(turnO){//playerO
            box.innerText="O";
            turnO =false;
        } else{//playerX
            box.innerText="X";
            turnO=true;
        }
        box.disabled =true;
        checkWinner();
    });
});

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled =true;
    }
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const showWinner=(winner)=>{
    msg.innerText=`Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner=()=>{
     let winnerFound = false;
     for(pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val!= "" && pos2Val!= "" && pos3Val!= ""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                console.log("winner",pos1Val);
                showWinner(pos1Val);
                winnerFound = true;
                break;
            }
        }
     }
     if (!winnerFound) {
        let allBoxesFilled = true;
        for (let box of boxes) {
            if (box.innerText === "") {
                allBoxesFilled = false;
                break;
            }
        }

        if (allBoxesFilled) {
            msg.innerText = "It's a draw!";
            msgContainer.classList.remove("hide");
        }
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

