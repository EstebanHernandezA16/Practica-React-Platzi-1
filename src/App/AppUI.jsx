import React from "react";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { TodoContext } from "../TodoContext";
import { CreateTodoButton } from "../CreateTodoButton";
import { Modal } from "../modal";
import { TodoForm } from "../TodoForm";

function AppUI() {
  const {
    error,
    loading,
    searchedTodos,
    alterarTodo,
    deleteTodo,
    openModal,
    setOpenModal,
  } = React.useContext(TodoContext);
  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />

      <TodoList>
        {error && <p>oh oh alerta por subnormal</p>}
        {loading && <p>Loading....</p>}
        {!loading && !searchedTodos.length && <p>Crea tu primera tarea</p>}
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            alterarTodo={() => alterarTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      {openModal && (
        <Modal>
          <TodoForm />
        </Modal>
      )}

      <CreateTodoButton setOpenModal={setOpenModal} />
    </React.Fragment>
  );
}

export { AppUI };
