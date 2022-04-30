'use strict';
//Class instantiations
const ui = new UI(),
  crypto = new CryptoAPI();

//Variables
const form = document.querySelector("#form");

//EventListeners
eventListeners();
function eventListeners() {
  form.addEventListener("submit", getValueation);
}

//Functions
function getValueation(event) {
  //prevent from sendig any action
  event.preventDefault();
  //access to the values
  const currency = document.querySelector("#currency").value,
    cryptoCurrency = document.querySelector("#cryptocurrency").value;
  //validation
  if (currency === "" || cryptoCurrency === "") {
    //printing validation error message
    ui.printMessage("All fields Required!", "deep-orange darken-4 card-panel");
  } else {
    //sending parameters to create Url and send API
    crypto
      .queryAPI(currency, cryptoCurrency)
      .then((result) => ui.createTemplate(result[0], currency));
  }
}
