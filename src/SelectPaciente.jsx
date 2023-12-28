import React from 'react'

const SelectPaciente = ({capturarPaciente,nombreOnchage}) => {
  
  /*esta función de React devuelve un elemento select con opciones generadas dinámicamente a partir de un arreglo capturarPaciente.
 Cuando el usuario seleccione una opción diferente, se llamará a la función nombreOnchage, 
 lo que permitirá realizar acciones adicionales o actualizaciones en la aplicación en función de la selección del paciente.
*/
  return (
    // Elemento <select> para la lista desplegable
    <select
      name="pacienteNombre"
      id="pacienteNombre"
      className="form-control"
      onChange={nombreOnchage}>
      <option value={-1}>NO SELECCIONADO</option>
      {capturarPaciente.map((valor) => (
        <option key={valor.id} value={valor.nombre}>
          {valor.nombre}
        </option>
      ))}
    </select>
  );
}

export default SelectPaciente