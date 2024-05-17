import React, { useEffect, useState } from 'react'
import { BiCaretLeftCircle } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'


import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';
import NewDelegacion from '../componets/formularios/NewDelegacion';

const ActualizarDelegacion = () => {
  
    const navigate = useNavigate();

    const { id } = useParams()
    const [delegacion, setDelegacion] = useState({})
    const [mensaje, setMensaje] = useState({})

    useEffect(() => {
        const consultarDelegacion = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/detalle/delegacion/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                setDelegacion(respuesta.data)
                console.log("respuesta", respuesta.data)
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarDelegacion()
    }, [])
    

  return (
    <div>
        <div className='flex items-center'>
        <BiCaretLeftCircle  className='text-4xl text-sky-950'
        onClick={() => navigate(`/delegaciones`)}/>
        <h1 className='font-black text-4xl text-gray-500 uppercase'>Actualizar Delegación</h1>
        
      </div>
      <hr className='my-4 border-sky-950  '/>
      {
    (delegacion && Object.keys(delegacion).length !== 0) ? (
      <NewDelegacion delegacion={delegacion}/>
      
      
    ) : (
        mensaje && Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
    )
}
        

       



    </div>
  )
}

export default ActualizarDelegacion