import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdDeleteForever,MdEditDocument  } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom'
import Mensaje from './Alertas/Mensaje';

const TablaDelegaciones = () => {

    const navigate = useNavigate()

    const [delegaciones, setDelegaciones] = useState([])
    const [mensaje, setMensaje] = useState({})

    const listarDelegaciones = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/delegaciones`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setDelegaciones(respuesta.data, ...delegaciones)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listarDelegaciones();
    }, [])
  return (
      <>
          {
              delegaciones.length == 0
                  ?
                  <Mensaje tipo={'active'}>{'No existen Usuarios'}</Mensaje>
                  :

                  <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                      <thead className='bg-sky-950 text-white'>
                          <tr>
                              <th className='p-2'>N° de orden</th>
                              <th className='p-2'>Año Ingreso</th>
                              <th className='p-2'>N° Instrucción Fiscal</th>
                              <th className='p-2'>N° Investigación Previa</th>
                              <th className='p-2'>Grado</th>
                              <th className='p-2'>Agente</th>
                              <th className='p-2'>Acciones</th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                              delegaciones.map((delegaciones) => (
                                  <tr className="border-b hover:bg-gray-300 text-center" key={delegaciones._id}>
                                      <td>{delegaciones.orden}</td>
                                      <td>{delegaciones.anio_ingreso}</td>
                                      <td>{delegaciones.numero_instruccion_fiscal}</td>
                                      <td>{delegaciones.numero_investigacion_previa}</td>
                                      <td>{delegaciones.grado_agente}</td>
                                      <td>{delegaciones.appellidos_nombres_agente}</td>
                                      <td className='py-2 text-center'>
                                          <VscOpenPreview title='Detalle' className="h-7 w-7 text-blue-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/delegaciones/detalleDelegacion`)} />

                                          <MdEditDocument title='Actualizar' className="h-7 w-7 text-green-600 cursor-pointer inline-block mr-2" onClick={() => navigate(`/delegaciones/actualizarDelegacion`)} />

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

export default TablaDelegaciones