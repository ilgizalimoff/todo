let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo'),
    todoList = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : []

displayMessages()

addButton.addEventListener('click', function () {
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false,
    }
    addMessage.value = ''
    todoList.push(newTodo)
    displayMessages()
    localStorage.setItem('todo', JSON.stringify(todoList))
})

function displayMessages() {
    if (todoList.length == 0) {
        todo.innerHTML = ''
    }
    let displayMessage = ''
    todoList.forEach(function (item, i) {
        displayMessage += `
            <li >
                <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
                <label class='${item.important ? 'important' : ''}'  for ='item_${i}'>${item.todo}</label>
                <button id='item_${i}' class='delete'>Delete</button>
            </li>
            `
        todo.innerHTML = displayMessage
    })
}

todo.addEventListener('change', function (e) {
    let valueLabel = todo.querySelector('[for=' +
        e.target.getAttribute('id') + ']').innerHTML
    todoList.forEach(function (item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked
            localStorage.setItem('todo', JSON.stringify(todoList))
        }
    })
})

todo.addEventListener('click', function (e) {
    let deleteValueBtn = e.target

    if (deleteValueBtn.className == 'delete') {
        let valueLabel = todo.querySelector('[for=' +
            e.target.getAttribute('id') + ']').innerHTML

        todoList = todoList.filter(function (item) {
            return item.todo !== valueLabel
        })
        
        displayMessages()
        localStorage.setItem('todo', JSON.stringify(todoList))
    }
})

todo.addEventListener('contextmenu', function (e) {
    e.preventDefault()
    todoList.forEach(function (item) {
        if (item.todo === e.target.innerHTML) {
            item.important = !item.important
            displayMessages()
            localStorage.setItem('todo', JSON.stringify(todoList))
        }
    })
})