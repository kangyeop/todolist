document.querySelector("#create-button").addEventListener("click", createList);
document.querySelector(".rmv-btn").addEventListener("click", removeList);

function createList() {
    const input = document.querySelector("#input-box");

    if (!input.value) {
        alert("내용을 입력해주세요.");
        return;
    }

    const ul = document.getElementById("list");
    const count = ul.childElementCount;

    const li = document.createElement("li");

    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.setAttribute("class", "btn-chk");
    check.setAttribute("id", `done-button${count}`);
    check.addEventListener("click", moveDone);
    li.appendChild(check);

    const node = document.createTextNode(input.value);
    li.appendChild(node);

    const removeButton = document.createElement("button");
    removeButton.value = "삭제";
    removeButton.setAttribute("class", "btn-chk");
    removeButton.setAttribute("id", `remove-button${count}`);
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

    const newLi = document.createElement("li");
    newLi = li;

    li.parentNode.removeChild(li);
    const ul = document.getElementById("#listDone");
    ul.appendChild(newLi);
}
