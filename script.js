document.querySelector("#create-button").addEventListener("click", createList);

function createList() {
    const input = document.querySelector("#input-box");

    if (!input.value) {
        alert("내용을 입력해주세요.");
        return;
    }

    const ul = document.querySelector("#list-do");
    const count = ul.childElementCount;

    const li = document.createElement("li");

    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.setAttribute("class", "btn-chk");
    check.setAttribute("id", `do-button${count}`);
    check.addEventListener("click", moveDone);
    li.appendChild(check);

    const node = document.createTextNode(input.value);
    li.appendChild(node);

    const removeButton = document.createElement("button");
    removeButton.value = "삭제";
    removeButton.setAttribute("class", "rmv-btn");
    removeButton.setAttribute("id", `remove-button${count}`);
    removeButton.append(document.createTextNode("삭제"));
    removeButton.addEventListener("click", removeList);
    li.appendChild(removeButton);

    ul.appendChild(li);

    input.value = "";
}

function removeList(e) {
    const id = e.target.id;
    const li = document.querySelector(`#${id}`).parentNode;
    li.parentNode.removeChild(li);
}

function moveDone(e) {
    const id = e.target.id;
    const li = document.querySelector(`#${id}`).parentNode;
    const newLi = li;
    li.parentNode.removeChild(li);
    const ulDone = document.querySelector("#list-done");
    const ulDo = document.querySelector("#list-do");
    if (e.target.checked) {
        const count = ulDone.childElementCount;

        const rmvbtn = newLi.childNodes[2];
        const donebtn = newLi.childNodes[0];
        rmvbtn.setAttribute("id", `done-remove-button${count}`);
        donebtn.setAttribute("id", `done-button${count}`);

        ulDone.appendChild(newLi);
    } else {
        const count = ulDo.childElementCount;

        const rmvbtn = newLi.childNodes[2];
        const donebtn = newLi.childNodes[0];
        rmvbtn.setAttribute("id", `remove-button${count}`);
        donebtn.setAttribute("id", `do-button${count}`);

        ulDo.appendChild(newLi);
    }
}

function enterkey() {
    if (window.event.keyCode == 13) {
        createList();
    }
}
