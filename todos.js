const fs = require('fs');
const _ = require('lodash');

const fetchTodos = () => {
    try {
        const todosString = fs.readFileSync('todos-data.json', err => {
            if (err) { console.log(err); }
        });
        return JSON.parse(todosString);
        
    } catch(e) {
        return [];
    }
};

const saveTodos = todos => {
    fs.writeFileSync('todos-data.json', JSON.stringify(todos), err => {
        if (err) { console.log(err); }
    });
};

const logTodo = (todo, message = '') => {
    console.log(`
        ${message || '-----'}
        Title: ${todo.title}
        Body: ${todo.body}
    `);
};

const addTodo = (title, body) => {
    let todos = fetchTodos();
    const todo = {
        title,
        body
    };
    const isDuplicateTitle = todos.some(todo => todo.title === title);
    
    if (!isDuplicateTitle) {
        todos.push(todo);
        saveTodos(todos);
        logTodo(todo, 'New Todo created!');
    } else {
        return console.log('Todo with this title already exists!');
    }
};

const getAll = () => {
    const todos = fetchTodos();
    console.log(`${todos.length} todos in the list`);
    todos.forEach(todo => logTodo(todo));
};

const getTodo = title => {
    const todos = fetchTodos();
    const todo = todos.filter(todo => todo.title === title)[0];
    debugger;

    if (todo) {
        logTodo(todo);
    } else {
        console.log('Todo with this title not exist');
    }
};

const removeTodo = title => {
    let todos = fetchTodos();
    const index = _.findIndex(todos, todo => todo.title === title);
    
    if (index >= 0) {
        todos.splice(index, 1)
        saveTodos(todos);
        console.log(`Todo ${title} was removed!`);
    } else {
        console.log('Todo with this title not exist');
    }
};

module.exports = {
    addTodo,
    getAll,
    getTodo,
    removeTodo
};