//Variables
const txtInput = document.querySelector('.inputs input');
const checkBtn = document.querySelector('.inputs button');
const infoTxt = document.querySelector('.info-txt');
let filterInput;
//EventListeners
eventListeners();
function eventListeners(){
    txtInput.addEventListener('keyup', validateInput);
    checkBtn.addEventListener('click', checkPalindrome);
    //To do the checkPalindrome even when user click Enter
    window.addEventListener('keydown', (event)=>{
        if(event.key=='Enter') checkPalindrome();
    })
}
//Functions
//To validate user input everytime he enter a letter
function validateInput(){
    filterInput = this.value.replace(/[^A-Z0-9]/ig,'');
    if(filterInput){
        checkBtn.classList.add('active');
    }else{
        checkBtn.classList.remove('active');
        infoTxt.style.display = 'none';
    }
    
}
//To check that input is palindrome or not
function checkPalindrome(){
    const reverseInput = filterInput.split('').reverse().join('');
    if(filterInput === reverseInput) {
        infoTxt.style.display = 'block';
        infoTxt.innerHTML = `Yes, <span>${txtInput.value}</span> is a palindrome!`;
    }else{
        infoTxt.style.display = 'block';
        infoTxt.innerHTML = `No, <span>${txtInput.value}</span> isn't a palindrome!`;
    }
}