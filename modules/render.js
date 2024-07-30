import { todos, activeProject } from '../main'
import updateTodo from './update'
import alert from '../images/alert-circle-outline.svg'
import calendar from '../images/calendar-number-outline.svg'
import { format } from 'date-fns'

const content = document.querySelector("#content")

const createTodo = (text, element = "p", target = content) => {
    const tag = document.createElement(element)
    tag.textContent = text
    target.appendChild(tag)
}

const deleteTodo = (parent, index) => {
    parent.splice(index, 1)
}

const renderTodo = ({ title, duedate }, index) => {
    const section = document.createElement("section")
    section.classList.add("normal-card")
    const textWrapper = document.createElement("div")
    createTodo(title, "h2", textWrapper)
    createTodo(`Due on ${format(duedate, "E, dd MMM yyyy")}`, "p", textWrapper)
    section.appendChild(textWrapper)
    const button = document.createElement("button")
    button.textContent = "Details"
    button.addEventListener("click", () => {
        todos[activeProject][index].expanded = true
        render(activeProject)
    })
    section.appendChild(button)
    content.appendChild(section)
}

const renderDetailedTodo = ({ title, description, duedate, priority, notes }, index) => {
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
    duedateElement.innerHTML = `Due on ${format(duedate, "E, dd MMM yyyy")}`
    wrapper.appendChild(duedateElement)
    section.appendChild(wrapper)

    const priorityWrapper = document.createElement("div")
    priorityWrapper.classList.add("wrapper")
    const priorityImg = new Image()
    priorityImg.src = alert
    priorityWrapper.appendChild(priorityImg)
    const priorityElement = document.createElement("p")
    priorityElement.innerHTML = `Priority: ${priority}`
    priorityWrapper.appendChild(priorityElement)
    section.appendChild(priorityWrapper)

    const buttonSection = document.createElement("div")
    buttonSection.classList.add("todo-buttons")
    const buttonDel = document.createElement("button")
    buttonDel.innerHTML = "Mark as done"
    buttonDel.classList.add("button-delete")
    buttonDel.addEventListener("click", () => {
        deleteTodo(todos[activeProject], index)
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
    const buttonMinimize = document.createElement("button")
    buttonMinimize.textContent = "Show less"
    buttonMinimize.classList.add("button-minimize")
    buttonMinimize.addEventListener("click", () => {
        todos[activeProject][index].expanded = false
        render(activeProject)
    })
    buttonSection.appendChild(buttonMinimize)
    section.appendChild(buttonSection)

    content.appendChild(section)
}

const render = name => {
    content.innerHTML = `<h1>${name}</h1>`

    todos[name].map((todo, index) => {
        if(todo.expanded) {
            renderDetailedTodo(todo, index)
        } else {
            renderTodo(todo, index)
        }
    })
}

export default render