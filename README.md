# Todo List Challenge - TheOdinProject
This is my solution to the [Todo List Challenge](https://www.theodinproject.com/lessons/node-path-javascript-todo-list) provided by [TheOdinProject](https://TheOdinProject.com).

## The challenge
The Challenge was to create a Todo List that lets users create projects and tasks. Users should be able to view the tasks in each project and delete them. Addiotionally, projects and tasks should be saved to localstorage so when the page is refreshed the data does not change.

## Built with
- [webpack](https://webpack.js.org/)
  - [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)
  - [style-loader](https://webpack.js.org/loaders/style-loader/)
- [date-fns](https://date-fns.org/)

## My Process
As mentioned previously, one task was to save the todos to localstorage. I achieved this by creating a dedicated file that only handles data exchange with localstorage. It looks like this:

```js
export const setItem = (key, item) => {
    localStorage.setItem(key, JSON.stringify(item))
}

export const getItem = key => {
    return JSON.parse(localStorage.getItem(key))
}
```

## Assets
- [Ionicons](https://ionic.io/ionicons): An icon library developed by the Ionic Framework team
- [Poppins from Google Fonts](https://fonts.google.com/specimen/Poppins): A sans-serif typeface designed by Indian Type Foundry (ITF)

## Design Inspiration
I created an account at [Todoist](https://todoist.com/) and used their service to clarify what I wanted to build. Their design looks pretty cool and I enjoyed using their service. Additionally, I used [Galileo AI](https://www.usegalileo.ai/explore) to design the cards for mobile.
