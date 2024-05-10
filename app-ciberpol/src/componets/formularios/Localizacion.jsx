import React from 'react'
import Localidad from '../AutoComplete/Localidad'

const Localizacion = () => {
  return (
    <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Localización</h1>

          <div className='flex mb-3'>
            <label className='mr-7'>Realice la Búsqueda para la Localización </label>
            <Localidad/>
          </div>

    </div>
  )
}

export default Localizacion