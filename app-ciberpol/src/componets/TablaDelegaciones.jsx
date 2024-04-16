import React from 'react'
import { MdDeleteForever,MdEditDocument  } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom'

const TablaDelegaciones = () => {

    const navigate = useNavigate()
  return (
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
                <tr className="border-b hover:bg-gray-300 text-center">
                    <td>1</td>
                    <td>2024</td>
                    <td>002</td>
                    <td>00023</td>
                    <td>Gral</td>
                    <td>nombre</td>
                    <td className='py-2 text-center'>
                        <VscOpenPreview title='Detalle'  className="h-7 w-7 text-blue-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/Delegaciones/DetalleDelegacion`)} />

                        <MdEditDocument  title='Actualizar' className="h-7 w-7 text-green-600 cursor-pointer inline-block mr-2"  onClick={() => navigate(`/Delegaciones/ActualizarDelegacion`)} />

                        <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block"/>
                    </td>
                </tr>
            </tbody>
        </table>
  )
}

export default TablaDelegaciones