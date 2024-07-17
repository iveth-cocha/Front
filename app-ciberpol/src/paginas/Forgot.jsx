import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';

const Forgot = () => {
    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({});
    const [email, setEmail] = useState({})

    const handleChange = (e) => {
        setEmail({
            ...email,
            [e.target.name]:e.target.value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password`;
            const respuesta = await axios.post(url, email);
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setEmail("")
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            setMensaje({respuesta: error?.response?.data?.errors?.[0]?.msg || error?.response?.data?.msg,
                tipo: false})
            setTimeout(() => {
                setMensaje({});
                
            }, 3000);
        }
    };

    return (
        <div className="h-screen bg-cover bg-center font-serif" style={{ backgroundImage: `url('/fondo_base.jpg')` }}>
            <div className="flex flex-col justify-center items-center h-full">
                <div className='flex flex-row flex-wrap gap-8 mb-3'>
                    <img src="/logo_policia.png" className=' h-32' alt="Logo Policía" />
                    <img src="/logo_ciberpol.png" className='h-32' alt="Logo Ciberpol" />
                </div>
                <h1 className="text-3xl font-bold underline text-red mb-3">SISTEMA DE DELEGACIONES</h1>

                <h2 className="text-3xl font-bold text-red mb-4">Olvido su Contraseña</h2>
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                <form onSubmit={handleSubmit}>
                    <div className='mb-7'>
                        <label className='mr-3'>Ingrese su Correo</label>
                        <input
                            type="email"
                            name="email"
                            className="block w-96 rounded-md border border-gray-300 focus:border-sky-900 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mx-8">
                        <button to="/" className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Recuperar Contraseña</button>
                    </div>
                </form>

                <p className="md:text-lg lg:text-xl text-gray-600 mt-8">Regresar a
                    <Link to="/" className=" text-gray-600 hover:text-blue-900 underline pl-2">Iniciar Sesión</Link>
                </p>

            </div>
        </div>
    );
}

export default Forgot;

