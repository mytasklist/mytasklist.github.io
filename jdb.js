function addtask() {
    debugger;
    var taskText = document.getElementById('task-text');
    //var taskTime = document.getElementById('task-time');
    var table = document.getElementById('list');

    if (taskText.value.length == 0 || taskText.value.length > 1024) {

        alert('plz add some task < 255 chars');
        taskText.value = null;
        return;
    }
    else {
        addToTaskList(taskText.value);
    }
}


class Task {
    constructor(idvalue, data) {
        this.taskid = idvalue;
        this.value = data;
        this.taskdate = Date.now();
    }
}

var TaskList = [];

function Load() {
    debugger;

    const existingTodos = JSON.parse(localStorage.getItem('tskMgr')) || [];
    var id = 0;
    existingTodos.forEach(todo => {
        AddToTable(todo);
    });
    TaskList = existingTodos;
}



function Rem(btn)
{
    var j1 = btn;
    debugger;
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    //TaskList.pop(parseInt(btn.name));
    var newList = TaskList.filter(t => t.taskid != btn.name);
    Sync(newList);
}

function Sync(mylist)
{
    if(mylist == null)
    {
        localStorage.setItem('tskMgr', JSON.stringify(TaskList));
    }
    else{
        localStorage.setItem('tskMgr', JSON.stringify(mylist));
    }
    //TaskList = [];
    //Load();
}

function addToTaskList(todoText,id) {

    debugger;
    var tsk = new Task(TaskList.length,todoText);
    TaskList.push(tsk);
    localStorage.setItem('tskMgr', JSON.stringify(TaskList));

    /*
    var table = document.getElementById('list');
    var rowId = table.rows.length;

    var row = table.insertRow(1);

    var cell1 = row.insertCell(0);
    cell1.setAttribute('colspan', 2);
    cell1.innerHTML = `<div id="${rowId}" class="entry">${todoText} 
        <br/>
        <span class="dtnow">${new Date()}</span>
        &nbsp;<input type="time" id="appt" class="ttimer" name="appt">                
        &nbsp;<input type='button' name="${id}" onclick= "rem(this)" class='joker' value='&#9989;'>
        </div> `;
    */
    var taskText = document.getElementById('task-text');
    taskText.value = '';

    AddToTable(tsk);
}

function AddToTable(tsk)
{
    var table = document.getElementById('list');
    var rowId = table.rows.length;

    var row = table.insertRow(1);

    var cell1 = row.insertCell(0);
    cell1.setAttribute('colspan', 2);
    cell1.innerHTML = `<div id="${rowId}" class="entry">${tsk.value} 
        <br/>
        <span class="dtnow">${tsk.taskdate}</span>

        <input type="datetime-local" id="appt" class="ttimer" name="appt">            
        &nbsp;<input type='button' name="${tsk.taskid}" onclick= "Rem(this)" class='joker' value='&#9989;'>
        </div> `;

    var taskText = document.getElementById('task-text');
    taskText.value = ''
}

//Load
Load();
