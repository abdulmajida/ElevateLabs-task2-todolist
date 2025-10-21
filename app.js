// document.addEventListener('DOMContentLoaded', () => {
//     const storedTasks = JSON.parse(localStorage.getItem('tasks'))

//     if(storedTasks){
//         storedTasks.forEach((task)=>task.push(task))
//         updateTaskList()
//         updateState()   
        
    
// };

document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (storedTasks && storedTasks.length > 0) {
        task = storedTasks;  
        updateTaskList();
        updateState();
        
    }
});




let task=[];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(task));
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if(text){
        task.push({text: text, completed: false});
        taskInput.value = '';
        updateTaskList();
        updateState();
        saveTasks();
    }
        

    
};

const toggleTastCompletion = (index) => {
    task[index].completed = !task[index].completed;
    updateTaskList();
    updateState()
    saveTasks();
};

const deleteTask = (index) => {
    task.splice(index,1);
    updateTaskList();
    updateState();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = task[index].text;

    task.splice(index,1);
    updateTaskList();
    updateState();
    saveTasks();
};

// const updateState = () => {
//     const completeTasks = task.filter(task => task.completed).length;
//     const totalTasks = task.length;
//     const progress=(completeTasks/totalTasks)*100;
//     const progressBar = document.getElementById('progress');

//     progressBar.style.width = $`{progress}`
// }

const updateState = () => {
    const completeTasks = task.filter(task => task.completed).length;
    const totalTasks = task.length;
    const progressBar = document.getElementById('progress');

    const progress = totalTasks ? (completeTasks / totalTasks) * 100 : 0;

    progressBar.style.width = progress + '%';

    document.getElementById('number').innerText = `${completeTasks} / ${totalTasks}`;
};



const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    task.forEach((task,index)=>{
        const listItem = document.createElement('li');

        listItem.innerHTML =`
        <div class="taskItem">
            <div class="task ${task.completed? "completed":""}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : "" }/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./edit.png" onClick="editTask(${index})"/>
                <img src="./bin.png" onClick="deleteTask(${index})"/>
            </div>
        </div>
        
        
        `;
        listItem.addEventListener('change',()=>toggleTastCompletion(index));


        taskList.append(listItem);
    });
};


document.getElementById('newtask').addEventListener('click', function(e){
    e.preventDefault();

    addTask();
});
