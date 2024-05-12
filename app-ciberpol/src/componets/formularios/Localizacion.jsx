import React from 'react'
import Localidad from '../AutoComplete/Localidad'

const Localizacion = () => {
  return (
    <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Localización</h1>

          <div className='flex mb-3'>
            <label className='mr-7'>Realice la Búsqueda para la Localización </label>
            <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={codDistrito}
        onChange={handleLocalizacionSelect}
        renderInput={(params) => <TextField {...params} label="Codigo-Distrito-Zona" />}
      />

      <div className='flex flex-row'>
        <label className='mr-7 pt-5'>Cod Distrito:</label>
        <input type="text"
          disabled
          value={selectedLocalidad && distrito[selectedLocalidad]?.cod_distrito}
          className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
        />
      </div>

      <div className='flex flex-row'>
        <label className='mr-7 pt-5'>Distrito:</label>
        <input type="text"
          disabled
          value={selectedLocalidad && distrito[selectedLocalidad]?.distrito}
          className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
        />
      </div>
      <div className='flex flex-row'>
        <label className='mr-7 pt-5'>Zona:</label>
        <input type="text"
          disabled
          value={selectedLocalidad && distrito[selectedLocalidad]?.zona}
          className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
        />
      </div>
      <div className='flex flex-row'>
        <label className='mr-7 pt-5'>Canton:</label>
        <input type="text"
          disabled
          value={selectedLocalidad && distrito[selectedLocalidad]?.canton}
          className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
        />
      </div>
      {/* Agrega más divs para otras propiedades si es necesario */}
      <div className='flex flex-row'>
        <label className='mr-7 pt-5'>Provincia:</label>
        <input type="text"
          disabled
          value={selectedLocalidad && distrito[selectedLocalidad]?.subzona}
          className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
        />
      </div>
    </Stack>
          </div>

    </div>
  )
}

export default Localizacion