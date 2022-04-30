//Variables
let userBudget;
let budget;
const budgetTotal = document.querySelector("span#total");
const budgetLeft = document.querySelector("span#left");
const form = document.querySelector("#add-expense");
//instatiate Html class
const html = new Html();

//EventListeners
eventListeners();
function eventListeners() {
  //getting weekly budget from user
  document.addEventListener("DOMContentLoaded", function () {
    userBudget = prompt("لطفا بودجه هفتگی خود را وارد کنید");
    //validate user budget input
    if (userBudget === null || userBudget === "" || userBudget === "0") {
      window.location.reload();
    } else {
      //instatiate Budget class
      budget = new Budget(userBudget);
      html.insertBudget(budget.totalAmount);
    }
  });
  //get values from the form when submitted
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    //access to the values of inputs
    const expense = document.querySelector("#expense").value;
    const amount = document.querySelector("#amount").value;
    if (expense === "" || amount === "") {
      html.printMessage("وارد کردن همه موارد الزامی است", "alert-danger");
    } else if (isNaN(amount)) {
      html.printMessage("لطفا مقدار هزینه را به عدد وارد کنید", "alert-danger");
    } else if (amount > budget.amountLeft) {
      html.printMessage(
        "هزینه وارد شده بیشتر از بودجه باقی مانده شماست :(",
        "alert-danger"
      );
    } else {
      html.printMessage("هزینه ثبت شد", "alert-success");
      html.insertExpense(expense, amount);
      html.trackBudget(amount);
    }
  });
}
