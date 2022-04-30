'use strict';
//Class Instantiation
const ui = new UI(),
  news = new News();

//Listeners
listeners();
function listeners() {
  document.querySelector("#submitBtn").addEventListener("click", search);
}
//functions
function search(e) {
  e.preventDefault();
  //access to the fileds
  const newsName = document.querySelector("#news-name").value,
    country = document.querySelector("#country").value,
    category = document.querySelector("#category").value;
  //Validation
  if (newsName !== "" || country !== "" || category !== "") {
    //getting news in promise result
    news.queryAPI(newsName, country, category).then((news) => {
      //check if there is no news then show message
      if (news.totalResults === 0) {
        ui.printMessage(
          "There is no news based on your filtering",
          "text-center alert alert-warning mt-4"
        );
      } else {
        ui.showNews(news.articles);
      }
    });
  } else {
    ui.printMessage(
      "Please enter at least one parameter",
      "text-center alert alert-danger"
    );
  }
}
