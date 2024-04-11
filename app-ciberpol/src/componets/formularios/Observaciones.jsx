import React from 'react'

const Observaciones = () => {
  return (
    <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
      <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>observaciones</h1>

      <div className='flex mb-3'>
        <label className='mr-7 '>Nombre del Requermimiento en la Boleta</label>
        <input type="String" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>
      <div className='mb-3'>
        <label className='mr-7 '>Apellidos y Nombres de los Detenidos, producto del Cumplimiento de la Disposición Fiscal</label>
        <input type="String" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div> 
      <div className='flex mb-3'>
        <label className='mr-7 '>N° Boletas Solicitadas</label>
        <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>
      <div className='flex mb-3'>
        <label className='mr-7 '>N° de Detenidos producto de la Investigación</label>
        <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>
      <div className='flex mb-3'>
        <label className='mr-7 '>N° de Allanamientos</label>
        <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>
      <div className='flex mb-3'>
        <label className='mr-7 '>N° de Recuperaión de Bienes</label>
        <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>
      <div className='flex mb-3'>
        <label className='mr-7 '>N° de Recuperación de Automotores</label>
        <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>
      <div className='flex mb-3'>
        <label className='mr-7 '>N° de Recuperación Otros</label>
        <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>
      <div className='flex mb-3'>
        <label className='mr-7 '>N° de Notificaciones</label>
        <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>
      <div className='flex mb-3'>
        <label className='mr-7 '>N° de Citaciones</label>
        <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>
      <div className='flex mb-3'>
        <label className='mr-7 '>N° de Peritajes</label>
        <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>
      <div className='flex mb-3'>
        <label className='mr-7 '>N° de Traslados</label>
        <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>



    </div>
  )
}

export default Observaciones