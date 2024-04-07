import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const Panel = () => {
    const location = useLocation()
    const urlActual = location.pathname
  return (
    <div className='md:flex md:min-h-screen '>

    <div className='md:w-1/5 bg-cyan-950 px-5 py-4'>

        <h2 className='text-4xl font-black text-center text-slate-200'>Bienvenido</h2>

        <img src="" alt="img-client" className="m-auto mt-8 p-1 border-2 border-slate-500 rounded-full" width={120} height={120} />
        <p className='text-slate-400 text-center my-4 text-sm'>Usuario - Rol</p>
        <hr className="mt-5 border-slate-500" />

        <ul className="mt-5">

            <li className="text-center">
                <Link to='/Delegaciones' className={`${urlActual === '/Delegaciones' ? 'text-slate-200 bg-blue-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Delegaciones</Link>
            </li>

            <li className="text-center">
                <Link to='/dashboard/listar' className={`${urlActual === '/dashboard/listar' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Listar</Link>
            </li>

            <li className="text-center">
                <Link to='/dashboard/crear' className={`${urlActual === '/dashboard/crear' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Crear</Link>
            </li>
        </ul>

    </div>

    <div className='flex-1 flex flex-col justify-between h-screen '>
        <div className='bg-gradient-to-r from-cyan-950 via-sky-950 to-blue-950 py-2 flex md:justify-end items-center gap-5 justify-center'>
      
            <div>
                <Link to='/' className=" text-white mr-3 text-md block hover:bg-red-900 text-center
                bg-red-800 px-4 py-1 rounded-lg">Salir</Link>
            </div>
        </div>
        <div className='overflow-y-scroll'>
            <Outlet />
        </div>
       

    </div>



</div>
  )
}

export default Panel