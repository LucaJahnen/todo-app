import { todos } from './main'
import { activeProject } from './main'
import trash from './images/trash-outline.svg'
import pencil from './images/pencil-outline.svg'

const content = document.querySelector("#content")

const createTodo = (text, element = "p", target = content) => {
    const tag = document.createElement(element)
    tag.textContent = text
    target.appendChild(tag)
}

const deleteTodo = (parent, index) => {
    parent.splice(index, 1)
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