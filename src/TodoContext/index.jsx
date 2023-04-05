import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);
  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const alterarTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text == text);
    const newTodos = [...todos];

    if (newTodos[todoIndex].completed == true) {
      newTodos[todoIndex].completed = false;
      alert(
        "Tarea " + newTodos[todoIndex].text.toLowerCase() + " desmarcada"
      ); /*Comentar linea si se vuelve pesado el tener que darle aceptar*/
    } else {
      newTodos[todoIndex].completed = true;
      alert(
        "Ya completaste la tarea de " + newTodos[todoIndex].text.toLowerCase()
      ); /*Comentar linea si se vuelve pesado el tener que darle aceptar*/
    }
    saveTodos(newTodos);
  };

  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text: text,
    });
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };
  return (
    <TodoContext.Provider
      value={{
        error,
        loading,
        totalTodos,
        completedTodos,
        addTodo,
        searchValue,
        setSearchValue,
        searchedTodos,
        alterarTodo,
        deleteTodo,
        openModal,
        setOpenModal,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
