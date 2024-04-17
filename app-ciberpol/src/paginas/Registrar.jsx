import React from 'react'
import { Link } from 'react-router-dom'

const Registrar = () => {
    return (
        <div className="h-screen bg-cover bg-center  flex flex-col justify-center items-center" style={{ backgroundImage: `url('/fondo_base.jpg')` }} >
            <div className="p-3 bg-blue-900 rounded-lg border  font-serif ">
                <div className='flex items-center justify-center bg-no-repeat bg-top mb-2'>
                    <img src="/logo_policia.png" className=' h-20' />
                    <img src="/logo_ciberpol.png" className='h-20' />
                </div>
                <p className='text-slate-300 uppercase text-lg mb-2 text-center'>Solicitud de Registro para acceder al Sistema</p>
                
                <div className='p-8'>
                <form  >
                    <div className=' mb-6'>
                        <label className=' text-slate-300 mr-7'>Cédula</label>
                        <input type="text" className=" w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-black" />
                    </div>
                    <div className=' mb-6'>
                        <label className=' text-slate-300 mr-7'>Nombre</label>
                        <input type="text" className=" w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-black" />
                    </div>
                    <div className=' mb-6'>
                        <label className=' text-slate-300 mr-7'>Email</label>
                        <input type="email" className=" w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-black" />
                    </div>
                    <div className=' mb-2'>
                        <label className=' text-slate-300 mr-7'>Mensaje (recuerde mencionar el rol)</label>
                        <textarea className="w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-black resize-y" rows="2"/>
                    </div>

                        <div className="mt-3 text-sm flex justify-center items-center">

                            <Link to="/" className="py-3 w-60 block text-center bg-gray-500 text-slate-300 rounded-xl hover:scale-100 duration-300 hover:bg-gray-700 hover:text-white">Solicitar Registro</Link>

                        </div>

                </form>

                </div>
                

            </div>



        </div>
    )
}

export default Registrar