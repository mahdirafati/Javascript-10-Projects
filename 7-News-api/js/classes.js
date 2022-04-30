'use strict';
class UI {
  constructor() {
    this.result = document.querySelector("#result");
  }
  //Show any message in Html UI
  printMessage(message, className) {
    //create a div tag for message
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(message));
    div.className = className;
    //append message div tag
    document.querySelector("#message").appendChild(div);
    //remove message after 3 seconds
    setTimeout(() => {
      this.removeMessage();
    }, 3000);
  }

  //Remove all messages
  removeMessage() {
    //finding messages elements(.alert)
    const alerts = document.querySelectorAll(".alert");
    //remove every message element
    alerts.forEach((element) => {
      element.remove();
    });
  }

  //Show Fetched news on Html
  showNews(newsArray) {
    //console.table(newsArray);
    //create a card for each news
    newsArray.map((newsInfo) => {
      this.result.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title text-center">${newsInfo.title.split(
                "-",
                1
              )}</h2>
              <p class="card-text lead textto-info">News information: </p>
              <span class="badge badge-primary">source: ${
                newsInfo.source.name
              }</span>
              <span class="badge badge-primary">Date & time: ${
                newsInfo.publishedAt
              }</span>
              <a href="${
                newsInfo.url
              }" target="_blank" class="btn btn-primary btn-block">Read news</a>
            </div>
          </div>
        </div>      
      `;
    });
  }
}

//-----------------------------------------------------

class News {
  constructor() {
    this.APIKey = "61a77c2c9cda41349af41657a26f57ed";
  }
  //Send Url to the API
  async queryAPI(newsName, country, category) {
    //Build Url
    let url = "https://newsapi.org/v2/";
    //check the country and category value
    if (country === "" && category === "") {
      url += "everything?";
    } else {
      url += "top-headlines?";
    }
    //Now adding parameters to url
    //if newsName entered
    if (newsName) {
      url += `q=${newsName}&`;
    }

    //if country entered
    if (country) {
      url += `country=${country}&`;
    }

    //if category entered
    if (category) {
      url += `category=${category}&`;
    }

    //complete Url with apiKey
    url += `apiKey=${this.APIKey}`;
    //Fetch API by using async/await
    const newsResponse = await fetch(url);
    const news = await newsResponse.json();
    return news;
  }
}
