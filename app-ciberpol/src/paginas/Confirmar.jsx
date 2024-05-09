import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';

const Confirmar = () => {
  const { token } = useParams();
    const [mensaje, setMensaje] = useState({})
    const verifyToken = async()=>{
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/confirmar/${token}`
            const respuesta = await axios.get(url)
            setMensaje({respuesta:respuesta.data.msg,tipo:true})
        } catch (error) {
            setMensaje({respuesta:error.response.data.msg,tipo:false})
        }
    }
    useEffect(() => {
        verifyToken()
    }, [])
  return (

      <div className="h-screen bg-cover bg-center font-serif" style={{ backgroundImage: `url('/fondo_base.jpg')` }} >
          <div className="flex flex-col justify-center items-center h-full">
          {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            
              <div className='flex flex-row flex-wrap  gap-8 mb-3'>
                  <img src="/logo_policia.png" className=' h-32' />
                  <img src="/logo_ciberpol.png" className='h-32' />
              </div>
              <p className="text-3xl md:text-4xl lg:text-3xl text-gray-800 mt-8 uppercase">Página de confirmación de cuenta</p>
              <p className="md:text-lg lg:text-xl text-gray-600 mt-8  ">Es necesario que crees una contraseña   
                <Link to={`/actualizar-contrasena/${token}`}  className=" text-gray-600 hover:text-blue-900 underline pl-2">Clic para crear contraseña</Link>
              </p>

          </div>
      </div>
   
  )
}

export default Confirmar