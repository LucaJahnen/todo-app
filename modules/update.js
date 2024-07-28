import { showForm, activeProject, handleTodoSubmit, todos } from "../main"
import render from './render'

const updateForm = document.querySelector(".update-todo")
const handleUpdateSubmit = (e, index) => {
    e.preventDefault()
    content.innerHTML = ""
    const { project, newTodo } = handleTodoSubmit(updateForm, e)
    todos[project][index] = newTodo
    render(project)
}

const updateTodo = (index) => {
    const todoCards = document.querySelectorAll(".todo-card")
    showForm(updateForm, true)
    updateForm.querySelector("h1").textContent = "Update a todo"
    updateForm.querySelectorAll("button")[1].textContent = "Update a todo"

    updateForm.querySelector("#title").value = todoCards[index].querySelector("h2").textContent
    updateForm.querySelector("#description").value = todoCards[index].querySelectorAll("p")[0].textContent
    updateForm.querySelector("#notes").value = todoCards[index].querySelectorAll("p")[1].textContent
    updateForm.querySelector("#duedate").value = todoCards[index].querySelectorAll("p")[2].textContent
    const priorityOptions = [...updateForm.querySelectorAll("#priority option")]
    priorityOptions.map(option => {
        if(option.value === todoCards[index].querySelectorAll("p")[3].textContent) {
            option.selected = true
        }
    })
    const projectOptions = [...updateForm.querySelectorAll("#projects option")]
    projectOptions.map(option => {
        if(option.value === activeProject) {
            option.selected = true
        }
    })

    updateForm.addEventListener("submit", e => handleUpdateSubmit(e, index))
}

export default updateTodo