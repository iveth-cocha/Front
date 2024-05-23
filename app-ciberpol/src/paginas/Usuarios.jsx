import React from 'react'
import TablaUsuarios from '../componets/TablaUsuarios'
import { useNavigate } from 'react-router-dom';

const Usuarios = () => {
  const navigate = useNavigate();
  return (
    <div>
        <h1 className='font-black text-4xl text-gray-500 '>Usuarios</h1>
        <hr className='my-4 border-sky-950  '/>

        <input
        type="submit"
        className=' bg-sky-950 w-auto p-3  text-white font-bold rounded-lg 
                  hover:bg-gray-600 cursor-pointer transition-all ml-auto mb-5'
        onClick={() => navigate(`/usuarios/nuevoUsuario`)}
        value='Nuevo Usuario'
      />

    <TablaUsuarios/>

</div>
  )
}

export default Usuarios