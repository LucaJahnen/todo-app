import './styles.css'
import render from './modules/render'
import add from './images/add-outline.svg'
import trash from './images/trash-outline.svg'

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
    "Inbox": [
        {
            "title": "Clean the kitchen",
            "description": "Pick up the dishes and clean the sink.",
            "duedate": "2024-01-20",
            "priority": "high",
            "notes": "Make sure to take out the trash too."
        }
    ],
    "Today": [],
    "Fitness": [
        {
            "title": "Do pushups",
            "description": "I want to do at least 100 push ups to become healthier.",
            "duedate": "2024-07-29",
            "priority": "medium",
            "notes": "Push ups are hard but I want to practice."
        }
    ],
    "Groceries": [
        {
            "title": "Buy food",
            "description": "I want to do at least 100 push ups to become healthier.",
            "duedate": "2024-08-01",
            "priority": "high",
            "notes": "Push ups are hard but I want to practice."
        }
    ]
}
render("Inbox")

const todo = (title, description, duedate, priority, notes) => {
    return { title, description, duedate, priority, notes }
}

// show projects on sidebar
const todoForm = document.querySelector(".add-todo")
const projects = [...document.querySelectorAll("#projects")]
const projectsContent = document.querySelector("#projects-content")
const showProjects = () => {
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
showProjects()

const deleteProject = (project) => {
    delete todos[project]
    render("Inbox")
    showProjects()
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

export const showForm = (formElement, visible) => {
    if(visible) {
        formElement.style.visibility = "visible"
        formElement.style.zIndex = "999"
    } else {
        formElement.style.visibility = "hidden"
        formElement.style.zIndex = "-1"
    }
}

export const resetForm = formElement => {
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

const projectForm = document.querySelector(".add-project")
projectForm.addEventListener("submit", e => {
    e.preventDefault()
    const projectName = document.querySelector("#project-name").value
    todos[projectName] = []
    render(projectName)
    showProjects()
    showForm(projectForm, false)
    showTodos()
})

// display tasks listed in project when user clicks on sidebar
const showTodos = () => {
    const projectsContentButtons = document.querySelectorAll("#projects-content .project-title")
    const showInbox = document.querySelector(".show-inbox")
    const showToday = document.querySelector(".show-today")
    const buttons = [...projectsContentButtons, showInbox, showToday]

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            activeProject = button.textCo
            const dueToday = []
            const today = new Date().toISOString().slice(0, 10)
            if(button.textContent === "Today") {
                Object.keys(todos).map(todo => {
                    todos[todo].map(task => {
                        if(task.duedate === today) {
                            dueToday.push(task)
                        }
                    })
                })
                todos["Today"] = dueToday
                console.log(dueToday)
            }
            render(button.textContent)
            dueToday.length = 0
        })
    })
}
showTodos()

const handleAddSubmit = e => {
    content.innerHTML = ""
    const { project, newTodo } = handleTodoSubmit(todoForm, e)
    todos[project].push(newTodo)
    render(project)
}

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