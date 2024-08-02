var items = JSON.parse(localStorage.getItem("todo-list")) || [];

// add item to list
const addItem = () => {
    let str = document.getElementById('text').value;

    if (str === "") {
        document.getElementById('box').style.display = 'flex';
        document.getElementById('content').style.display = 'none';
        return;
    }
    let count = 0;
    items.forEach(element => {
        if(element.value.index>count)
            count = element.value.index;
    });
    // console.log(count);

    // object for local storage
    const item = {
        index: count + 1,
        todo: str,
        status: "Pending",
        checkbox: false,
    }

    // push to list
    items.push({
        value: item,
    });

    localStorage.setItem("todo-list", JSON.stringify(items));
    text.value = "";

    // call function to update to do list
    listItem(items.length - 1)
}

// list the items
const listItem = (inNum) => {
    for (let i = inNum; i < items.length; i++) {
        const createTr = document.createElement("tr");

        const createTd1 = document.createElement("td");
        createTd1.className = 'sr-no';

        const createTd2 = document.createElement("td");
        createTd2.id = "todo" + items[i].value.index;

        const createTd3 = document.createElement("td");
        createTd3.id = "status" + items[i].value.index;

        const createTd4 = document.createElement("td");
        createTd4.classList = "tdCheckboxDelete"

        const createTextSrNo = document.createTextNode(items[i].value.index);
        const createTextToDo = document.createTextNode(items[i].value.todo);
        const createTextStu = document.createTextNode(items[i].value.status);

        const createInputRad = document.createElement("input");
        createInputRad.type = "checkbox";
        createInputRad.className = "checkboxBtn";
        createInputRad.id = "complete" + items[i].value.index;
        createInputRad.name = "checkboxBtnName";
        createInputRad.onclick = function () {
            checkItem(items[i].value.index);
        }

        const spanDelete = document.createElement("span");
        spanDelete.className = "deleteBtn";
        spanDelete.id = "delete"+items[i].value.index;
        spanDelete.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        spanDelete.onclick = function ()    {
            deleteItem(items[i].value.index);
        }

        createTr.appendChild(createTd1);
        createTr.appendChild(createTd2);
        createTr.appendChild(createTd3);
        createTr.appendChild(createTd4);

        createTd1.appendChild(createTextSrNo);
        createTd2.appendChild(createTextToDo);
        createTd3.appendChild(createTextStu);
        createTd4.appendChild(createInputRad);
        createTd4.appendChild(spanDelete);

        document.getElementById('container').appendChild(createTr);

        if (items[i].value.status == "Completed")    {
            createInputRad.checked = true;
            document.getElementById("todo" + items[i].value.index).classList.toggle("active");
        }
    }
}

// working of checkbox
const checkItem = (eleId) => {
    const indexToCheck = items.findIndex(atm => atm.value.index == eleId);
    console.log(indexToCheck);
    let element = document.getElementById('complete'+eleId);
    if (element.checked) {
        let strText = document.getElementById("todo" + eleId);
        strText.classList.toggle("active")
        items[indexToCheck].value.status = "Completed";
        localStorage.setItem("todo-list", JSON.stringify(items));
        document.getElementById("status" + eleId).innerText = "Completed";
    } else {
        let strText = document.getElementById("todo" + eleId);
        strText.classList.toggle("active");
        items[indexToCheck].value.status = "Pending";
        localStorage.setItem("todo-list", JSON.stringify(items));
        document.getElementById("status" + eleId).innerText = "Pending";
    }
}

// delete function
const deleteItem = (eleId) =>{
    const indexToDlt = items.findIndex(atm => atm.value.index == eleId);
    if (indexToDlt !== -1) 
        items.splice(indexToDlt, 1);
    localStorage.setItem("todo-list", JSON.stringify(items));
    location.reload();
}

// clear all data
const clearItem = () => {
    localStorage.clear();
    location.reload();
}

const displayBoxNone = () =>{
    document.getElementById('box').style.display = 'none';
    document.getElementById('content').style.display = 'block';
}


// on pressing enter button
document.getElementById('text').addEventListener("keypress", (evt)=>{
    console.log(evt.key);
    if(evt.key === "Enter") 
        addItem();
});

// list item call function
listItem(0);
