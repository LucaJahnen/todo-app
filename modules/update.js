import { showForm, activeProject, todos } from "../main"
import { handleTodoSubmit } from './create'
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
    showForm(updateForm, true)

    updateForm.querySelector("#title").value = todos[activeProject][index].title
    updateForm.querySelector("#description").value = todos[activeProject][index].description
    updateForm.querySelector("#notes").value = todos[activeProject][index].notes
    updateForm.querySelector("#duedate").value = todos[activeProject][index].duedate
    
    const priorityOptions = [...updateForm.querySelectorAll("#priority option")]
    priorityOptions.map(option => {
        if(option.value === todos[activeProject][index].priority) {
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