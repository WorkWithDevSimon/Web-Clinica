import React, { useEffect, useState } from "react";
import Paciente from "./Paciente";
import Doctor from "./Doctor";
import HoraMedica from "./HoraMedica";
import SelectPaciente from "./SelectPaciente";
import SelectDoctor from "./SelectDoctor";

const Clinica = () => {
  const [capturarPaciente, setcapturarPaciente] = useState([]);
  const [capturarDoctor, setcapturarDoctor] = useState([]);
  const [GuardarElemento, setGuardarElemento] = useState([]);
  const [GuarDatFiltrados, setGuarDatFiltrados] = useState([]);
  const [GuarDatFiltrados2, setGuarDatFiltrados2] = useState([]);
  const [valoresDelaCaja, setvaloresCaja] = useState({
    doctorNombre: "",
    pacienteNombre: "",
    Fecha: "",
    Precio: 0,
    Hora: "",
  });

 

  const urlDoctor =
    "http://45.236.130.191/api-prueba/clinica.php?action=doctores";
  const urlPacientes =
    "http://45.236.130.191/api-prueba/clinica.php?action=pacientes";

  const getPaciente = async () => {
    const paciente = await fetch(urlPacientes);
    const capturarDatosDoctor = await paciente.json();
    setcapturarPaciente(capturarDatosDoctor);
  };
  const getDoctor = async () => {
    const Doctor = await fetch(urlDoctor);
    const capturarDatosDoctor = await Doctor.json();
    setcapturarDoctor(capturarDatosDoctor);
  };
  useEffect(() => {
    getPaciente();
    getDoctor();
    // Recuperar datos del localStorage y actualizar el estado GuardarElemento
    const storedData = localStorage.getItem("DatosDeHoraMedica");
    if (storedData) {
      setGuardarElemento(JSON.parse(storedData));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("DatosDeHoraMedica", JSON.stringify(GuardarElemento));
  }, [GuardarElemento]);

  localStorage.setItem("DatosDoctores", JSON.stringify(capturarDoctor));
  const LisaDoctores = JSON.parse(localStorage.getItem("DatosDoctores"));

  localStorage.setItem("DatosPacientes", JSON.stringify(capturarPaciente));
  const ListaDePacientes = JSON.parse(localStorage.getItem("DatosPacientes"));

  const verificar = (event) => {
    const { value, name } = event.target;
    setvaloresCaja((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const botonVerificador = () => {
    if (
      valoresDelaCaja.doctorNombre === "" ||
      valoresDelaCaja.pacienteNombre === "" ||
      valoresDelaCaja.Fecha === "" ||
      valoresDelaCaja.Precio === "" ||
      valoresDelaCaja.doctorNombre === "-1 " ||
      valoresDelaCaja.pacienteNombre === "-1"
    ) {
      alert("Por favor, ingresa todos los campos");
      return;
    }
    const esHoraCompleta = valoresDelaCaja.Hora.endsWith(":00");
    // //  variable esHoraCompleta es una bandera que indica si la hora seleccionada (valoresDelaCaja.Hora) termina con
    //":00", es decir, si los minutos son "00".
    // Al colocar un signo de exclamación ! delante de esHoraCompleta, estamos negando su valor booleano.
    //  Esto significa que esta condición se cumplirá
    //  si la hora seleccionada NO termina en ":00".
    if (!esHoraCompleta) {
      alert("Por favor, ingresa una hora completa en punto (ejemplo: 13:00)");
      return;
    }

    // Filtramos  solamente las horas médicas que coincidan con la fecha y hora seleccionadas,
    // pero que el paciente sea diferente
    const horasMedicasFiltradas = GuardarElemento.filter(
      (horaMedica) =>
        horaMedica.Fecha !== valoresDelaCaja.Fecha &&
        horaMedica.Hora === valoresDelaCaja.Hora &&
        horaMedica.doctorNombre === valoresDelaCaja.doctorNombre &&
        horaMedica.pacienteNombre !== valoresDelaCaja.pacienteNombre
    );

    // en esta parte del codigo logramos que  solo las horas médicas que coincidan con el doctor, hora y precio seleccionados,
    // independientemente del paciente
    const horasMedicasMismoDoctorHoraPrecio = GuardarElemento.filter(
      (horaMedica) =>
        horaMedica.doctorNombre === valoresDelaCaja.doctorNombre &&
        horaMedica.Hora === valoresDelaCaja.Hora &&
        horaMedica.Fecha === valoresDelaCaja.Fecha
    );

    const horasMedicasMismoPacienteHoraPrecio = GuardarElemento.filter(
      (horaMedica) =>
        horaMedica.pacienteNombre === valoresDelaCaja.pacienteNombre &&
        horaMedica.Hora === valoresDelaCaja.Hora &&
        horaMedica.Fecha === valoresDelaCaja.Fecha
    );
    if (horasMedicasMismoDoctorHoraPrecio.length > 0) {
      alert("Ya existe una hora médica con este mismo doctor  ");
      return;
    }

    if (horasMedicasMismoPacienteHoraPrecio.length > 0) {
      alert("Ya existe una hora médica con el mismo Paciente");
      return;
    }
    // aqui Validamos  si ya existe una hora médica con el mismo doctor, hora y precio, independientemente del paciente
    // length nos permite obtener la cantidad de elementos o caracteres de una cadena o un array como tambien
    //nos da el tamaño o longitud del objeto sobre el que se aplica..

    // Validar si ya existe una hora médica con el mismo doctor y fecha pero diferente paciente
    if (horasMedicasFiltradas.length === 0) {
      setGuardarElemento((prevGuardarElemento) => [
        ...prevGuardarElemento,
        valoresDelaCaja,
      ]);
    }
  };

  const AgregarFiltarTabla = () => {
    // Reiniciar el estado GuarDatFiltrados a un array vacío
    setGuarDatFiltrados([]);

    // Filtrar los elementos de GuardarElemento que coincidan con el doctor seleccionado
    const filtradosPorDoctor = GuardarElemento.filter(
      (horaMedica) => horaMedica.doctorNombre === valoresDelaCaja.doctorNombre
    );

    // Establecer los valoresDelaCaja filtrados en el estado GuarDatFiltrados
    setGuarDatFiltrados(filtradosPorDoctor);
  };

  const AgregarFiltrartablaPaciente = () => {
    // Reiniciar el estado GuarDatFiltrados a un array vacío
    setGuarDatFiltrados2([]);

    // Filtrar los elementos de GuardarElemento que coincidan con el doctor seleccionado
    const filtradosPaciente = GuardarElemento.filter(
      (horaMedica) =>
        horaMedica.pacienteNombre === valoresDelaCaja.pacienteNombre
    );

    // Establecer los valoresDelaCaja filtrados en el estado GuarDatFiltrados
    setGuarDatFiltrados2(filtradosPaciente);
  };
  const calcularTotalPrecio = () => {
    var total = 0;
    GuarDatFiltrados2.forEach((horaMedica) => {
      total += parseInt(horaMedica.Precio); // Cambio: sumar el valor de Precio en lugar de sobrescribir 'total'
    });
    return total;
  };

  return (
    <>
      <br />
      <div className="text-center">
        <h1>Clinica Los Lagos</h1>
      </div>
      <br />
      <div>
        <Paciente pacientes={ListaDePacientes} />
      </div>
      <div>
        <Doctor doctores={LisaDoctores} />
      </div>
      <div className="text-center">
        <h2>Agendar Hora </h2>
      </div>
      <div>
        <label>Paciente:</label>
        <SelectPaciente
          capturarPaciente={ListaDePacientes}
          nombreOnchage={verificar}
        />
      </div>
      <div>
        <label>Doctor:</label>
        <SelectDoctor capturarDoctor={LisaDoctores} nombreOnchage={verificar} />
      </div>

      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="Precio"
          id="Precio"
          className="form-control"
          onChange={verificar}
        />
      </div>
      <div>
        <label>Fecha:</label>
        <input
          type="date"
          name="Fecha"
          id="Fecha"
          className="form-control"
          onChange={verificar}
        />
      </div>
      <div>
        <label>Hora:</label>
        <input
          type="time"
          name="Hora"
          id="time"
          className="form-control"
          onChange={verificar}
        />
        <br />
      </div>
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={botonVerificador}>
          Guardar
        </button>
      </div>
      <div>
        <br />
        <HoraMedica horasMedicas={GuardarElemento} />
      </div>

      <div className="text-center">
        <h2>Filtrar Hora Médica</h2>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <label>Filtrar por doctor:</label>
          <SelectDoctor
            capturarDoctor={capturarDoctor}
            nombreOnchage={verificar}
            className="form-select-sm"
          />
          <br />
          <button
            type="button"
            className="btn btn-primary"
            aria-label="Filtrar Doctor"
            onClick={AgregarFiltarTabla}>
            Filtrar Doctor
          </button>
        </div>
      </div>
      <br />

      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Paciente</th>
            </tr>
          </thead>
          <tbody>
            {GuarDatFiltrados.map((valor, index) => (
              <tr key={index}>
                <td>{valor.Fecha}</td>
                <td>{valor.Hora}</td>
                <td>{valor.pacienteNombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="col-sm-6">
        <label>Filtrar por paciente:</label>
        <SelectPaciente
          capturarPaciente={capturarPaciente}
          nombreOnchage={verificar}
          className="form-select-sm"
        />
        <br />
        <button
          type="button"
          className="btn btn-primary"
          aria-label="Filtrar Paciente"
          onClick={AgregarFiltrartablaPaciente}>
          Filtrar paciente
        </button>
      </div>

      <div className="mt-3">
        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Doctores</th>
              </tr>
            </thead>
            <tbody>
              {GuarDatFiltrados2.map((valor, index) => (
                <tr key={index}>
                  <td>{valor.Fecha}</td>
                  <td>{valor.Hora}</td>
                  <td>{valor.doctorNombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <footer>Total precio de las consultas : {calcularTotalPrecio()}</footer>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};
export default Clinica;
