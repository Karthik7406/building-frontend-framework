const todos = ["walk the dog", "water the plants", "sand the chairs"];

const addTodoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo-btn");
const todosList = document.getElementById("todos-list");



for(const todo of todos) {
    todosList.append(renderTodoInReadMode(todo));
}


addTodoInput.addEventListener("input", () => {
    addTodoButton.disabled = addTodoInput.value.length<3
})

addTodoInput.addEventListener("keydown", ({key}) => {

    if(key=='Enter' && addTodoInput.value.length>=3) {
        addTodo()
    }
})


addTodoButton.addEventListener("click", () => {
    addTodo();
})



function renderTodoInReadMode(todo) { 

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = todo;

    span.addEventListener("dblclick", () => {
        const idx = todos.indexOf(todo);
        todosList.replaceChild(
            renderTodoInEditMode(todo),
            todosList.childNodes[idx]
        )
    })

    li.append(span);


    const button = document.createElement("button");
    button.textContent = "Done";

    button.addEventListener("click", ( ) => {

        const idx = todos.indexOf(todo);
        removeTodo(idx);
    })

    li.append(button);

    return li;
   
}

function renderTodoInEditMode(todo) {

    const li = document.createElement("li");

    const input = document.createElement("input");
    input.type = "text";
    input.value = todo; //default value
    //input.width = "100px"

    li.append(input);

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";

    saveBtn.addEventListener("click", () => {
        console.log("executing click handler");
        const idx = todos.indexOf(todo);
        updateTodo(idx, input.value);
    })

    li.append(saveBtn);


    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";

    cancelBtn.addEventListener("click", () => {
        const idx = todos.indexOf(todo);
        todosList.replaceChild(
            renderTodoInReadMode(todo),
            todosList.childNodes[idx]
        );
    })

    li.append(cancelBtn);

    return li;
}

function addTodo() {
    // yet to be implemented
    const description = addTodoInput.value;


    if(todos.includes(description)) {
        alert("Task already exists");
    }
    todos.push(description);

    const todo = renderTodoInReadMode(description);
    todosList.append(todo);

    addTodoInput.value = " ";
    addTodoButton.disabled = true;

    readTodo(description);
}

// eslint-disable-next-line
function removeTodo(index) {

    // todos.splice(index,1);
    // todosList.childNodes[index].remove();

    console.log(todosList.childNodes);
    const strikedText = renderTodoInReadModeStriked(todos[index]);
   todosList.replaceChild(strikedText, todosList.childNodes[index]);
    
}

function updateTodo(index, description) {
    todos[index] = description;
    const todo = renderTodoInReadMode(description);
    todosList.replaceChild(todo, todosList.childNodes[index]);
}



function renderTodoInReadModeStriked(todo) { 

    const li = document.createElement("li");
    const span = document.createElement("span");
    const striked = document.createElement("s");

    striked.textContent = todo;
    span.append(striked);
    li.append(span);

    return li;
}


function readTodo(description) {
    const message = new SpeechSynthesisUtterance();
    message.text = description;
    message.voice = speechSynthesis.getVoices()[0];
    speechSynthesis.speak(message);
}