import React from "react";

// /Este código renderiza una tabla con información sobre doctores. 
// La información se obtiene de una matriz llamada doctores, que debe contener objetos con las propiedades 
// id, nombre, y especialidad. Cada objeto del arreglo se representa como una fila en la tabla 
// con sus respectivas celdas de datos que muestran la información del médico./

const Doctor = ({ doctores }) => {
  return (
    <>
      <h2>Doctores</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {doctores.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.nombre}</td>
              <td>{doctor.especialidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Doctor;
