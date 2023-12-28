import React from "react";

const Paciente = ({ pacientes }) => {

//   /este código representa una tabla que muestra una lista de pacientes con sus respectivos 
// "ID", "nombre" y "apellido" obtenidos de una matriz de objetos pacientes. 
// Es un componente React que puede ser utilizado en una aplicación para visualizar y listar pacientes en una interfaz de usuario./
 
  return (
    <>
      <h2>Pacientes</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td>{paciente.id}</td>
              <td>{paciente.nombre}</td>
              <td>{paciente.apellido}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

 

 


export default Paciente;
