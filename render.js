import { todos, activeProject, showForm } from './main'
import trash from './images/trash-outline.svg'
import pencil from './images/pencil-outline.svg'
import { format } from 'date-fns'

const content = document.querySelector("#content")
const todoForm = document.querySelector(".add-todo")

const createTodo = (text, element = "p", target = content) => {
    const tag = document.createElement(element)
    tag.textContent = text
    target.appendChild(tag)
}

const deleteTodo = (parent, index) => {
    parent.splice(index, 1)
}

const updateTodo = (index) => {
    const todoCards = document.querySelectorAll(".todo-card")
    showForm(todoForm, true)
    todoForm.querySelector("#title").value = todoCards[index].querySelector("h2").textContent
    todoForm.querySelector("#description").value = todoCards[index].querySelectorAll("p")[0].textContent
    todoForm.querySelector("#notes").value = todoCards[index].querySelectorAll("p")[1].textContent
    todoForm.querySelector("#duedate").value = format(todoCards[index].querySelectorAll("p")[2].textContent, "yyyy-MM-dd")
    const priorityOptions = [...todoForm.querySelectorAll("#priority option")]
    priorityOptions.map(option => {
        if(option.value === todoCards[index].querySelectorAll("p")[3].textContent) {
            option.selected = true
        }
    })
    const projectOptions = [...todoForm.querySelectorAll("#projects option")]
    projectOptions.map(option => {
        if(option.value === activeProject) {
            option.selected = true
        }
    })
}

const render = name => {
    content.innerHTML = `<h1>${name}</h1>`

    todos[name].map(({ title, description, duedate, priority, notes }, index) => {
        const section = document.createElement("section")
        const column = document.createElement("div")
        column.classList.add("column")
        section.classList.add("todo-card")
        createTodo(title, "h2", column)

        const buttonDiv = document.createElement("div")
        const buttonDelete = document.createElement("button")
        const imgTrash = new Image()
        imgTrash.src = trash
        buttonDelete.appendChild(imgTrash)
        buttonDelete.addEventListener("click", () => {
            deleteTodo(todos[name], index)
            render(activeProject)
        })
        buttonDiv.appendChild(buttonDelete)
        const buttonUpdate = document.createElement("button")
        const imgPencil = new Image()
        imgPencil.src = pencil
        buttonUpdate.appendChild(imgPencil)
        buttonUpdate.addEventListener("click", () => {
            updateTodo(index)
        })
        buttonDiv.appendChild(buttonUpdate)
        column.appendChild(buttonDiv)
        section.appendChild(column)

        createTodo(description,"p", section)
        createTodo(notes,"p", section)
        const wrapper = document.createElement("div")
        wrapper.classList.add("wrapper")
        createTodo(duedate, "p", wrapper)
        const priorityImg = document.createElement("div")
        priorityImg.style.borderRadius = "50%"
        priorityImg.style.width = "16px"
        priorityImg.style.height = "16px"

        const possibilites = {
            "high": "#D2222D",
            "medium": "#FFBF00",
            "low": "#238823"
        }
        priorityImg.style.backgroundColor = possibilites[priority]
        const priorityElement = document.createElement("div")
        priorityElement.classList.add("priority-wrapper")
        priorityElement.innerHTML = `<p>${priority}</p>`
        priorityElement.insertAdjacentElement("afterbegin", priorityImg)
        wrapper.appendChild(priorityElement)
        section.appendChild(wrapper)

        content.appendChild(section)
    })
}

export default render