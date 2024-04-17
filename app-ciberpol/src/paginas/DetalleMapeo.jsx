import React from 'react'
import { BiCaretLeftCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom'

const DetalleMapeo = () => {
    const navigate = useNavigate();
  return (
    <div>
        <div className='flex items-center'>
        <BiCaretLeftCircle  className='text-6xl text-sky-950'
        onClick={() => navigate(`/Mapeo`)}/>
        <h1 className='font-black text-4xl text-gray-500 uppercase'>Detalle de las actualizaciones Realizadas</h1>
        
      </div>
      <hr className='my-4 border-sky-950  '/>
        <p >agregar el id para la funcionalida app, (panel) y en la ruta que viene desde la tabla </p>

    </div>
  )
}

export default DetalleMapeo