import React from 'react'
import RegistroUsu from '../componets/formularios/RegistroUsu'


const Registro = () => {
  return (
    <div>
        <h1 className='font-black text-4xl text-gray-500 uppercase'>Registro de usuarios</h1>
        <hr className='my-4 border-sky-950  '/>
        
          <RegistroUsu/>
       
        
    </div>
  )
}

export default Registro