import React from 'react'
import TipoDelito from '../AutoComplete/TipoDelito'

const DelegacionesDelito = () => {
  return (
      <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>

          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Delito </h1>
          <div className='flex mb-3'>
              <label className='mr-7'>Delito Tipificado en Delegación</label>
              <Stack spacing={2} sx={{ width: 300 }}>
                  <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      options={delitoNom}
                      onChange={handleDelitoSelect}
                      renderInput={(params) => <TextField {...params} label="Delito - Sección" />}
                  />
                  <div className='flex flex-row'>
                      <label className='mr-7 pt-5'>Tipo Delito: </label>
                      <input type="text"
                          disabled
                          value={selectedDelito && delitoData[selectedDelito]?.seccion}
                          className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                      />

                  </div>
                  <div className='flex flex-row'>
                      <label className='mr-7 pt-5'>Tipo Desgregado: </label>
                      <input type="text"
                          disabled
                          value={selectedDelito && delitoData[selectedDelito]?.delito}
                          className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                      />

                  </div>
              </Stack>
          </div>

          <div className='flex mb-3'>
              <label className='mr-7'>Fecha de Infracción o Delito</label>
              <input type="Date" className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <div className='flex mb-3'>
              <label className='mr-7 '>Apellidos y Nombres de la Victima</label>
              <input type="String" className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <div className='flex  mb-3'>
              <label className='mr-7 '>Sexo</label>
              <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
                  <option value="">--Seleccione el sexo--</option>
                  <option value="FEMENINO">FEMENINO</option>
                  <option value="MASCULINO" >MASCULINO</option>
                  <option value="SIN DATO">SIN DATO</option>
              </select>
          </div>

          <div className='flex mb-3'>
              <label className='mr-7'>Edad</label>
              <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
      </div>
  )
}

export default DelegacionesDelito