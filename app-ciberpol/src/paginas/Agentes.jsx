import React from 'react'
import { useNavigate } from 'react-router-dom';
import TablaAgentes from '../componets/TablaAgentes';

const Agentes = () => {
    const navigate = useNavigate();
  return (
    <div>
        <h1 className='font-black text-4xl text-gray-500  uppercase'>agentes</h1>
      <hr className='my-4 border-sky-950  '/>

      <input
        type="submit"
        className=' bg-blue-900 w-auto p-3  text-white font-bold rounded-lg 
                  hover:bg-gray-600 cursor-pointer transition-all ml-auto mb-5'
        onClick={() => navigate(`/agentes/nuevoAgente`)}
        value='Añadir Agente'
      />

      <TablaAgentes/>
        
    </div>
  )
}

export default Agentes