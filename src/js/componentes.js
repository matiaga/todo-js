import { Todo } from '../classes';
import { todoList } from '../index';

// Referencias HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput    = document.querySelector('.new-todo');
const btnBorrar   = document.querySelector('.clear-completed');
const ulFiltros   = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro');
const spanPendientes = document.querySelector('.todo-count');

export const crearTodoHtml = ( todo ) => {
    
    const htmlTodo = 
        `<li class="${ todo.completado? 'completed': '' }" data-id="${ todo.id }">
            <input class="toggle" type="checkbox" ${ todo.completado? 'checked': '' }>
            <label>${ todo.tarea }</label>
            <div class="view">
		        <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    
    divTodoList.append( div.firstElementChild );
    return div.firstElementChild;
 }

export const asignarPendientes = ( num ) => {
    spanPendientes.firstChild.innerHTML = num;
 };

// Eventos

txtInput.addEventListener('keyup', (event) => {

    if(event.keyCode === 13 && (event.target.value.length > 0)) {
        const nuevoTodo = new Todo(event.target.value);
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHtml( nuevoTodo );
        asignarPendientes( todoList.nPendientes );

        console.log(todoList);
        
        event.target.value = '';

    }

});

divTodoList.addEventListener('click', (event)=>{
    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento   = event.target.parentElement;
    let todoId         = todoElemento.getAttribute('data-id');
    

    if ( nombreElemento.includes('input') ) {
        
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');

    } else if ( nombreElemento.includes('button') ) {
        todoId = todoElemento.parentElement.getAttribute('data-id');

        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento.parentElement );
    
    };

    asignarPendientes(todoList.nPendientes);

});

btnBorrar.addEventListener('click', () =>{
    todoList.eliminarCompletados();

    console.log(divTodoList.children);

    for (let i = divTodoList.children.length -1 ; i >= 0; i--) {
        const element = divTodoList.children[i];
        if (element.classList.contains('completed')) {
            divTodoList.removeChild(element);
        }
    }
   
});

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    
    if (!filtro) { return;} // verifica el filtro seleccionado

    anchorFilters.forEach( elem => { elem.classList.remove('selected') });
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
        case 'Pendientes':
            if (completado) {
                elemento.classList.add('hidden');
            }
            break;
        case 'Completados':
            if (!completado) {
                elemento.classList.add('hidden');
            }
            break;
       }   
    }

});