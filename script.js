document.querySelector("#create-button").addEventListener("click", createList);

let doData = localStorage.getItem("doData")
    ? localStorage.getItem("doData").split(",")
    : [];

let doneData = localStorage.getItem("doneData")
    ? localStorage.getItem("doneData").split(",")
    : [];

function createList() {
    const input = document.querySelector("#input-box");

    if (!input.value) {
        alert("내용을 입력해주세요.");
        return;
    }

    const index = doData.findIndex((element) => element === input.value);
    if (index >= 0) {
        alert("이미 등록된 내용입니다.");
        return;
    }

    const ul = document.querySelector("#list-do");

    const li = document.createElement("li");

    const unique = (Math.random() * 100).toFixed(0);

    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.setAttribute("class", "btn-chk");
    check.setAttribute("id", `do-button-${unique}`);
    check.addEventListener("click", moveDone);
    li.appendChild(check);

    const node = document.createTextNode(input.value);
    li.appendChild(node);

    const removeButton = document.createElement("button");
    removeButton.value = "삭제";
    removeButton.setAttribute("class", "rmv-btn");
    removeButton.setAttribute("id", `remove-button-${unique}`);
    removeButton.append(document.createTextNode("삭제"));
    removeButton.addEventListener("click", removeList);
    li.appendChild(removeButton);

    ul.appendChild(li);

    doData.push(input.value);
    localStorage.setItem("doData", doData);

    input.value = "";
}

function removeList(e) {
    const id = e.target.id;
    const li = document.querySelector(`#${id}`).parentNode;
    if (li.parentNode.id.split("-")[1] === "do") {
        const index = doData.findIndex(
            (element) => element === li.childNodes[1].nodeValue
        );
        doData.splice(index, 1);
        localStorage.setItem("doData", doData);
    } else {
        const index = doneData.findIndex(
            (element) => element === li.childNodes[1].nodeValue
        );
        doneData.splice(index, 1);
        localStorage.setItem("doneData", doneData);
    }
    li.parentNode.removeChild(li);
}

function moveDone(e) {
    const id = e.target.id;
    const li = document.querySelector(`#${id}`).parentNode;
    const newLi = li;

    li.parentNode.removeChild(li);
    const ulDone = document.querySelector("#list-done");
    const ulDo = document.querySelector("#list-do");
    const unique = (Math.random() * 100).toFixed(0);
    if (e.target.checked) {
        const index = doData.findIndex(
            (element) => element === newLi.childNodes[1].nodeValue
        );
        doData.splice(index, 1);

        const rmvbtn = newLi.childNodes[2];
        const donebtn = newLi.childNodes[0];
        rmvbtn.setAttribute("id", `done-remove-button-${unique}`);
        donebtn.setAttribute("id", `done-button-${unique}`);

        ulDone.appendChild(newLi);
        doneData.push(newLi.childNodes[1].nodeValue);
    } else {
        const index = doneData.findIndex(
            (element) => element === newLi.childNodes[1].nodeValue
        );
        doneData.splice(index, 1);

        const rmvbtn = newLi.childNodes[2];
        const donebtn = newLi.childNodes[0];
        rmvbtn.setAttribute("id", `remove-button-${unique}`);
        donebtn.setAttribute("id", `do-button-${unique}`);

        ulDo.appendChild(newLi);
        doData.push(newLi.childNodes[1].nodeValue);
    }
    localStorage.setItem("doData", doData);
    localStorage.setItem("doneData", doneData);
}

function enterkey() {
    if (window.event.keyCode == 13) {
        createList();
    }
}

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

    doData.map((data) => {
        const ul = document.querySelector("#list-do");
        const unique = (Math.random() * 100).toFixed(0);

        const li = document.createElement("li");

        const check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.setAttribute("class", "btn-chk");
        check.setAttribute("id", `do-button-${unique}`);
        check.addEventListener("click", moveDone);
        li.appendChild(check);

        const node = document.createTextNode(data);
        li.appendChild(node);

        const removeButton = document.createElement("button");
        removeButton.value = "삭제";
        removeButton.setAttribute("class", "rmv-btn");
        removeButton.setAttribute("id", `remove-button-${unique}`);
        removeButton.append(document.createTextNode("삭제"));
        removeButton.addEventListener("click", removeList);
        li.appendChild(removeButton);

        ul.appendChild(li);
    });

    doneData.map((data) => {
        const ul = document.querySelector("#list-done");
        const unique = (Math.random() * 100).toFixed(0);

        const li = document.createElement("li");

        const check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.setAttribute("class", "btn-chk");
        check.setAttribute("checked", true);
        check.setAttribute("id", `do-button-${unique}`);
        check.addEventListener("click", moveDone);
        li.appendChild(check);

        const node = document.createTextNode(data);
        li.appendChild(node);

        const removeButton = document.createElement("button");
        removeButton.value = "삭제";
        removeButton.setAttribute("class", "rmv-btn");
        removeButton.setAttribute("id", `remove-button-${unique}`);
        removeButton.append(document.createTextNode("삭제"));
        removeButton.addEventListener("click", removeList);
        li.appendChild(removeButton);

        ul.appendChild(li);
    });

    setInterval(clock, 1000);
}

init();
