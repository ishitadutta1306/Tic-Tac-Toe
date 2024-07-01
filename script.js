let turnX=true;   //by-default 1st turn is X

const winPatterns=[
    [0,1,2],    //Top row
    [3,4,5],    
    [6,7,8],
    [0,3,6],    //Left column
    [1,4,7],
    [2,5,8],
    [0,4,8],    // Diagonal from top-left to bottom-right
    [2,4,6]
];

let boxes=document.querySelectorAll(".box");    //9 boxes

let turnInfo=document.querySelector("#turn-info");

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if (turnX){     //turn of X
            box.innerText="X";
            turnX=false;    //next will be O's turn
            turnInfo.innerText="Turn for: O";   //O
        }
            
        else{   //turn of O
            box.innerText="O";
            turnX=true;
            turnInfo.innerText="Turn for: X";   //X
        }
        box.disabled=true;  //disable click functionality of the box once a move has been made
        
        checkWinner();  //as soon as a box is clicked, winning patterns are checked
        checkDraw();
    });
});

const checkWinner=()=>{
    for(let i of winPatterns){
        //console.log(i);     //1st i -> [0,1,2]
        //console.log(boxes[i[0]],boxes[i[1]],boxes[i[2]]);   //Accesses the boxes at the indices specified in the current winning pattern i

        let pos1_val=boxes[i[0]].innerText;
        let pos2_val=boxes[i[1]].innerText;
        let pos3_val=boxes[i[2]].innerText;

        if (pos1_val!="" && pos2_val!="" && pos3_val!=""){  //Check for winning pattern only if the boxes aren't empty
            if(pos1_val===pos2_val && pos2_val===pos3_val){
                console.log(`Winner is ${pos1_val}`);
                showWinner(pos1_val);
                disableBoxes();
            }
        }
    }
};

let winnerInfo=document.querySelector("#winner-info");

const showWinner=(winner)=>{
    winnerInfo.innerText=`Winner: ${winner}`;
    winnerInfo.style.display="block";
    turnInfo.style.display="none";
    
};

const checkDraw=()=>{
    let draw=true;
    boxes.forEach(box =>{
        if (box.innerText===""){
            draw=false;
        }
    });

    if (draw){
        winnerInfo.innerText="It's a Draw!";
        winnerInfo.style.display="block";
        turnInfo.style.display="none";
        disableBoxes();
    }
};

const resetGame=()=>{
    turnX=true;    //Again it's turn for X in the empty grid
    turnInfo.style.display="block";
    turnInfo.innerText="Turn for: X";
    enableBoxes();
    winnerInfo.innerText="Winner: ";
    winnerInfo.style.display="none";
};

const disableBoxes=()=>{
    for (let i of boxes){
        i.disabled=true;
    }
};

const enableBoxes=()=>{
    for (let i of boxes){
        i.disabled=false;
        i.innerText="";
    }
};

let resetBtn=document.querySelector("#reset-btn");

resetBtn.addEventListener("click",resetGame);

let newGameBtn=document.querySelector("#new-game-btn");

newGameBtn.addEventListener("click",resetGame);     
