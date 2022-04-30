//Variables
const html = new HTMLUI();
const form = document.querySelector("#request-quote");
//EventListeners
eventListeners();
function eventListeners(){
    //Display years with making option tag for select tag
    document.addEventListener("DOMContentLoaded", function () {
      //display <option>s
      html.displayYears();
    });
    //read values from form when submit
    form.addEventListener('submit', function(event){
        event.preventDefault();
        //reading values from the form
        const model = document.querySelector('#model').value;
        const year = document.querySelector("#year").value;
        const level = document.querySelector('input[name="level"]:checked').value;
        if(model==="" || year==="" || level===""){
            html.displayError("لطفا همه مقادیر را انتخاب کنید");
        }else{
            //clear the #result inner first
            const result = document.querySelector('#result');
            if(result.firstElementChild){
              result.firstElementChild.remove();
            } 
            //Gathering information and calculate total price
            const insurance = new Insurance(model, year, level);
            const price = insurance.calculatePrice();
            html.showResult(price, insurance);
        }
    });
    
}

//Prototypes(objects)

//Html UI protoType
function HTMLUI(){};
  //To display year with options tags
HTMLUI.prototype.displayYears = function(){
    //get current year
    let currentYear = new Date().toLocaleDateString('fa-IR').substring(0,4);
    currentYear = fixNumbers(currentYear);
    //get min year 
    let minYear = currentYear - 20;
    //access to the select tag
    const select = document.querySelector('#year');
    //making option tag for each year
    for(let i=currentYear; i>=minYear;i--){
        //create option
        let option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        //append option to the select tag
        select.appendChild(option);
    }
}

  //To display error
HTMLUI.prototype.displayError = function(text){
    const errorDiv = document.createElement('div');
    errorDiv.classList = 'error';
    errorDiv.innerText = text;
      //insert errorDiv to the form
    form.insertBefore(errorDiv, document.querySelector('.form-group'));
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
    
}
  //html method to Show the result
HTMLUI.prototype.showResult = function(price, info){
  //access to the #result element
  const resultDiv = document.querySelector("#resul");

  //convert model number to car name
  let model,level;
  switch (info.model) {
    case "1":
      model = "پراید";
      break;
    case "2":
      model = "اپتیما";
      break;
    case "3":
      model = "پورشه";
      break;
    default:
      console.error("This is not a right model!");
  }
  //convert level of insurance to persian string
  if(info.level === 'basic'){
    level = 'ساده';
  }else{
    level = "تکمیلی";
  }

  //Create the factor div 
  const div = document.createElement("div");
  div.innerHTML = `
  <p class="header">خلاصه فاکتور</p>
  <p>مدل ماشین: ${model}</p>
  <p>سال ساخت: ${info.year}</p>
  <p>نوع بیمه: ${level}</p>
  <P class="total">قیمت نهایی: ${price}</P>
  `;
  //showing spinner before apend
  const spinner = document.querySelector('#loading img');
  spinner.style.display = 'block';

  setTimeout(() => {
    //hide spinner
    spinner.style.display = "none";
    //append factor div to the result div
    resultDiv.appendChild(div);
    
  }, 3000);
}

//Insuranse protoType
function Insurance(model, year, level){
    this.model = model;
    this.year = year;
    this.level = level;
}
  //TO calculate the price based on model, year of manufacture, and level of insurance 
Insurance.prototype.calculatePrice = function(){
  const basePrice = 2000000;
  let finalPrice;
    //Price calculation based on car model
  finalPrice = this.calculateOnModel(basePrice, this.model);

    //Price change according to the year of manufacture of the car: 3% cheaper for each year
  const yearsDifference = this.calculateYearDiffrence(this.year);
  finalPrice = finalPrice - ((yearsDifference * 3) / 100) * finalPrice;

    //Price change according to the level of the insurance
  finalPrice = this.calculateByLevel(finalPrice, this.level);

  return finalPrice;
}
  //Method to calculate price by model of the car
Insurance.prototype.calculateByModel = function(basePrice, model){

    //Price calculation based on car model : model:1 ==> 1.15, model:2 ==> 1.30, model:3 ==> 1.80
  let finalPrice;
  switch (model) {
    case "1":
      finalPrice = basePrice * 1.15;
      break;
    case "2":
      finalPrice = basePrice * 1.3;
      break;
    case "3":
      finalPrice = basePrice * 1.8;
      break;
    default:
      console.error("This is not a right model!");
  }
  return finalPrice;
}
  //Method to calculate diffrence of seleceted and current year
Insurance.prototype.calculateYearDiffrence= function(selectedYear){
  let currentYear = new Date().toLocaleDateString('fa-IR').substring(0, 4);
  currentYear = fixNumbers(currentYear);
  const diffrence = currentYear - selectedYear;
  return diffrence;
}
  //Method to calculate price by level of the insurance
Insurance.prototype.calculateByLevel = function(price, level){
    /*
    basic ==> increase 30%
    complete ==> increase 50%
    */
  if(level === 'basic'){
    price*=1.30;
  }else{
    price*=1.50;
  }
  return price;
}

//Functions
  //Convert persian number to english number function
fixNumbers = function (str) {
  let
  persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
  arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
  if (typeof str === "string") {
      for (var i = 0; i < 10; i++) {
        str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
      }
    }
    return str;
  };

