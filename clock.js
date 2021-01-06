const clockContainor = document.querySelector(".js-clock"),
clockTitle = clockContainor.querySelector("h1");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds }`;
} // 참이면 ? 뒤 실행 거짓이면 : 뒤 실행

//setInverval(함수,실행할 시간 간격[millisecond])
function init(){
    getTime();
    setInterval(getTime,1000);
}

init();