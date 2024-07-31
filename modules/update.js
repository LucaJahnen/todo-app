import { showForm, activeProject, todos } from "../main"
import { handleTodoSubmit } from './create'
import render from './render'
import { setItem, getItem } from "./localstorage"

const updateForm = document.querySelector(".update-todo")
const handleUpdateSubmit = (e, index) => {
    e.preventDefault()

    if(updateForm.querySelector("#projects").value != activeProject) {
        const storageTodos = getItem("todos")
        delete storageTodos[activeProject][index]
        setItem("todos", storageTodos)
    }

    content.innerHTML = ""
    const { project, newTodo } = handleTodoSubmit(updateForm, e)
    const storageTodos = getItem("todos")
    storageTodos[project][index] = newTodo
    setItem("todos", storageTodos)
    render(project)
}

const updateTodo = (index) => {
    showForm(updateForm, true)

    const storageTodos = getItem("todos")
    updateForm.querySelector("#title").value = storageTodos[activeProject][index].title
    updateForm.querySelector("#description").value = storageTodos[activeProject][index].description
    updateForm.querySelector("#notes").value = storageTodos[activeProject][index].notes
    updateForm.querySelector("#duedate").value = storageTodos[activeProject][index].duedate
    
    const priorityOptions = [...updateForm.querySelectorAll("#priority option")]
    priorityOptions.map(option => {
        if(option.value === storageTodos[activeProject][index].priority) {
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