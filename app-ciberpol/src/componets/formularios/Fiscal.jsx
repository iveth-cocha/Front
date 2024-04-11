import React from 'react'

const Fiscal = () => {
  return (
    <div className='rounded-md border-2 border-sky-950 p-8 mb-2' >
        <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>fiscal</h1>
        
              <div className='flex mb-3'>
                  <label className='mr-7'>Apellidos y Nombres del Fiscal</label>
                  <input type="String" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
              </div>

              <div className='flex mb-3'>
                  <label className='mr-4'>Unidad Especializada de Fiscalia</label>
                  <input type="String" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
              </div>

              <div className='flex mb-3'>
                  <label className='mr-11'>Fecha de la Delegación</label>
                  <input type="Date" className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
              </div>
              <div className='flex mb-3'>
                  <label className='mr-7'>Fecha de Recepción en CIBERPOL</label>
                  <input type="Date" className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
              </div>
              <div className='flex mb-3'>
                  <label className='mr-7'>Fecha de Recepción por parte del Agente Investigador </label>
                  <input type="Date" className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
              </div>

              <div className='flex mb-3'>
                  <label className='mr-7'>N° de Oficio con la que recibe la Diligencia el Agente</label>
                  <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
              </div>
              <div className='flex mb-3'>
                  <label className='mr-7'>Plazo Otrogado (Días)</label>
                  <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
              </div>
              <div className=' mb-3'>
                    <label className='mr-7'>N° art.444 COIP</label>
                    <div>
                        <label>
                            <input type="radio" name="articuloCOIP2" value="2" />2
                        </label>
                        <label className="ml-3">
                            <input type="radio" name="articuloCOIP4" value="4" />4
                        </label>
                        <label className="ml-3">
                            <input type="radio" name="articuloCOIP5" value="5" />5
                        </label>
                        <label className="ml-3">
                            <input type="radio" name="articuloCOIP6" value="6" />6
                        </label>
                        <label className="ml-3">
                            <input type="radio" name="articuloCOIP8" value="8" />8
                        </label>
                        <label className="ml-3">
                            <input type="radio" name="articuloCOIP9" value="9" />9
                        </label>
                        <label className="ml-3">
                            <input type="radio" name="articuloCOIP10" value="10" />10
                        </label>
                        <label className="ml-3">
                            <input type="radio" name="articuloCOIP11" value="11" />11
                        </label>
                        <label className="ml-3">
                            <input type="radio" name="articuloCOIP12" value="12" />12
                        </label>
                        <label className="ml-3">
                            <input type="radio" name="articuloCOIP14" value="14" />14
                        </label>
                        <label className=" ml-3">
                            <input type="radio" name="articuloCOIP0 " value="otros"/>Otros
                            <input type="text" className="ml-4 w-1250 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
                        </label>
                        
                    </div>
              </div>


       
    
    
    
    </div>
  )
}

export default Fiscal