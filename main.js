import './styles.css'
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

let activeProject = "Inbox"

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

const renderProject = ({ title, description, priority, duedate, notes }, index) => {
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
        deleteTodo(todos[button.textContent], index)
        renderTodoProject(activeProject)
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
}

const renderTodoProject = (projectName, index) => {
    content.innerHTML = ""
    const heading = document.createElement("h1")
    heading.textContent = projectName
    content.appendChild(heading)

    todos[projectName].map(project => {
        renderProject(project, index)
    })
}

const deleteTodo = (parent, index) => {
    parent.splice(index, 1)
}

const deleteProject = (project) => {
    delete todos[project]
    render("Inbox")
    showProjects()
}

const createTodo = (text, element = "p", target = content) => {
    const tag = document.createElement(element)
    tag.textContent = text
    target.appendChild(tag)
}

const content = document.querySelector("#content")
/* const renderTodos = list => {
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
} */

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
            deleteTodo(todos[button.textContent], index)
            renderTodoProject(activeProject, index)
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