import React from 'react'
import Fiscalias from '../AutoComplete/Fiscalias'

const Fiscal = () => {
  return (
      <div className='rounded-md border-2 border-sky-950 p-8 mb-2' >
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>fiscal</h1>

          <div className='flex mb-3'>
              <label className='mr-7'>Apellidos y Nombres del Fiscal</label>
              <input type="String" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <p className='text-red-500'>anadir para fiscalia autocompletado  y numero, que se concadenan en "Unidad Especializada de Fiscalia"</p>
          <Stack spacing={2} sx={{ width: 300 }}>
              <Autocomplete
                  id="fiscalia-autocomplete"
                  freeSolo
                  options={fiscaliaNom}
                  onChange={handleFiscaliaSelect}
                  renderInput={(params) => <TextField {...params} label="Fiscalía Nombre" />}
              />

              <div className='flex mb-3'>
                  <label className='mr-4'>N° Fiscalía:</label>
                  <input
                      type="number"
                      value={numeroFiscalia}
                      onChange={handleNumeroFiscaliaChange}
                      className="block w-15 h-10 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
                  />
              </div>

              <div className='flex mb-3'>
                  <label className='mr-4'>Unidad Especializada de Fiscalía:</label>
                  <textarea
                      type="text"
                      disabled
                      value={`${selectedFiscalia} - ${numeroFiscalia}`}
                      className="block w-200 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
                  />
              </div>


          </Stack>


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
              <input type="text" className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
              <label className='mr-7'>Plazo Otrogado (Días)</label>
              <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
              <label className='mr-7'>N° art.444 COIP</label>
              <input type="String" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>






      </div>
  )
}

export default Fiscal