const fs = require('fs');
const yargs = require('yargs');

const todos = require('./todos.js');

// contains options for yargs commands
const commandsOptions = {
    title: {
        describe: 'Title of todo',
        demand: true,
        alias: 't'
    },
    body: {
        describe: 'Todo\'s body (description)',
        demand: true,
        alias: 'b'
    }
};

const argv = yargs
    .command('add', 'Add\'s new todo to the list', {
        title: commandsOptions.title,
        body: commandsOptions.body
    })
    .command('remove', 'Remove\'s todo from the list', {
        title: commandsOptions.title
    })
    .command('read', 'Prints\'s single todo item', {
        title: commandsOptions.title
    })
    .command('update', 'Update\'s todo item\'s body ', {
        title: commandsOptions.title,
        body: commandsOptions.body
    })
    .command('list', 'Print\'s todo\'s list')
    .help()
    .argv;

const command = argv._[0];

if (command === 'add') {
    todos.addTodo(argv.title, argv.body);
} else if (command === 'list') {
    todos.getAll();
} else if (command === 'read') {
    todos.getTodo(argv.title);
} else if (command === 'remove') {
    todos.removeTodo(argv.title)
} else if (command === 'update') {
    todos.updateTodo(argv.title, argv.body);
} else {
    console.log('Command not recognized');
}