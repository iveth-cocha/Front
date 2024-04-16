import React from 'react'

const Informe = () => {
    return (
        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
            <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>observaciones</h1>
            <div className='flex  mb-3'>
                <label className='mr-7 '>Informe o Descargo</label>
                <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
                    <option value="">Seleccione una opcion</option>
                    <option >aaaa</option>
                </select>
            </div>
            <div className='flex mb-3'>
                <label className='mr-7'>Causas de Incumplimineto de la Investigación</label>
                <input type="String" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
            </div>
            <div className='flex mb-3'>
                  <label className='mr-7'>Nombre del los Detenidos producto de la Investigación</label>
                  <input type="String" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
              </div>
              <div className='flex mb-3'>
                  <label className='mr-7'>Observaciones</label>
                  <input type="String" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
              </div>
              <div className='flex mb-3'>
                  <label className='mr-7'>Cantidad Sustraida</label>
                  <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
              </div>
              <div className='flex mb-3'>
                  <label className='mr-7'>Entidad Financiera</label>
                  <input type="String" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
              </div>


        </div>
    )
}

export default Informe