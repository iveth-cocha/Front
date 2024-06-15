import React from 'react'
import RegistroUsu from '../componets/formularios/RegistroUsu'
import { useNavigate } from 'react-router-dom';
import { BiCaretLeftCircle } from 'react-icons/bi';


const Registro = () => {
  const navigate = useNavigate();
  return (
    <div>
        <div className='flex items-center'>
        <BiCaretLeftCircle  className='text-4xl text-sky-950'
        onClick={() => navigate(`/usuarios`)}/>
        <h1 className='font-black text-4xl text-gray-500 uppercase'>Registrar Nuevo Usuario</h1>
        
      </div>
      <hr className='my-4 border-sky-950  '/>
        
          <RegistroUsu/>
       
        
    </div>
  )
}

export default Registro