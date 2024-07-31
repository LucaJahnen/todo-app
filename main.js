import './styles.css'
import './modules/create'
import render from './modules/render'
import { showProjects, showTodos } from './modules/create'

(function() {
    render("Inbox")
    showProjects()
    showTodos()
})()