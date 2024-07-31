import './styles.css'
import render from './modules/render'
import { showProjects, showTodos } from './modules/create'

(function() {
    render("Inbox")
    showProjects()
    showTodos()
})()