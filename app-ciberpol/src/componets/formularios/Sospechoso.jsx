import React from 'react'

const Sospechoso = () => {
  return (
    <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
        <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Sospechoso</h1>

      <div className='flex mb-3'>
        <label className='mr-7'>Apellidos y Nombres del Detenido o Sospechoso</label>
        <input type="String" className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>
      <div className='flex mb-3'>
        <label className='mr-7'>Condición del Infractor Involucrado</label>
        <input type="String" className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>
      <div className='flex mb-3'>
        <label className='mr-7'>Parentesco del Detenido o Sospechoso con la Victima</label>
        <input type="String" className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>
      <div className='flex mb-3'>
        <label className='mr-7'>Alias del Sospechoso </label>
        <input type="String" className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>
      <div className='flex mb-3'>
        <label className='mr-7'>Placas del Vihículo Involucrado en el Delito</label>
        <input type="String" className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
      </div>

    </div>
  )
}

export default Sospechoso