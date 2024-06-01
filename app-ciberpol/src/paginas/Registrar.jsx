import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje'

const Registrar = () => {
    const [mensaje, setMensaje] = useState({})
    const navigate = useNavigate()

    const [form, setform] = useState({
        cedula: "",
        nombre: "",
        email: "",
        mensaje: ""
        
    })

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async(e) => { 
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/solicitar-registro`
            const respuesta = await axios.post(url, form);
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setform({});
            setTimeout(() => {
                navigate('/')
            }, 3000);
        } catch (error) {
            setMensaje({respuesta: error?.response?.data?.errors?.[0]?.msg || error?.response?.data?.msg,
                tipo: false})
        }
    };

    return (
        <div className="h-screen bg-cover bg-center  flex flex-col justify-center items-center" style={{ backgroundImage: `url('/fondo_base.jpg')` }} >
            <div className="p-3 bg-blue-900 rounded-lg border  font-serif ">
                <div className='flex items-center justify-center bg-no-repeat bg-top mb-2'>
                    <img src="/logo_policia.png" className=' h-20' />
                    <img src="/logo_ciberpol.png" className='h-20' />
                </div>
                <p className='text-slate-300 uppercase text-lg mb-2 text-center'>Solicitud de Registro para acceder al Sistema</p>
                
                <div className='p-8'>
                {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                <form onSubmit={handleSubmit}  >
                    <div className=' mb-6'>
                        <label className=' text-slate-300 mr-7'>Cédula</label>
                        <input type="text" id='cedula'
                        name='cedula'
                        value={form.cedula || ""} onChange={handleChange}
                        className=" w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-black" />
                    </div>
                    <div className=' mb-6'>
                        <label className=' text-slate-300 mr-7'>Nombres y Apellidos</label>
                        <input type="text"  id='nombre'
                        name='nombre'
                        value={form.nombre || ""} onChange={handleChange}
                        className=" w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-black uppercase"  />
                    </div>
                    <div className=' mb-6'>
                        <label className=' text-slate-300 mr-7'>Email</label>
                        <input type="email" id='email'
                        name='email'
                        value={form.email || ""} onChange={handleChange}
                        className=" w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-black" />
                    </div>
                        <div className=' mb-2'>
                            <label className=' text-slate-300 mr-7'>Mensaje (recuerde mencionar el rol)</label>
                            <textarea
                                id="mensaje"
                                name="mensaje"
                                value={form.mensaje || ""}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-black resize-y"
                                rows="2"
                            ></textarea>
                        </div>

                        <div className="mt-3 text-sm flex justify-center items-center">

                            <button to="/" className="py-3 w-60 block text-center bg-gray-500 text-slate-300 rounded-xl hover:scale-100 duration-300 hover:bg-gray-700 hover:text-white">Solicitar Registro</button>

                        </div>

                </form>

                </div>
                

            </div>



        </div>
    )
}

export default Registrar