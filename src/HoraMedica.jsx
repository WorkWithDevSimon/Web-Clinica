const HoraMedica = ({ horasMedicas }) => {
// /este componente renderizará una tabla con los datos de "Horas Médicas Agendadas" 
//   proporcionados en la variable horasMedicas. Cada cita médica se mostrará como una fila en la tabla,
//   y los detalles de cada cita se mostrarán en las diferentes columnas./

  return (
    <>
      <h2>Horas Médicas Agendadas</h2>
      <table className="table table-bordered table-striped table-hover">
        <thead className="bg-primary text-white">
          <tr>
            <th>Paciente</th>
            <th>Doctor</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {horasMedicas.map((horaMedica, index) => (
            <tr key={index}>
              <td>{horaMedica.pacienteNombre}</td>
              <td>{horaMedica.doctorNombre}</td>
              <td>{horaMedica.Fecha}</td>
              <td>{horaMedica.Hora}</td>
              <td>{horaMedica.Precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default HoraMedica;
