import React from "react";
import "./TodoCounter.css";

function TodoCounter(props /*ó tambien {total, completed}*/) {
  /*Se pueden recibir parametros del modulo app con el props de arriba ó se pueden traer los parametros de forma tradicional, ahora props trae todo lo que pongamos dentro del modulo Counter en App, lo malo de la forma tradicional es que hay que poner el parametro tanto en la funcion arriba como dentro del modulo en app, en resumen props es mas rapido*/
  const { total, completed } = props;

  return (
    <h2 className="TodoCounter">
      Has completado {completed} de {total} tareas pendientes
    </h2>
  );
}

export { TodoCounter };
