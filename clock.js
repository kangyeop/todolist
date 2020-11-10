function clock() {
    const clockTarget = document.getElementById("clock");

    const date = new Date();
    const month = date.getMonth();
    const clockDate = date.getDate();
    const day = date.getDay();

    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    clockTarget.innerText =
        `${month + 1}월 ${clockDate}일 ${week[day]}요일 ` +
        `${hours < 10 ? `0${hours}` : hours}:${
            minutes < 10 ? `0${minutes}` : minutes
        }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
    clock();
    setInterval(clock, 1000);
}

init();
