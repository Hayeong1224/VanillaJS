const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !==parseInt(li.id); // true인 애는 li.id와 toDo.id가 다른 아이
    }); // 배열의 각 요소마다 함수를 실행하고 true인 애들만 새로운 배열 만듦. 
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){ // localstorage는 String
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // object -> string
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos(); // push 다음에 해줘야함!
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadTODos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); // todos 스트링 객체로 바꿔주기
        parsedToDos.forEach(function(toDo){ // toDo라는 각각 하나의 요소마다 함수 실행 해주기!
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadTODos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();