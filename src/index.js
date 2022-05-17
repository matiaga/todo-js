import './styles.css';

import { Todo, TodoList } from './classes';
import { crearTodoHtml, asignarPendientes } from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHtml );
asignarPendientes( todoList.nPendientes );


// console.log(todoList.todos);