class UI {
  constructor() {
    this.userScore_span = document.querySelector("#user-score");
    this.compScore_span = document.querySelector("#comp-score");
    this.result_p = document.querySelector(".result p");
  }
  //To Add point to UI score boared
  addScore(winner) {
    //Get current scores
    const userScore = Number(this.userScore_span.innerText);
    const compScore = Number(this.compScore_span.innerText);
    //add 1 point to winner's score
    switch (winner) {
      case "usr":
        this.userScore_span.innerText = userScore + 1;
        break;
      case "comp":
        this.compScore_span.innerText = compScore + 1;
        break;
      case "none":
        break;
      default:
        throw new Error("invalid winner");
        break;
    }
  }
  //To show round message
  showRoundMessage(winner, userChoice, computerChoice) {
    let text;
    //Create text message
    if (winner === "usr" || winner === "comp") {
      text = `کامپیوتر ${this.convertToWord(
        computerChoice
      )} و شما ${this.convertToWord(userChoice)} رو انتخاب کردید، ${
        winner === "usr" ? "شما" : "کامپیوتر"
      } ${winner === "usr" ? "بردید" : "برد"}.😜`;
    } else {
      text = "مساوی شد !😅";
    }
    //append text to result
    this.result_p.innerHTML = text;
    //change style of selected image
    document.getElementById(userChoice).classList.add(`${this.changeImageColor(winner)}`);
    //remove style afte 500ms
    setTimeout(() => {
      document.getElementById(userChoice).classList.remove(`${this.changeImageColor(winner)}`);
    }, 500);
  }
  //To convert choice letter to persian word
  convertToWord(letter) {
    if (letter === "r") {
      return "سنگ";
    } else if (letter === "p") {
      return "کاغذ";
    }
    return "قیچی";
  }
  //To change style of selected image by user
  changeImageColor(winner){
    if(winner === 'usr'){
      return 'green'
    }else if(winner === 'comp'){
      return 'red';
    }
    return 'gray';
  }
}

//------------------------------------

class Game {
  //Determine the winner
  determineWinner(userChoice, computerChoice) {
    //Determine the winner according to the following modes
    let winner;
    switch (userChoice + computerChoice) {
      case "rs":
      case "pr":
      case "sp":
        console.log("User wins 😜");
        winner = "usr";
        break;
      case "sr":
      case "rp":
      case "ps":
        console.log("Computer wins 😘");
        winner = "comp";
        break;
      case "ss":
      case "rr":
      case "pp":
        console.log("Draw! 😅");
        winner = "none";
        break;
      default:
        throw new Error("Invalid mode");
        break;
    }
    return winner;
    // if (userChoice === "r" && computerChoice === "s") {
    //   console.log("User wins 😜");
    //   return "usr";
    // } else if (userChoice === "r" && computerChoice === "p") {
    //   console.log("Computer wins 😘");
    //   return "comp";
    // } else if (userChoice === "s" && computerChoice === "p") {
    //   console.log("User wins 😜");
    //   return "usr";
    // } else if (userChoice === "s" && computerChoice === "r") {
    //   console.log("Computer wins 😘");
    //   return "comp";
    // } else if (userChoice === "p" && computerChoice === "r") {
    //   console.log("User wins 😜");
    //   return "usr";
    // } else if (userChoice === "p" && computerChoice === "s") {
    //   console.log("Computer wins 😘");
    //   return "comp";
    // } else if (userChoice === "r" && computerChoice === "r") {
    //   console.log("Equal 😅");
    //   return "eql";
    // } else if (userChoice === "p" && computerChoice === "p") {
    //   console.log("Equal 😅");
    //   return "eql";
    // } else if (userChoice === "s" && computerChoice === "s") {
    //   console.log("Equal 😅");
    //   return "eql";
    // }
  }
}

//------------------------------------

class Computer {
  //choose a random choice between <<s, p, r>>
  choose() {
    const choices = ["s", "p", "r"];
    const random = Math.floor(Math.random() * choices.length);
    return choices[random];
  }
}
