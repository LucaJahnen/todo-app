import './styles.css'

const todos = {
    "Fitness": [
        {
            "title": "Do pushups",
            "description": "A want to do at least 100 push ups to become healthier.",
            "duedate": "2024-01-08",
            "priority": "medium",
            "notes": "Push ups are hard but I want to practice."
        }
    ],
    "Groceries": [
        {
            "title": "Buy food",
            "description": "A want to do at least 100 push ups to become healthier.",
            "duedate": "2024-28-07",
            "priority": "high",
            "notes": "Push ups are hard but I want to practice."
        }
    ]
}

const todo = (title, description, duedate, priority, notes) => {
    return { title, description, duedate, priority, notes }
}

const form = document.querySelector("form")
const projects = document.querySelector("#projects")

for(const project in todos) {
    const option = document.createElement("option")
    option.value = project
    option.textContent = project
    projects.appendChild(option)
}

form.addEventListener("submit", e => {
    e.preventDefault()
    const name = document.querySelector("#title").value
    const description = document.querySelector("#description").value
    const duedate = document.querySelector("#duedate").value
    const priority = document.querySelector("#priority").value
    const notes = document.querySelector("#notes").value
    // const project = document.querySelector("#projects").value
    const newTodo = todo(name, description, duedate, priority, notes)
    console.log(newTodo)
})