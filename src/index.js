import React from 'react';
import ReactDOM from 'react-dom/client';
import Clinica from './Clinica';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Todo lo que se ponga el render es lo que ira en HTML.
//Componentes es igual a una funcion.
root.render(
  <div className="container">
    <Clinica />
  </div>
);

