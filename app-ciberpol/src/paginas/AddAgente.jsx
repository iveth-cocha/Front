import React from 'react'
import { BiCaretLeftCircle } from 'react-icons/bi'
import Agente from '../componets/formularios/Agente'
import { useNavigate } from 'react-router-dom';

const AddAgente = () => {
    const navigate = useNavigate();
  return (
    <div>
        <div className='flex items-center'>
        <BiCaretLeftCircle  className='text-4xl text-sky-950'
        onClick={() => navigate(`/agentes`)}/>
        <h1 className='font-black text-4xl text-gray-500 uppercase'>Agregar nuevo Agente</h1>
        
      </div>
      <hr className='my-4 border-sky-950  '/>

      <Agente/>
    </div>
  )
}

export default AddAgente