class UI {
  constructor() {
    this.messages = document.querySelector(".messages");
    this.spinner = document.querySelector(".spinner");
    this.result = document.querySelector("#result");
  }
  //To Print messages on UI
  printMessage(text, className) {
    //create a message Div
    const messageDiv = document.createElement("div");
    messageDiv.appendChild(document.createTextNode(text));
    messageDiv.className = className;
    //append Div to messages
    this.messages.appendChild(messageDiv);
    //remove message after 3 seconds
    this.removeMessage();
  }
  //To Remove message from UI
  removeMessage() {
    setTimeout(() => {
      //remove all children of messages tag
      while (this.messages.firstChild) {
        this.messages.removeChild(this.messages.firstChild);
      }
    }, 3000);
  }
  //Show Crypto results
  createTemplate(resObj, currency) {
    //check if there is any result, then need to remove that first
    const lastResult = this.result.firstElementChild;
    if (lastResult) {
      lastResult.remove();
    }
    //get currency full name
    let currencyName;
    switch (currency) {
      case "USD":
        currencyName = "US Dollor";
        break;
      case "EUR":
        currencyName = "Euro";
        break;
      case "GBP":
        currencyName = "Pound";
        break;
      default:
        console.error("Unknown currency");
        break;
    }
    //create html template
    let HTMLTemplate = `
      <div class="card cyan darken-3">
        <div class="card-content white-text">
          <h5 class="card-title">${resObj.name}</h5>
          <img width="50px" src="${resObj.logo_url}" alt="${resObj.name}-logo">
          <p>The price of ${resObj.name} from ${currencyName} is ${resObj.price}</p>
          <p>Last Hour: ${resObj["1h"].price_change}</p>
          <p>Last Day: ${resObj["1d"].price_change}</p>
          <p>Last Week: ${resObj["7d"].price_change}</p>
          <p>Last Month: ${resObj["30d"].price_change}</p>
        </div>
      </div>  
    `;
    console.log(HTMLTemplate);
    //Show spinner
    this.showSpinner();
    //show result in created template
    setTimeout(() => {
      document.querySelector(".spinner img").remove();
      this.showResult(HTMLTemplate);
    }, 2000);
  }
  //To show spinner ;)
  showSpinner() {
    const spinnerGIF = document.createElement("img");
    spinnerGIF.src = "../img/spinner.gif";
    //append spinner to html element
    this.spinner.appendChild(spinnerGIF);
  }
  //To show result with created template
  showResult(HTMLTemplate) {
    this.result.innerHTML = HTMLTemplate;
  }
}

//-----------------------------------------------------------

class CryptoAPI {
  constructor() {
    this.APIKey = "5fcaf9a56f7e1fad755a74e37126273f93a4a5d2";
  }
  //
  async queryAPI(currency, cryptocurrency) {
    //Build Url
    let url = `https://api.nomics.com/v1/currencies/ticker?key=${this.APIKey}&ids=${cryptocurrency}&interval=1h,1d,7d,30d&convert=${currency}`;
    //Fetch Url
    const response = await fetch(url);
    //return json
    const result = await response.json();
    return result;
  }
}
