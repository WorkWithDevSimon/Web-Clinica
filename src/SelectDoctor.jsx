import React from 'react'

const SelectDoctor = ({ capturarDoctor, nombreOnchage }) => {
  /* este componente SelectDoctor muestra una lista desplegable (select) que contiene opciones de diferentes doctores,
y cuando el usuario selecciona un doctor, se activa el evento onChangey se llama a la función nombreOnchagepara manejar la selección.*/
  return (
    <select
      name="doctorNombre"
      id="selectDoctor"
      className="form-control"
      onChange={nombreOnchage}>
      <option value={-1}>NO SELECCIONADO</option>
      {capturarDoctor.map((doctor) => (
        <option key={doctor.id} value={doctor.nombre}>
          {doctor.nombre}
        </option>
      ))}
    </select>
  );
};

export default SelectDoctor