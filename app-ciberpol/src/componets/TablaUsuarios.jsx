import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdEditDocument } from "react-icons/md";
import Mensaje from './Alertas/Mensaje';
import axios from 'axios';


const TablaUsuarios = () => {

    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState([])
   

    const listarUsuarios = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/usuarios`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setUsuarios(respuesta.data, ...usuarios)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listarUsuarios();
    }, [])

    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm("Eliminar el usuario");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/eliminar/usuario/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };
    
                // Si necesitas enviar datos adicionales, defínelos aquí
                // const data = { /* datos adicionales */ };
    
                // Si no necesitas enviar datos adicionales, elimina `{ data }`
                await axios.delete(url, { headers /*, data */ });
    
                // Después de eliminar el usuario, actualiza la lista de usuarios
                listarUsuarios();
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (

        <>
            {
                usuarios.length == 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen Usuarios'}</Mensaje>
                    :

                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-sky-950 text-white'>
                            <tr>
                                <th className='p-2'>N° </th>
                                <th className='p-2'>Grado</th>
                                <th className='p-2'>Nombre y Apellido</th>
                                <th className='p-2'>Cédula</th>
                                <th className='p-2'>Rol</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usuarios.map((usuarios, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={usuarios._id}>
                                        <td>{index + 1}</td>
                                        <td>{usuarios.Grado}</td>
                                        <td>{usuarios.nombre}</td>
                                        <td>{usuarios.agenteID}</td>
                                        <td>{usuarios.Rol}</td>
                                        <td className='py-2 text-center'>
                                            <MdEditDocument title='Actualizar' className="h-7 w-7 text-green-600 cursor-pointer inline-block mr-2" onClick={() => navigate(`/usuarios/actualizarUsuario/${usuarios.id}`)}   />

                                            <MdDelete title='Eliminar' className="h-7 w-7 text-red-900 cursor-pointer inline-block" onClick={() => {handleDelete(usuarios.id)}} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            }
        </>

    )
}

export default TablaUsuarios