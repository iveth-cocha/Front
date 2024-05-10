import React from 'react'

import NombresAgente from '../AutoComplete/NombresAgente';

const Asignacion = () => {


  return (
    <div className='rounded-md border-2 border-sky-950 p-8 mb-2 '>
      <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Asiganción de la Investigacion </h1>


      <div className='flex mb-3'>
        <label className='mr-7'>N° de Investigación Previa</label>
        <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>

      <div className='flex mb-3'>
        <label className='mr-11'>N° de Instrucción Fiscal</label>
        <input type="Number" className="block w-200 rounded-md border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>

      <div className='flex  mb-3'>
        <label className='mr-7'>Mes de ingreso de Disposiciones Fiscales</label>
        <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
          <option value="">-- Seleccione un mes --</option>
          <option value="ENERO">ENERO</option>
          <option value="FEBRERO">FEBRERO</option>
          <option value="MARZO">MARZO</option>
          <option value="ABRIL">ABRIL</option>
          <option value="MAYO">MAYO</option>
          <option value="JUNIO">JUNIO</option>
          <option value="JULIO">JULIO</option>
          <option value="AGOSTO">AGOSTO</option>
          <option value="SEPTIEMBRE">SEPTIEMBRE</option>
          <option value="OCTUBRE">OCTUBRE</option>
          <option value="NOVIEMBRE">NOVIEMBRE</option>
          <option value="DICIEMBRE">DICIEMBRE</option>
        </select>
      </div>


      <div className='flex mb-3'>
        <label className='mr-7'>Apellidos y Nombres del Agente </label>
        <NombresAgente />
      </div>









    </div>
  )
}

export default Asignacion