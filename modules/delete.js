import { getItem, setItem } from "./localstorage"
import render from "./render"
import { activeProject } from "./create"
import { showProjects, showTodos } from "./create"

export const deleteTodo = (index, title, duedate) => {
    const newTodos = getItem("todos")
    newTodos[activeProject].splice(index, 1)
    setItem("todos", newTodos)

    if(activeProject === "Today") {
        const storageTodos = getItem("todos")
        for(const project in storageTodos) {
            storageTodos[project].map((todo, index) => {
                if(todo.title === title && todo.duedate === duedate) {
                    storageTodos[project].splice(index, 1)
                    setItem("todos", storageTodos)
                }
            })
        }
    }

    render(activeProject)
}

export const deleteProject = (project) => {
    const storageTodos = getItem("todos")
    delete storageTodos[project]
    setItem("todos", storageTodos)
    render("Inbox")
    showProjects()
    showTodos()
}