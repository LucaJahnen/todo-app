import { showForm, todos } from "../main"
import render from "./render"
import trash from '../images/trash-outline.svg'

const todoForm = document.querySelector(".add-todo")
const projectForm = document.querySelector(".add-project")

const resetForm = formElement => {
    formElement.querySelector("h1").textContent = "Add a todo"
    formElement.querySelectorAll("button")[1].textContent = "Add a todo"

    const textInputs = [...formElement.querySelectorAll("input[type='text']")]
    textInputs.map(input => {
        if(input) {
            input.value = ""
        }
    })
    const dateInput = formElement.querySelector("input[type='date']")
    if(dateInput) {
        dateInput.value = ""
    }
    const selectInputs = [formElement.querySelector("#priority option"), formElement.querySelector("#projects option")]
    selectInputs.map(option => {
        if(option) {
            option.selected = true
        }
    })
}

const handleAddSubmit = e => {
    content.innerHTML = ""
    const { project, newTodo } = handleTodoSubmit(todoForm, e)
    todos[project].push(newTodo)
    render(project)
}

const todo = (title, description, duedate, priority, notes) => {
    return { title, description, duedate, priority, notes }
}

export const handleTodoSubmit = (formElement, e) => {
    e.preventDefault()
    const name = formElement.querySelector("#title").value
    const description = formElement.querySelector("#description").value
    const duedate = formElement.querySelector("#duedate").value
    const priority = formElement.querySelector("#priority").value
    const notes = formElement.querySelector("#notes").value
    const project = formElement.querySelector("#projects").value
    const newTodo = todo(name, description, duedate, priority, notes)
    showForm(formElement, false)
    return { newTodo, project }
}

const deleteProject = (project) => {
    delete todos[project]
    render("Inbox")
    showProjects()
}

// show projects on sidebar
const projects = [...document.querySelectorAll("#projects")]
const projectsContent = document.querySelector("#projects-content")
export const showProjects = () => {
    projects.map(project => {
        project.innerHTML = ""
    })
    projectsContent.innerHTML = ""

    for(const project in todos) {
        projects.map(projectElement => {
            const option = document.createElement("option")
            option.value = project
            option.textContent = project
            projectElement.appendChild(option)
        })

        if(project !== "Today" && project != "Inbox") {
            const wrapper = document.createElement("div")
            wrapper.classList.add("button-wrapper")
            const buttonText = document.createElement("button")
            buttonText.textContent = project
            buttonText.classList.add("project-title")
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

projectForm.addEventListener("submit", e => {
    e.preventDefault()
    const projectName = document.querySelector("#project-name").value
    todos[projectName] = []
    render(projectName)
    showProjects()
    showForm(projectForm, false)
    showTodos()
})

// show form to add todo
const taskButton = document.querySelector(".task-button")
taskButton.addEventListener("click", () => {
    resetForm(todoForm)
    showForm(todoForm, true)
})
todoForm.addEventListener("submit", e => handleAddSubmit(e))

const projectButton = document.querySelector(".project-button")
projectButton.addEventListener("click", () => {
    resetForm(projectForm)
    showForm(projectForm, true)
})

const cancelAddTodo = todoForm.querySelector(".cancel")
cancelAddTodo.addEventListener("click", () => {
    showForm(todoForm, false)
})

const updateForm = document.querySelector(".update-todo")
const cancelUpdateTodo = updateForm.querySelector(".cancel")
cancelUpdateTodo.addEventListener("click", () => {
    showForm(updateForm, false)
})

const cancelAddTask = projectForm.querySelector(".cancel")
cancelAddTask.addEventListener("click", () => {
    showForm(projectForm, false)
})