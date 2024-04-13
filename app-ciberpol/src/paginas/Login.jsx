import React from 'react'
import { Link } from 'react-router-dom'


const Login = () => {
  return (
    <div  className="h-screen bg-cover bg-center" style={{backgroundImage: `url('/fondo.jpg')`}} >
      <div className="flex flex-col justify-center items-center h-full">
        <div className='flex items-center justify-center bg-no-repeat bg-top'>
          <img src="/logo_policia.png" className=' h-32' />
          <img src="/logo_ciberpol.png" className='h-32' />
        </div>

        <h1 className="text-3xl font-bold underline text-red mb-3">SISTEMA DE DELEGACIONES </h1>
        
        <h1 className="text-3xl font-bold text-red mb-4">Inicio de Sesión </h1>

        <form>
          <div className='flex items-center justify-center mb-3'>
          <label className='mr-7'>Correo</label>
          <input type="email" className="block w-full rounded-md border border-gray-300 focus:border-sky-900 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <div className='flex items-center justify-center mb-3'>
          <label className='mr-4'>Contraseña</label>
          <input type="password" placeholder="**************" className="block w-full rounded-md border border-gray-300 focus:border-sky-900 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <div className="mx-8">
            <Link to="/Delegaciones" className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Ingresar</Link>
          </div>

        </form>

        <div className="mt-3 text-sm flex justify-between items-center">
          
          <Link to="/Registrar" className=" text-gray-600 hover:text-blue-900 ">Solicitar Registro</Link>

        </div>


      </div>
    </div>
  )
}

export default Login