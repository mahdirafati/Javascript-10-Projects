//Classes
class Budget {
  constructor(totalAmount) {
    this.totalAmount = totalAmount;
    this.amountLeft = totalAmount;
  }
  subtractFromBudget(expenseAmount) {
    return (this.amountLeft -= expenseAmount);
  }
}
//everything related to Html
class Html {
  //To insert budget amount to the Html
  insertBudget(amount) {
    budgetTotal.innerText = amount;
    budgetLeft.innerText = amount;
  }
  //To print all messages for user in Html
  printMessage(message, className) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("alert", "text-center", className);
    messageDiv.appendChild(document.createTextNode(message));
    //insert message div to  primary element
    const primary = document.querySelector(".primary");
    primary.insertBefore(messageDiv, form);
    setTimeout(() => {
      messageDiv.remove();
    }, 2500);
    form.reset();
  }
  //display and insert expenses to the list
  insertExpense(name, amount) {
    //access to the expenses list
    const expenseslist = document.querySelector("#expenses ul");
    //creating expense list item(by a little Bootstrap)
    const li = document.createElement("li");
    li.classList =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
    ${name}<span class="badge badge-primary badge-pill">${amount}</span>
    `;
    expenseslist.appendChild(li);
  }
  //tracking budget
  trackBudget(amount) {
    //display left Budget amount
    const finalBudget = budget.subtractFromBudget(amount);
    budgetLeft.innerText = finalBudget;
    //change class of left Budget element: less than 25% ==> 'alert-danger', less than 50% ==> 'alert-warning',
    const ratio = (finalBudget / budget.totalAmount) * 100;
    if (ratio <= 25) {
      budgetLeft.parentElement.parentElement.classList =
        "restante alert alert-danger";
    } else if (ratio <= 50) {
      budgetLeft.parentElement.parentElement.classList =
        "restante alert alert-warning";
    }
  }
}
