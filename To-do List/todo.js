// JavaScript source code
//photo link->https://unsplash.com/photos/ODjh4MU7JrE
//Selectors
const inp = document.querySelector('.todo-input');
const but = document.querySelector('.todo-button');
const list = document.querySelector(".todo-list");
const vanish = document.querySelector(".init-text");
const addagain = vanish;
var count = 0;
const right = document.querySelector(".right-rect");
const drop = document.querySelector('.dropdown');
var alle = document.getElementById('all');
const todo1 = document.querySelector('.todo');
const dropbtn = document.querySelector('.dropbtn');
console.log(list);

//Event Listeners
but.addEventListener('click', addToDo);
list.addEventListener('click', deleteCheck);
document.addEventListener('DOMContentLoaded', getTodos);

drop.addEventListener('click', filterone);
window.addEventListener('load', about);

//Funtions
function addToDo(event) {
    //prevents form from submitting
    event.preventDefault();
    //creates div element

    console.log("input value=" + inp.value.length);
    if (inp.value.length == 0) {
        console.log("here");
        window.alert("Enter a task to proceed");
    }
    else {
        const divelem = document.createElement('div');
        divelem.classList.add('todo'); //assigns class name

        //create list element
        const lielem = document.createElement('li');
        lielem.textContent = inp.value;
        lielem.classList.add('todoli');
        divelem.appendChild(lielem);

        //create buttons
        const checkbtn = document.createElement('button');
        checkbtn.innerHTML = '<i class="fas fa-check"></i>';//adds an html tag instead of simple text
        checkbtn.classList.add('checked-btn');
        divelem.appendChild(checkbtn);

        const delbtn = document.createElement('button');
        delbtn.innerHTML = '<i class="fas fa-trash"></i>';//adds an html tag instead of simple text
        delbtn.classList.add('deleted-btn');
        divelem.appendChild(delbtn);

        list.appendChild(divelem);
        //add todo to local storage
        saveLocalTodos(inp.value);

        //clear after adding input

        inp.value = "";
        vanish.remove();
    }

}

function deleteCheck(event) {
    const item = event.target; //targets whatever item we are clicking on
    
    

    if (item.classList[0] === 'deleted-btn') {
        console.log("delete button clicked");
        const del = item.parentElement;
        var par = del.parentElement;
        var x = par.childElementCount;
        console.log(par);
        console.log(x);
        //Animation added here
        del.classList.add('fall');
        removeLocalTodos(del);
        //this event waits until the transition is completed
        del.addEventListener('transitionend', function () {
            del.remove();
            if (x == 1) {
                right.appendChild(addagain);
                console.log("there are 0 elems");
            }
        });
        
        
    }

    if (item.classList[0] === 'checked-btn') {
        
        const check = item.parentElement;
        check.classList.toggle('completed');
        console.log(check);

    }
}





function filterone(e) {
    console.log('count=' + count);
    const todos = list.childNodes;

    //todos.shift();
    console.log(typeof (todos));
    console.log('list=' + list);
    console.log('completed check' + list.classList.contains('completed'));
    const myNodeList = list.childNodes;

    const [head, ...tail] = myNodeList;

    console.log('the first item: ', head);

    console.log('the remaining items: ', tail);
    console.log("complete todos" + todos);
  
    tail.forEach(function (todo) {
        switch (e.target.id) {
            case 'all':
                dropbtn.textContent = "All tasks";
                todo.style.display = 'flex';
                break;
            case 'comp':
                if (todo.classList.contains('completed')) {
                    dropbtn.textContent = "Completed tasks";
                    todo.style.display = 'flex';
                    console.log('flex');
                }
                else {
                   
                    todo.style.display = 'none';
                    console.log('none');
                }
                break;
            case 'incomp':
                if (!todo.classList.contains('completed')) {
                    dropbtn.textContent = "Tasks to be completed";
                    todo.style.display = 'flex';
                    console.log('flex');
                }
                else {
                    todo.style.display = 'none';
                    console.log('none');
                }
                
                break;
        }
    });
}



        
    
function saveLocalTodos(todo) {
    //checking for to dos
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    if (todos.length > 0) {
        //console.log("sahi jagah");
        vanish.remove();
    }

    todos.forEach(function (todo){
        const divelem = document.createElement('div');
        divelem.classList.add('todo'); //assigns class name

        //create list element
        const lielem = document.createElement('li');
        lielem.innerText = todo;
        lielem.classList.add('todoli');
        divelem.appendChild(lielem);

        //create buttons
        const checkbtn = document.createElement('button');
        checkbtn.innerHTML = '<i class="fas fa-check"></i>';//adds an html tag instead of simple text
        checkbtn.classList.add('checked-btn');
        divelem.appendChild(checkbtn);

        const delbtn = document.createElement('button');
        delbtn.innerHTML = '<i class="fas fa-trash"></i>';//adds an html tag instead of simple text
        delbtn.classList.add('deleted-btn');
        divelem.appendChild(delbtn);

        list.appendChild(divelem);
    });
}


function removeLocalTodos(todo) {
    if (localStorage.getItem('todos') === null) {
        todos = [];
        console.log("if one");
    }
    else {
        
        todos = JSON.parse(localStorage.getItem('todos'));
        console.log("if two");
    }
    
   
    const todoind = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoind), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function about() {
    window.alert(" About Project: \n A simple to-do list which stores the tasks on the Local Storage.\n Press OK to view the project!");
}