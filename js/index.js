// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST, id;

// update date automatically
const dateElement = document.getElementById("date");
const options = {
  weekday: "long",
  month: "short",
  day: "numeric"
};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//reset content
const reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  console.log(LIST);
  if (list.innerHTML !== "") {
    list.innerHTML = "";
  } else {
    alert("Your Todo is empty :)");
  }
  localStorage.clear("ToDo");

  LIST.length = 0;
  console.log(LIST);
});

// Add Todo function
const list = document.querySelector(".list");
function addTodo(todo, id, status, trash) {
  if (trash) {
    return;
  }

  const STATUS = status ? CHECK : UNCHECK; // this checks if the todo is completed or not updates the status
  const LINE = status ? LINE_THROUGH : ""; // this checks if the todo is completed or not updates the text property

  const addTodo = `<li class="item">
                    <i class="fa ${STATUS} co" status="complete" id=${id}></i>
                    <p class="text ${LINE}">${todo}</p>
                    <i class="fa fa-trash-o de" status="delete" id=${id}></i>
                  </li>`;
  const position = "beforeend";
  list.insertAdjacentHTML(position, addTodo);
}

// check and reload the previous todo else start the session
let data = localStorage.getItem("ToDo");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  for (let i = 0; i < id; i++) {
    if (LIST[i] == null) {
      continue;
    } else {
      addTodo(LIST[i].name, LIST[i].id, LIST[i].status, LIST[i].trash);
    }
  }
} else {
  LIST = [];
  id = 0;
}

// this adds the todo to the list

const submitButton = document.getElementById("sub");
submitButton.addEventListener("click", () => {
  let todo = document.getElementById("todo");
  if (todo.value) {
    addTodo(todo.value, id, false, false);
    // this stores the array of objects
    LIST.push({ name: todo.value, id: id, status: false, trash: false });
    localStorage.setItem("ToDo", JSON.stringify(LIST));
    id++;
  } else {
    alert("Cannot insert a empty ToDo");
  }
  todo.value = "";
  console.log(LIST);
});

//this adds the todo to the list when enter is pressed
document.addEventListener("keyup", function(event) {
  if (event.keyCode == 13) {
    if (todo.value) {
      addTodo(todo.value, id, false, false);
      // this stores the array of objects
      LIST.push({ name: todo.value, id: id, status: false, trash: false });
      localStorage.setItem("ToDo", JSON.stringify(LIST));
      id++;
    } else {
      alert("Cannot insert a empty ToDo");
    }
    todo.value = "";
    console.log(LIST);
  }
});

// function to complete todo

function completeTodo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  LIST[element.id].status = LIST[element.id].status ? false : true;
}

function removeTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  localStorage.removeItem(element.id);
  --id;
}

list.addEventListener("click", function(event) {
  const element = event.target;
  const elementJOB = element.attributes.status.value;
  let elementID = element.attributes.id.value;
  console.log("TCL: elementID", elementID);
  if (elementJOB == "complete") {
    completeTodo(element);
    let completeData = JSON.parse(localStorage.getItem("ToDo"));
    for (let i = 0; i < completeData.length; i++) {
      if (!completeData[i]) {
        continue;
      } else if (completeData[i].id == elementID) {
        if (LIST[i].status == "true") {
          LIST[i].status = "false";
        } else if (LIST[i].status == "false") {
          LIST[i].status = "true";
        }
      }
    }
    localStorage.setItem("ToDo", JSON.stringify(LIST));
  } else if (elementJOB == "delete") {
    removeTodo(element);
    let completeData = JSON.parse(localStorage.getItem("ToDo"));
    for (let i = 0; i < completeData.length; i++) {
      if (!completeData[i]) {
        continue;
      } else if (completeData[i].id == elementID) {
        console.log(LIST[i]);
        delete LIST[i];
        localStorage.setItem("ToDo", JSON.stringify(LIST));
      }
    }
  }
});

console.log(LIST);
