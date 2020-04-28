let two = 2;
let three = 3;
let five = 5;
let hundred = 100;
let gameState = new Number();
window.confirm('Do you want to play a game?') === false ? (alert('You did not become a billionaire, but can.'),
    gameState = 0) : gameState = 1;
let generalPrize = 0;
let currentPrize = hundred;
let min = 0;
let max = five;
let userNbr = new Number();
let random = function getNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
// j = count for times user succesfully guessed and decided to continue in a row//
let j = new Number();
while (gameState === 1 || gameState === two) {
    let trueNbr = random(min, max);
    gameState === 1 ? trueNbr = random(min, five) : null;
    console.log(trueNbr);
    for (let i = 0; i <three; i++) {
        gameState === 1 ? (currentPrize = hundred, max = five) : null;
        switch (i) {
            case 1:
                currentPrize = currentPrize / two;
                break;
            case two:
                currentPrize = currentPrize /two;
                break;
            default:
                null;
        }
        userNbr = prompt(`Choose a roulette pocket number from ${min} to ${max}
Attempts left: ${three - i}
Total prize: ${generalPrize}$
Possible prize on current attempt: ${currentPrize}$`);
        if (typeof userNbr !== 'object' && Number(userNbr) === trueNbr && userNbr !== '') {
            window.confirm(`Congratulation, you won! Your prize is: ${currentPrize}$. Do you want to continue?`)
            === true ? (generalPrize = generalPrize + currentPrize, gameState = two) :
                (gameState = 0, generalPrize = 0); break;
        } else {
            gameState = 0
        }
            }
    if (gameState === 0) {
        currentPrize = 0;
        j = 0;
        //I didn't quite understand which prize to show in the following alert, but in QA the menthor
        //said to follow the task doc, and the doc states that we need to display general prize in propmt//
        alert(`Thank you for your participation. Your prize is: ${currentPrize}$`);
        window.confirm('Would you like to play again?') === false ? gameState = 0 : (gameState = 1, generalPrize = 0);
    } else {
        j++;
        max = max + five;
        currentPrize = Math.pow(two, j) * hundred;
    }
}
