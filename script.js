const taskInput = document.getElementById("task-input")
const addTaskBtn = document.getElementById("add-task-btn")
const todoList = document.getElementById("todo-list")
const inProgressList = document.getElementById("in-progress-list")
const completedList = document.getElementById('completed-list')

let draggeedItem = null

addTaskBtn.addEventListener('click', addtask)

function addtask(){
    const taskText = taskInput.value.trim()
    if (taskText){
        const taskItem = createTaskElement(taskText) 
        todoList.appendChild(taskItem)
    }
}

function createTaskElement(taskText){
    const taskItem = document.createElement('li')
    taskItem.textContent = taskText
    taskItem.setAttribute('draggable', 'true')
    taskItem.addEventListener('dragstart' , () =>{
        draggeedItem = taskItem
    })
    taskItem.addEventListener("dragend", ()=>{
        draggeedItem = null
    })


    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.addEventListener('click', () => taskItem.remove())

    taskItem.appendChild(deleteBtn)
    return taskItem
}

const lists =[ todoList, inProgressList, completedList]
lists.forEach((element) => {
    element.addEventListener('dragover',(e) => e.preventDefault() )

    element.addEventListener('drop', () => {
        if(draggeedItem){
            element.appendChild(draggeedItem)
            
        }
    })
})