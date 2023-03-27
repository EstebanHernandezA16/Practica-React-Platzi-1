import React from "react";
import "./CreateTodoButton.css";

function CreateTodoButton(props) {
  const onClickButton = () => {
    props.setOpenModal((prevState) => !prevState);//Abrir y cerrar el modal
  };

  return (
    <button className="CreateTodoButton" onClick={onClickButton}>
      +
    </button>
  );
}

export { CreateTodoButton };
