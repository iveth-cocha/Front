import React from 'react'
import { MdDeleteForever } from 'react-icons/md'

const TablaDelitos = () => {
  return (
    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
            <thead className='bg-sky-950 text-white'>
                <tr>
                    <th className='p-2'>Delito </th>
                    <th className='p-2'>Sección</th>                    
                    <th className='p-2'>Eliminar</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr className="border-b hover:bg-gray-300 text-center">
                    <td>Abigeato</td>
                    <td>Delitos contra el derecho a la propiedad</td>
                    
                    <td className='py-2 text-center'>
                        
                        <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block"/>
                    </td>
                </tr>
            </tbody>
        </table>
  )
}

export default TablaDelitos