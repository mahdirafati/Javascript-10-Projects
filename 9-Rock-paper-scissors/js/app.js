//Class instantiations
const ui = new UI(),
  computer = new Computer(),
  game = new Game();
//Variables
//access to choice elements
const choiseElements = document.querySelectorAll(".choice");

//EventListeners
eventListener();
function eventListener() {
  //add listeners to every choice element
  choiseElements.forEach((choice) => {
    choice.addEventListener("click", choose);
  });
}

//Functions
function choose(event) {
  //access to choosen mode by user
  const userChoice = event.target.parentElement.id;
  //access to the choosen mode by computer
  const computerChoice = computer.choose();
  console.log(`userChoice: ${userChoice} - computerChoice: ${computerChoice}`);
  //Determine the winner of the game
  const winner = game.determineWinner(userChoice, computerChoice);
  //Add score for winner
  ui.addScore(winner);
  //Show Round message
  ui.showRoundMessage(winner, userChoice, computerChoice);
}
