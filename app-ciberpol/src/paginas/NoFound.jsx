import React from 'react'
import { Link } from 'react-router-dom'


const NoFound = () => {
    return (
        <div className="h-screen bg-cover bg-center font-serif" style={{ backgroundImage: `url('/fondo_base.jpg')` }} >
            <div className="flex flex-col justify-center items-center h-full">
                
                    <div className='flex flex-row flex-wrap  gap-8 mb-3  '>

                        <img src="/logo_policia.png" className=' h-32' />
                        <img src="/logo_ciberpol.png" className='h-32' />
                    </div>
                    <p className="text-3xl md:text-4xl lg:text-3xl text-gray-800 mt-8 ">Lo sentimos pero no existe la página o no tienes permiso para acceder al contenido</p>

                    <Link to="/" className=" text-gray-600 hover:text-blue-900 underline ">Iniciar Seción</Link>


                


            </div>
        </div>
    )
}

export default NoFound