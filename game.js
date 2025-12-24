let boxes = document.querySelectorAll('.box');
let resetButton = document.getElementById('reset');
let newButton = document.getElementById('newbtn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.getElementById('msg');
let turn0 = true; 
let winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
boxes.forEach((box)=>{

    box.addEventListener('click', () => {
        console.log("Box was clicked!");
        if(turn0){
            box.innerText = 'X';
            turn0 = false;
        }
        else{
            box.innerText = 'O';
            turn0 = true;
        }
        box.disabled = true;
        checkWin();
    })
});
const disableboxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}
   const enableboxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = '';
        box.style.backgroundColor = '';
    } 
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}  🎉`;
    msgContainer.classList.remove('hide');
    disableboxes();
}

const checkWin = () => {
    let winnerFound = false;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val !== '' && pos2Val !== '' && pos3Val !== '') {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                winnerFound = true;
                boxes[pattern[0]].style.backgroundColor = 'lightgreen';
                boxes[pattern[1]].style.backgroundColor = 'lightgreen';
                boxes[pattern[2]].style.backgroundColor = 'lightgreen';
                showWinner(pos1Val);
                break;
            }
        }
    }
   
    if (!winnerFound && Array.from(boxes).every(box => box.innerText !== '')) {
        showDraw();
    }
};

const resetGame = () => {
    turn0 = true;
    enableboxes();
    msgContainer.classList.add('hide');
};
newButton.addEventListener('click', resetGame);
resetButton.addEventListener('click', resetGame);

const showDraw = () => {
    msg.innerText = "It's a Draw! 🤝";
    msgContainer.classList.remove('hide');
    disableboxes();
}