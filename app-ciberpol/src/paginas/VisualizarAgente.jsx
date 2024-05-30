import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiCaretLeftCircle } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';

const VisualizarAgente = () => {
    const navigate = useNavigate();

  const { Cedula } = useParams()
  const [mensaje, setMensaje] = useState({})
  const [agente, setAgente] = useState({})

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
        <h1 className='font-black text-4xl text-gray-500 uppercase'>Detalle Agente</h1>
        
      </div>
      <hr className='my-4 border-sky-950  ' />
      {agente && Object.keys(agente).length !== 0 ? (
          <>
            

            <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline mb-5'>Información Personal</h1>
          <div className='flex mb-3'>
            <label className='mr-7'>Apellidos y Nombres</label>
            <input 
                  disabled value={agente.Apellido_Nombre}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
                       
          <div className='flex mb-3'>
            <label className='mr-7'>Grado</label>
            <input 
                  disabled value={agente.Grado}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Cédula</label>
            <input 
                  disabled value={agente.Cedula}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Título</label>
            <input 
                  disabled value={agente.Titulo}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Idioma Extranjero</label>
            <input 
                  disabled value={agente.IdiomaExtranjero}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Fecha Nacimiento</label>
            <input 
                  disabled value={agente.FechaNacimiento}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Género</label>
            <input 
                  disabled value={agente.Genero}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Estado Civil</label>
            <input 
                  disabled value={agente.Estado_Civil}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Email</label>
            <input 
                  disabled value={agente.Email}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Teléfono</label>
            <input 
                  disabled value={agente.Telefono}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Licencia</label>
            <input 
                  disabled value={agente.Licencia}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Residencia</label>
            <input 
                  disabled value={agente.Residencia}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
        </div>
        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline mb-5'>Información de Contacto</h1>
          <div className='flex mb-3'>
            <label className='mr-7'>Nombres Familiar</label>
            <input 
                  disabled value={agente.NombresFamiliar}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Parentesco</label>
            <input 
                  disabled value={agente.Parentesco}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Teléfono Familiar</label>
            <input 
                  disabled value={agente.TelefonoFamiliar}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
        </div>
        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline mb-5'>Otros</h1>
          <div className='flex mb-3'>
            <label className='mr-7'>PaseDNTH</label>
            <input 
                  disabled value={agente.PaseDNTH}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Función</label>
            <input 
                  disabled value={agente.Funcion}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Novedad</label>
            <input 
                  disabled value={agente.Novedad}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Detalle</label>
            <input 
                  disabled value={agente.Detalle}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Documento</label>
            <input 
                  disabled value={agente.Documento}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Terno</label>
            <input 
                  disabled value={agente.Terno}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Camisa</label>
            <input 
                  disabled value={agente.Camisa}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Calzado</label>
            <input 
                  disabled value={agente.Calzado}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Cabeza</label>
            <input 
                  disabled value={agente.Cabeza}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
        </div>

            
          </>
        ) : (
          Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}

    </div>
  )
}

export default VisualizarAgente