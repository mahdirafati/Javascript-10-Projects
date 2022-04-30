'use strict';
//Variables
const coursesList = document.querySelector('#courses-list');
const shoppingCartTable = document.querySelector('#cart-content tbody');
const clearBoxBtn = document.querySelector("#clear-cart");

//Eventlisteners
eventListeners();
function eventListeners(){
    coursesList.addEventListener('click', buyCourse);
    shoppingCartTable.addEventListener('click', removeCourse);
    clearBoxBtn.addEventListener('click', clearBox);
    document.addEventListener('DOMContentLoaded', loadFromStorage);
}


//functions
function buyCourse(event){
    if(event.target.classList.contains('add-to-cart')){
        event.preventDefault();
        const course = event.target.parentElement.parentElement;
        getCourseInfo(course);
    }
}

function getCourseInfo(course){
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('span').textContent,
        id: course.querySelectorAll('a')[1].getAttribute('data-id'),
    };
    addToBox(courseInfo);

}

function addToBox(courseInfo) {
    shoppingCartTable.innerHTML += 
    `<tr>
        <td>
            <img src="${courseInfo.image}" width="100">
        </td>
        <td>${courseInfo.title}</td>
        <td>${courseInfo.price}</td>
        <td>
            <a class="remove" href="#" data-id = "${courseInfo.id}">X</a>
        </td>
    </tr>`;
    addToStorage(courseInfo);    
}

function removeCourse(event) {
    if(event.target.classList.contains('remove')){
        event.target.parentElement.parentElement.remove();
        const courseId = event.target.getAttribute('data-id');
        removeFromStorage(courseId);
    }
}

function clearBox(event){
    event.preventDefault();
    //shoppingCartTable.innerHTML = '';
    while(shoppingCartTable.firstElementChild){
        shoppingCartTable.firstElementChild.remove();
    }
    clearBoxLS();
}

function addToStorage(course){
    const courses = getFromStorage();
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
}

function getFromStorage(){
    let courses;
    if(localStorage.getItem('courses')){
        courses = JSON.parse(localStorage.getItem('courses'));
    }else{
        courses = [];
    }
    return courses;
}

function loadFromStorage(){
    const courses = getFromStorage();
    courses.forEach(course=>{
        shoppingCartTable.innerHTML += 
    `<tr>
        <td>
            <img src="${course.image}" width="100">
        </td>
        <td>${course.title}</td>
        <td>${course.price}</td>
        <td>
            <a class="remove" href="#" data-id = "${course.id}">X</a>
        </td>
    </tr>`;
    })
}

function clearBoxLS(){
    localStorage.clear();
}

function removeFromStorage(id){
    const courses = getFromStorage();
    courses.forEach((course,index) => {
        if(course.id===id){
            courses.splice(index, 1);
        }
    });
    localStorage.setItem('courses', JSON.stringify(courses)); 
}