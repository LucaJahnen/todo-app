import { activeProject } from './create'
import updateTodo from './update'
import alert from '../images/alert-circle-outline.svg'
import calendar from '../images/calendar-number-outline.svg'
import { format } from 'date-fns'
import { getItem, setItem } from './localstorage'
import { deleteTodo } from './delete'

const content = document.querySelector("#content")

const todos = {
    "Today": [],
    "Inbox": [
        {
            "title": "Clean the kitchen",
            "description": "Pick up the dishes and clean the sink.",
            "duedate": "2024-01-20",
            "priority": "high",
            "notes": "Make sure to take out the trash too.",
            "expanded": false
        }
    ],
    "Appointments": [
        {
            "title": "Dentist Appointment",
            "description": "Routine check-up at the dentist.",
            "duedate": "2024-010-10",
            "priority": "High",
            "notes": "Prepare the insurance documents before the visit.",
            "expanded": false
        }
    ],
    "Groceries": [
        {
            "title": "Grocery Shopping",
            "description": "Buy groceries for the upcoming week.",
            "duedate": "2024-08-01",
            "priority": "Medium",
            "notes": "Check for discounts and offers on the grocery store app.",
            "expanded": false
        }
    ]
}

const createTodo = (text, element = "p", target = content) => {
    const tag = document.createElement(element)
    tag.textContent = text
    target.appendChild(tag)
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
        const storageTodos = getItem("todos")
        storageTodos[activeProject][index].expanded = true
        setItem("todos", storageTodos)
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
        deleteTodo(index, title, duedate)
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
        const storageTodos = getItem("todos")
        storageTodos[activeProject][index].expanded = false
        setItem("todos", storageTodos)
        render(activeProject)
    })
    buttonSection.appendChild(buttonMinimize)
    section.appendChild(buttonSection)

    content.appendChild(section)
}

const render = name => {
    content.innerHTML = `<h1>${name}</h1>`

    const data = getItem("todos") === null ? todos : getItem("todos")
    getItem("todos") === null && setItem("todos", todos)

    data[name].map((todo, index) => {
        if(todo?.expanded && todo != null) {
            renderDetailedTodo(todo, index)
        } else if(todo != null) {
            renderTodo(todo, index)
        }
    })

    if(getItem("todos")[name]?.length == 0) {
        content.innerHTML =`<h1>${name}</h1><p>No todos in this project.</p>`
    }
}

export default render