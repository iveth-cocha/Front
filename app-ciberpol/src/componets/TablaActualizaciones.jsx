import React from 'react'
import { VscOpenPreview } from 'react-icons/vsc'


export const TablaActualizaciones = () => {
    
  return (
    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
            <thead className='bg-sky-950 text-white'>
                <tr>
                    <th className='p-2'>Usuario</th>
                    <th className='p-2'>Rol</th>                    
                    <th className='p-2'>CI</th>
                    <th className='p-2'>N° Investigación Previa</th>
                    <th className='p-2'>Detalle</th>
                    
                    
                </tr>
            </thead>
            <tbody>
                <tr className="border-b hover:bg-gray-300 text-center">
                    <td>nombre</td>
                    <td>registrador</td>
                    <td>1700000001</td>
                    <td>00023</td>
                    
                    <td className='py-2 text-center'>
                        <VscOpenPreview  className="h-7 w-7 text-blue-800 cursor-pointer inline-block mr-2"    />

                        
                    </td>
                </tr>
            </tbody>
        </table>
  )
}
