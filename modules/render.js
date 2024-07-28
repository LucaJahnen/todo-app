import { todos, activeProject } from '../main'
import updateTodo from './update'
import alert from '../images/alert-circle-outline.svg'
import calendar from '../images/calendar-number-outline.svg'

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
        createTodo(title, "h2", section)

        createTodo(description,"p", section)
        const notesElement = document.createElement("h3")
        notesElement.classList.add("notes-heading")
        notesElement.textContent = "Notes"
        section.appendChild(notesElement)
        createTodo(notes,"p", section)
        const wrapper = document.createElement("div")
        wrapper.classList.add("wrapper")
        const calendarImg = new Image()
        calendarImg.src = calendar
        wrapper.appendChild(calendarImg)
        const duedateElement = document.createElement("p")
        duedateElement.innerHTML = `Due on <span>${duedate}</span>`
        wrapper.appendChild(duedateElement)
        section.appendChild(wrapper)

        const priorityWrapper = document.createElement("div")
        priorityWrapper.classList.add("wrapper")
        const priorityImg = new Image()
        priorityImg.src = alert
        priorityWrapper.appendChild(priorityImg)
        const priorityElement = document.createElement("p")
        priorityElement.innerHTML = `Priority: <span>${priority}</span>`
        priorityWrapper.appendChild(priorityElement)
        section.appendChild(priorityWrapper)

        const buttonSection = document.createElement("div")
        buttonSection.classList.add("todo-buttons")
        const buttonDel = document.createElement("button")
        buttonDel.innerHTML = "Mark as done"
        buttonDel.classList.add("button-delete")
        buttonDel.addEventListener("click", () => {
            deleteTodo(todos[name], index)
            render(activeProject)
        })
        buttonSection.appendChild(buttonDel)
        const buttonUpd = document.createElement("button")
        buttonUpd.textContent = "Update todo"
        buttonUpd.classList.add("button-update")
        buttonUpd.addEventListener("click", () => {
            updateTodo(index)
        })
        buttonSection.appendChild(buttonUpd)
        section.appendChild(buttonSection)

        content.appendChild(section)
    })
}

export default render