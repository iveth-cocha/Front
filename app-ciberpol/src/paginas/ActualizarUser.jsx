import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiCaretLeftCircle } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'
import Mensaje from '../componets/Alertas/Mensaje'
import RegistroUsu from '../componets/formularios/RegistroUsu'



const ActualizarUser = () => {
    const navigate = useNavigate();

    const { id } = useParams()
    const [usuario, setUsuario] = useState(null);
    const [mensaje, setMensaje] = useState({});
  
    useEffect(() => {
      const consultarUsuario = async () => {
        try {
          const token = localStorage.getItem('token');
          const url = `${import.meta.env.VITE_BACKEND_URL}/detalle/usuario/${id}`;
          
          const options = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          };
          const respuesta = await axios.get(url, options);
          setUsuario(respuesta.data.msg);
          
        } catch (error) {
          setMensaje({ respuesta: error.response.data.msg, tipo: false });
        }
      };
  
      consultarUsuario();
    }, []);
  
    return (
        <div>
            <div className='flex items-center'>
                <BiCaretLeftCircle className='text-4xl text-sky-950'
                    onClick={() => navigate(`/usuarios`)} />
                <h1 className='font-black text-4xl text-gray-500 uppercase'>Actualizar usuario</h1>
            </div>
            <hr className='my-4 border-sky-950  ' />
                     


            {usuario && Object.keys(usuario).length !== 0 ? (
                <RegistroUsu usuario={usuario} />
            ) : (
                Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}
        </div>
    );
  };
  
  export default ActualizarUser;
