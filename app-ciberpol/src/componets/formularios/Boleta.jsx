import React from 'react'

const Boleta = () => {
  return (
    <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
      <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>boleta</h1>

      <div className=' mb-3'>
        <label className='mr-7'>¿Qué art. cumplió dentro del plazo?</label>
        <div>
          <label>
            <input type="radio" name="articuloCOIP2" value="2" />2
          </label>
          <label className="ml-3">
            <input type="radio" name="articuloCOIP4" value="4" />4
          </label>
          <label className="ml-3">
            <input type="radio" name="articuloCOIP5" value="5" />5
          </label>
          <label className="ml-3">
            <input type="radio" name="articuloCOIP6" value="6" />6
          </label>
          <label className="ml-3">
            <input type="radio" name="articuloCOIP8" value="8" />8
          </label>
          <label className="ml-3">
            <input type="radio" name="articuloCOIP9" value="9" />9
          </label>
          <label className="ml-3">
            <input type="radio" name="articuloCOIP10" value="10" />10
          </label>
          <label className="ml-3">
            <input type="radio" name="articuloCOIP11" value="11" />11
          </label>
          <label className="ml-3">
            <input type="radio" name="articuloCOIP12" value="12" />12
          </label>
          <label className="ml-3">
            <input type="radio" name="articuloCOIP14" value="14" />14
          </label>


        </div>
      </div>
      <div className='flex  mb-3'>
        <label className='mr-7'>Cumplimiento Parcial</label>
        <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
          <option value="">Seleccione </option>
          <option >aaaa</option>
        </select>
      </div>
      <div className='flex  mb-3'>
        <label className='mr-7'>Cumplimiento Total</label>
        <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
          <option value="">Seleccione </option>
          <option >aaaa</option>
        </select>
      </div>
      <div className='flex mb-3'>
        <label className='mr-7'>Fecha de Cumplimiento o Descargo </label>
        <input type="Date" className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>
      <div className='flex  mb-3'>
        <label className='mr-7'>En Investigación</label>
        <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
          <option value="">Seleccione </option>
          <option >aaaa</option>
        </select>
      </div>
      <div className='flex mb-3'>
        <label className='mr-7 '>N° de Oficio de Descargo</label>
        <input type="String" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>
      <div className='flex mb-3'>
        <label className='mr-7 '>Versiones</label>
        <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>
      <div className='flex mb-3'>
        <label className='mr-7 '>Reconocimiento de Lugar de los Hechos</label>
        <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>
      <div className='flex  mb-3'>
        <label className='mr-7'>¿Determinó posibles Responsables?</label>
        <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
          <option value="">Seleccione </option>
          <option >aaaa</option>
        </select>
      </div>
      <div className='flex  mb-3'>
        <label className='mr-7'>Comparecencia del Sospechoso</label>
        <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
          <option value="">Seleccione </option>
          <option >aaaa</option>
        </select>
      </div>
      <div className='flex  mb-3'>
        <label className='mr-7'>Requerimientos Fiscalía</label>
        <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
          <option value="">Seleccione </option>
          <option >aaaa</option>
        </select>
      </div>
      <div className='flex mb-3'>
        <label className='mr-7 '>Tipo de Requermimientos</label>
        <input type="String" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>


    </div>
  )
}

export default Boleta