import { Todo } from './todo.class';

export class TodoList {

    todos = [];
    nPendientes = 0;

    constructor() {
        this.cargarLocalStorage();
        this.nPendientes = this.todos.filter(todo => !todo.completado).length;
    }

    nuevoTodo( todo ) {
        this.todos.push(todo);
        this.nPendientes++;
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){
        const todoAEliminar = this.todos.filter(todo => todo.id == id)[0];

        if ( !todoAEliminar.completado ) {
            this.nPendientes--;
        }
        this.todos = this.todos.filter(todo => todo.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado( id ) {
        for (const todo of this.todos) {

            if (id == todo.id) {
                todo.completado = !todo.completado;
                if (todo.completado) {
                    this.nPendientes--;
                } else {
                    this.nPendientes++;
                }
                this.guardarLocalStorage();
                break;
            }
            
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();

    }

    guardarLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos) );
    }

    cargarLocalStorage() {
        console.log('cargando: ', JSON.parse(localStorage.getItem('todos')) );
        
        this.todos = (localStorage.getItem('todos')) 
                        ? JSON.parse(localStorage.getItem('todos')) 
                        : [];
        
        this.todos = this.todos.map( Todo.fromJson );

    }

}