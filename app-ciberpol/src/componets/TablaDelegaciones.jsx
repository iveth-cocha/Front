import React from 'react'
import { MdDeleteForever,MdEditDocument  } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";

const TablaDelegaciones = () => {
  return (
    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
            <thead className='bg-sky-950 text-white'>
                <tr>
                    <th className='p-2'>N°</th>
                    <th className='p-2'>N° de instrucción fiscal</th>
                    <th className='p-2'>N° de investigación previa</th>
                    <th className='p-2'>Grado</th>
                    <th className='p-2'>Agente</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b hover:bg-gray-300 text-center">
                    <td>nombre</td>
                    <td>nombre</td>
                    <td>nombre</td>
                    <td>nombre</td>
                    <td className='py-2 text-center'>
                        <VscOpenPreview className="h-7 w-7 text-blue-800 cursor-pointer inline-block mr-2"/>

                        <MdEditDocument className="h-7 w-7 text-green-600 cursor-pointer inline-block mr-2"/>

                        <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block"/>
                    </td>
                </tr>
            </tbody>
        </table>
  )
}

export default TablaDelegaciones