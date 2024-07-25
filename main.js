import './styles.css'
import { format } from 'date-fns'
import add from './images/add-outline.svg'

(function() {
    const img = new Image()
    img.src = add
    img.classList.add("add-icon")
    document.querySelector(".task-button").insertAdjacentElement("afterbegin", img)
    // document.querySelector(".project-button").insertAdjacentElement("afterbegin", img)
})()

const todos = {
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

        const button = document.createElement("button")
        button.textContent = project
        projectsContent.appendChild(button)
    }
}
showProjects()

const deleteTodo = (parent, index) => {
    parent.splice(index, 1)
    renderTodos(todos)
}

const deleteProject = (project) => {
    delete todos[project]
    renderTodos(todos)
    showProjects()
}

const createTodo = (text, element = "p") => {
    const tag = document.createElement(element)
    tag.textContent = text
    content.appendChild(tag)
}

const content = document.querySelector("#content")
const renderTodos = list => {
    content.innerHTML = ""
    
    for(const project in list) {
        const title = document.createElement("h1")
        title.textContent = project
        content.appendChild(title)
        const buttonDeleteProject = document.createElement("button")
        buttonDeleteProject.textContent = "Delete Project"
        buttonDeleteProject.addEventListener("click", () => deleteProject(project))
        content.appendChild(buttonDeleteProject)
        
        list[project].map(({ title, description, duedate, priority, notes }, index) => {
            createTodo(title, "h2")
            createTodo(description)
            createTodo(duedate)
            createTodo(priority)
            createTodo(notes)
            const buttonDelete = document.createElement("button")
            buttonDelete.textContent = "Delete"
            buttonDelete.addEventListener("click", () => deleteTodo(list[project], index))
            content.appendChild(buttonDelete)
            const buttonUpdate = document.createElement("button")
            buttonUpdate.textContent = "Update"
            content.appendChild(buttonUpdate)
        })
    }
}
renderTodos(todos)

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
    renderTodos(todos)
    form.style.visibility = "hidden"
    form.style.zIndex = "-1"
})

const projectForm = document.querySelector(".add-project")
projectForm.addEventListener("submit", e => {
    e.preventDefault()
    const projectName = document.querySelector("#project-name").value
    todos[projectName] = []
    renderTodos(todos)
    showProjects()
    projectForm.style.visibility = "hidden"
    projectForm.style.zIndex = "-1"
})

const projectsContentButtons = document.querySelectorAll("#projects-content button")
projectsContentButtons.forEach(button => {
    button.addEventListener("click", () => {
        content.innerHTML = `<h1>${button.textContent}</h1>`

        todos[button.textContent].map(({ title, description, duedate, priority, notes }) => {
            createTodo(title, "h2")
            createTodo(description)
            createTodo(duedate)
            createTodo(priority)
            createTodo(notes)
        })
    })
})

const taskButton = document.querySelector(".task-button")
const projectButton = document.querySelector(".project-button")
taskButton.addEventListener("click", () => {
    form.style.visibility= "visible"
    form.style.zIndex = "999"
})
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