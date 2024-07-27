import './styles.css'
import render from './render'

import { format } from 'date-fns'

import add from './images/add-outline.svg'
import trash from './images/trash-outline.svg'
import pencil from './images/pencil-outline.svg'

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
})()

export let activeProject = "Inbox"

export const todos = {
    "Inbox": [],
    "Fitness": [
        {
            "title": "Do pushups",
            "description": "I want to do at least 100 push ups to become healthier.",
            "duedate": "01.08.2024",
            "priority": "medium",
            "notes": "Push ups are hard but I want to practice."
        }
    ],
    "Groceries": [
        {
            "title": "Buy food",
            "description": "I want to do at least 100 push ups to become healthier.",
            "duedate": "01.08.2024",
            "priority": "high",
            "notes": "Push ups are hard but I want to practice."
        }
    ]
}

const todo = (title, description, duedate, priority, notes) => {
    return { title, description, duedate, priority, notes }
}

// show projects on sidebar
const form = document.querySelector(".add-todo")
const projects = document.querySelector("#projects")
const projectsContent = document.querySelector("#projects-content")
const showProjects = () => {
    projects.innerHTML = ""
    projectsContent.innerHTML = ""

    for(const project in todos) {
        const option = document.createElement("option")
        option.value = project
        option.textContent = project
        projects.appendChild(option)

        if(project != "Inbox") {
            const wrapper = document.createElement("div")
            wrapper.classList.add("button-wrapper")
            const buttonText = document.createElement("button")
            buttonText.textContent = project
            wrapper.appendChild(buttonText)

            const buttonIcon = document.createElement("button")
            buttonIcon.addEventListener("click", () => deleteProject(project))
            const Icon = new Image()
            Icon.src = trash
            buttonIcon.appendChild(Icon)
            wrapper.appendChild(buttonIcon)
            projectsContent.appendChild(wrapper)
        }
    }
}
showProjects()

const deleteProject = (project) => {
    delete todos[project]
    render("Inbox")
    showProjects()
}

form.addEventListener("submit", e => {
    e.preventDefault()
    const name = document.querySelector("#title").value
    const description = document.querySelector("#description").value
    const duedate = document.querySelector("#duedate").value
    const priority = document.querySelector("#priority").value
    const notes = document.querySelector("#notes").value
    const project = document.querySelector("#projects").value
    const newTodo = todo(name, description, format(duedate, "dd.MM.yyyy"), priority, notes)
    todos[project].push(newTodo)
    render(project)
    form.style.visibility = "hidden"
    form.style.zIndex = "-1"
})

const projectForm = document.querySelector(".add-project")
projectForm.addEventListener("submit", e => {
    e.preventDefault()
    const projectName = document.querySelector("#project-name").value
    todos[projectName] = []
    render(projectName)
    showProjects()
    projectForm.style.visibility = "hidden"
    projectForm.style.zIndex = "-1"
    showTodos()
})

render("Inbox")

// display tasks listed in project when user clicks on sidebar
const showTodos = () => {
    const projectsContentButtons = document.querySelectorAll("#projects-content button")
    const showInbox = document.querySelector(".show-inbox")
    const buttons = [...projectsContentButtons, showInbox]

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            activeProject = button.textContent
            render(button.textContent)
        })
    })
}
showTodos()

// show form to add todo
const taskButton = document.querySelector(".task-button")
taskButton.addEventListener("click", () => {
    form.style.visibility= "visible"
    form.style.zIndex = "999"
})

const projectButton = document.querySelector(".project-button")
projectButton.addEventListener("click", () => {
    projectForm.style.visibility = "visible"
    projectForm.style.zIndex = "999"
})

const cancelAddTodo = form.querySelector(".cancel")
cancelAddTodo.addEventListener("click", () => {
    form.style.visibility= "hidden"
    form.style.zIndex = "-1"
})

const cancelAddTask = projectForm.querySelector(".cancel")
cancelAddTask.addEventListener("click", () => {
    projectForm.style.visibility= "hidden"
    projectForm.style.zIndex = "-1"
})