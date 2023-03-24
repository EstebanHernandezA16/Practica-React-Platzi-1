import React, { useState } from "react";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { CreateTodoButton } from "../CreateTodoButton";
import "./App.css";

const defaulttodos = [
  { text: "Tarea#1", completed: true },
  { text: "Task numero 2", completed: false },
  { text: "Requerimiento N#3", completed: false },
  { text: "Cuatro", completed: false },
];

function App() {
  /*Espacio para declarar los States, el valor de useState puede ser literalmente cualquier cosa, String, numero, bool, objeto, array, etc*/

  //state para el array de objetos (tambien llamado Todo's ó Tareas)
  const [todos, setTodos] = useState(defaulttodos);
  //state para el componente TodoSearch
  const [searchValue, setSearchValue] = useState("");

  //Cada vez que haya un cambio de state esta funcion se va a recompilar contando las tareas totales con totalTodos y las completadas con completedTodos
  const completedTodos = todos.filter((todo) => todo.completed == true).length;

  const totalTodos = todos.length;

  //FILTRAR LA CANTIDAD DE TAREAS DEPENDIENDO DEL VALOR DE SEARCHVALUE
  let searchedTodos = [];
  if (!searchValue.length > 0) {
    //si searchValues.length tiene algo escrito entonces se va al else, de lo contrario searchedTodos va a se igual a todos los todos(tareas)
    searchedTodos = todos;
  } else {
    /*Explicacion de chatGpt
    La función de flecha toma cada elemento del arreglo todos como un parámetro todo, y luego realiza una operación en él. En este caso, compara el texto del todo (en minúsculas) con un valor de búsqueda (también en minúsculas), utilizando el método includes() que mencionamos anteriormente. Si el texto del todo incluye el valor de búsqueda, entonces la función devuelve true, lo que significa que ese todo se mantendrá en el nuevo arreglo filtrado. Si no, la función devuelve false y ese todo será excluido del nuevo arreglo */
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();

      return todoText.includes(searchText);
    });
  }

  //al darle click al check de la tarea realmente la pueda marcar

  const alterarTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text == text);
    const newTodos = [...todos];

    if (newTodos[todoIndex].completed == true) {
      newTodos[todoIndex].completed = false;
    } else {
      newTodos[todoIndex].completed = true;
    }
    setTodos(newTodos);
  };

  //SIGUIENTE PASO, DELETETODO

  return (
    <React.Fragment>
      <TodoCounter total={totalTodos} completed={completedTodos} />
      <TodoSearch
        //Orden el primero es el prop y el objeto es el que está aqui declarado en app
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <TodoList>
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => alterarTodo(todo.text)}
          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;
