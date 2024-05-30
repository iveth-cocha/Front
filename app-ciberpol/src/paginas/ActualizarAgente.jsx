import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiCaretLeftCircle } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';
import Agente from '../componets/formularios/Agente';

const ActualizarAgente = () => {
  const navigate = useNavigate();

  const { Cedula } = useParams()
  const [agente, setAgente] = useState({})
  const [mensaje, setMensaje] = useState({})

  useEffect(() => {
    const consultarAgente = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/detalle/agente/${Cedula}`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setAgente(respuesta.data);
        // <-- Agregar console.log aquí
        console.log("respuesta", respuesta.data);
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
        }
    }
    consultarAgente()
}, [])

  return (
    <div>
      <div className='flex items-center'>
        <BiCaretLeftCircle  className='text-4xl text-sky-950'
        onClick={() => navigate(`/agentes`)}/>
        <h1 className='font-black text-4xl text-gray-500 uppercase'>Actualizar Agente</h1>
        
      </div>
      <hr className='my-4 border-sky-950  '/>
      {agente && Object.keys(agente).length !== 0 ? (
        
                <Agente agente={agente} />
            ) : (
                Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}
    </div>
  )
}

export default ActualizarAgente