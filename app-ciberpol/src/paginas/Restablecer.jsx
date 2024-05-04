import React from 'react'
import { Link } from 'react-router-dom'

const Restablecer = () => {
    return (

        <div className="h-screen bg-cover bg-center font-serif" style={{ backgroundImage: `url('/fondo_base.jpg')` }} >
            <div className="flex flex-col justify-center items-center h-full">
                <div className='flex flex-row flex-wrap  gap-8 mb-3'>
                    <img src="/logo_policia.png" className=' h-32' />
                    <img src="/logo_ciberpol.png" className='h-32' />
                </div>
                <h1 className="text-3xl font-bold underline text-red mb-3">SISTEMA DE DELEGACIONES </h1>

                <h2 className="text-3xl font-bold text-red mb-4">Cambiar contraseña </h2>
                <p className='uppercase'>agregar el token en la ruta para la funcionalida en el archivo app</p>

                <form>
                    <div className=' mb-3'>
                        <label className='mr-4'>Nueva Contraseña</label>
                        <input type="password" placeholder="**************" className="block w-full rounded-md border border-gray-300 focus:border-sky-900 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
                    </div>
                    <div className=' mb-3'>
                        <label className='mr-4'>Confirmar Nueva Contraseña</label>
                        <input type="password" placeholder="**************" className="block w-full rounded-md border border-gray-300 focus:border-sky-900 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
                    </div>

                    <div className="mx-8">
                        <Link to="/" className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Cambiar Contraseña</Link>
                    </div>
                </form>

                


            </div>
        </div>

    )
 
}

export default Restablecer