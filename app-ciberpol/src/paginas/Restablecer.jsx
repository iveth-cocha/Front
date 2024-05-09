import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Mensaje from '../componets/Alertas/Mensaje';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Restablecer = () => {
    //------validar la solicitud de reestablecer la contraseña
    const { token } = useParams();    
    const [mensaje, setMensaje] = useState({})
    const verifyToken = async()=>{
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password/${token}`
            const respuesta = await axios.get(url)
            setMensaje({respuesta:respuesta.data.msg,tipo:true})
            setTimeout(() => {
                setMensaje({});
            }, 3000);

        } catch (error) {
            setTimeout(() => {
                setMensaje({});
            }, 3000);
        }
    }
    useEffect(() => {
        verifyToken()
    }, [])
    //-------------CAMBIAR CONTRASEÑA
    const navigate = useNavigate();

    const [form, setForm] = useState({
        password: "",
        confirmpassword: ""
    })
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/nuevo-password/${token}`
            const respuesta = await axios.post(url, form)
            
            setMensaje({ respuesta: respuesta.data.msg, tipo: true })
            setTimeout(() => {
                navigate('/');
            }, 3000);

        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
            setForm({})
            setTimeout(() => {
                setMensaje({});
            }, 3000);

        }
    }

    return (

        <div className="h-screen bg-cover bg-center font-serif" style={{ backgroundImage: `url('/fondo_base.jpg')` }} >
            <div className="flex flex-col justify-center items-center h-full">
                <div className='flex flex-row flex-wrap  gap-8 mb-3'>
                    <img src="/logo_policia.png" className=' h-32' />
                    <img src="/logo_ciberpol.png" className='h-32' />
                </div>
                <h1 className="text-3xl font-bold underline text-red mb-3">SISTEMA DE DELEGACIONES </h1>
                {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                <h2 className="text-3xl font-bold text-red mb-4">Cambiar contraseña </h2>
                

                <form onSubmit={handleSubmit}>
                    <div className=' mb-3'>
                        <label className='mr-4'>Nueva Contraseña</label>
                        <input type="password" placeholder="**************" 
                         value={form.password || ""}
                         name='password'
                         onChange={handleChange}
                        className="block w-full rounded-md border border-gray-300 focus:border-sky-900 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
                    </div>
                    <div className=' mb-3'>
                        <label className='mr-4'>Confirmar Nueva Contraseña</label>
                        <input type="password" placeholder="**************" 
                        alue={form.confirmpassword || ""}
                        name='confirmpassword'
                        onChange={handleChange}
                        className="block w-full rounded-md border border-gray-300 focus:border-sky-900 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
                    </div>

                    <div className="mx-8">
                        <button to="/" className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Cambiar Contraseña</button>
                    </div>
                </form>

                


            </div>
        </div>

    )
 
}

export default Restablecer