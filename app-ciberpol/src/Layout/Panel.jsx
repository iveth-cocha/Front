import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet, useLocation } from 'react-router-dom'

const Panel = () => {
    const location = useLocation()
    const urlActual = location.pathname
    const esDelegaciones = urlActual === '/Delegaciones' || urlActual === '/Delegaciones/NuevaDelegacion' || urlActual === '/Delegaciones/DetalleDelegacion';
  return (
    <div className='md:flex md:min-h-screen font-serif '>

    <div className='md:w-1/5 bg-blue-950 px-5 py-4 '>

        <h2 className='text-4xl font-black text-center text-slate-200'>Bienvenido</h2>
        <div className='flex items-center justify-center mt-4'>
        <FaRegUserCircle className='h-20 w-20 text-slate-200 ' />
        </div>

        
        <p className='text-slate-400 text-center my-4 text-sm  font-bold'>Grado. Usuario - Rol</p>
        <hr className="mt-5 border-slate-500" />

        <ul className="mt-5">

            <li className="text-center">
                <Link to='/Delegaciones' className={`${esDelegaciones ? 'text-black-200 bg-gradient-to-r from-gray-300 to-slate-300  px-3 py-2 rounded-md text-center ' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Delegaciones</Link>
            </li>

            <li className="text-center">
                <Link to='/Delegaciones/DelitosyTipificaciones' className={`${urlActual === '/Delegaciones/DelitosyTipificaciones' ? 'text-black-200 bg-gradient-to-r from-gray-300 to-slate-300  px-3 py-2 rounded-md text-center ' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Agregar Delitos</Link>
            </li>

            <li className="text-center">
                <Link to='/Delegaciones/RegistroUsuario' className={`${urlActual === '/Delegaciones/RegistroUsuario' ? 'text-black-200 bg-gradient-to-r from-gray-300 to-slate-300  px-3 py-2 rounded-md text-center ' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Registrar Usuario</Link>
            </li>

            <li className="text-center">
                <Link to='/Delegaciones/Usuarios' className={`${urlActual === '/Delegaciones/Usuarios' ? 'text-black-200 bg-gradient-to-r from-gray-300 to-slate-300  px-3 py-2 rounded-md text-center ' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Usuarios</Link>
            </li>
        </ul>

    </div>

    <div className='flex-1 flex flex-col justify-between h-screen '>
    
        <div className='bg-gradient-to-r from-blue-950 to-sky-950 py-2 flex md:justify-end items-center gap-5 justify-center'>
      
            <div>
                <Link to='/' className=" text-white mr-3 text-md block hover:bg-red-900 text-center
                bg-red-800 px-4 py-1 rounded-lg">Salir</Link>
            </div>
        </div>
        <div className='overflow-y-scroll h-screen bg-cover bg-center p-10 ' style={{backgroundImage: `url('/fondo.jpg')`}} >
            <Outlet />
        </div>
       

    </div>



</div>
  )
}

export default Panel