import './styles.css'
import './modules/create'
import { setItem, getItem } from './modules/localstorage'
import render from './modules/render'
import { showProjects } from './modules/create'
import add from './images/add-outline.svg'
import menu from './images/menu-outline.svg'

// display plus icon next to add task and add project button
(function() {
    const img = new Image()
    img.src = add
    img.classList.add("add-icon")
    document.querySelector(".task-button").insertAdjacentElement("afterbegin", img)

    const img2 = new Image()
    img2.src = add
    img2.classList.add("add-icon")
    document.querySelector(".project-button").insertAdjacentElement("afterbegin", img2)

    const menuImg = new Image()
    menuImg.src = menu
    document.querySelector(".navbar button").appendChild(menuImg)
})()

export let activeProject = "Inbox"

export const todos = {
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
    "Today": [],
    "Fitness": [
        {
            "title": "Do pushups",
            "description": "I want to do at least 100 push ups to become healthier.",
            "duedate": "2024-07-30",
            "priority": "medium",
            "notes": "Push ups are hard but I want to practice.",
            "expanded": false
        }
    ],
    "Groceries": [
        {
            "title": "Buy food",
            "description": "I want to do at least 100 push ups to become healthier.",
            "duedate": "2024-08-01",
            "priority": "high",
            "notes": "Push ups are hard but I want to practice.",
            "expanded": false
        }
    ]
}

render("Inbox")
showProjects()

export const showForm = (formElement, visible) => {
    if(visible) {
        formElement.style.visibility = "visible"
        formElement.style.zIndex = "999"
    } else {
        formElement.style.visibility = "hidden"
        formElement.style.zIndex = "-1"
    }
}

// display tasks listed in project when user clicks on sidebar
export const showTodos = () => {
    const projectsContentButtons = document.querySelectorAll("#projects-content .project-title")
    const showInbox = document.querySelector(".show-inbox")
    const showToday = document.querySelector(".show-today")
    const buttons = [...projectsContentButtons, showInbox, showToday]

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            activeProject = button.textContent
            const dueToday = []
            const today = new Date().toISOString().slice(0, 10)
            if(button.textContent === "Today") {
                Object.keys(todos).map(todo => {
                    todos[todo].map(task => {
                        if(task.duedate === today && !dueToday.includes(task)) {
                            dueToday.push(task)
                        }
                    })
                })
                todos["Today"] = dueToday
            }
            render(button.textContent)
        })
    })
}
showTodos()