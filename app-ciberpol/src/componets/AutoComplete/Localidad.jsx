import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const Localidad = () => {
  const [codDistrito, setCodDistrito] = useState([]);
  const [distrito, setDistrito] = useState({});
  const [selectedLocalidad, setSelectedLocalidad] = useState('');

  useEffect(() => {
    const obtenerLocalidad = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = `${import.meta.env.VITE_BACKEND_URL}/localizaciones`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        const respuesta = await axios.get(url, options);
        const localidades = respuesta.data;
        
        // Mapear los datos de localidad y agregarlos a setDistrito
        const distritosMap = localidades.reduce((acc, localidad) => {
          const localidadesCom = `${localidad.cod_distrito} - ${localidad.distrito} - ${localidad.zona}`;
          acc[localidadesCom] = {
            id: localidad.id,
            cod_distrito: localidad.cod_distrito,
            distrito: localidad.distrito,
            zona: localidad.zona,
            canton: localidad.canton,
            subzona: localidad.subzona,
            
            // Agrega más propiedades aquí si es necesario
          };
          return acc;
        }, {});
        
        setDistrito(distritosMap);
        setCodDistrito(Object.keys(distritosMap));
      } catch (error) {
        console.error('Error al obtener las localidades', error);
      }
    };

    obtenerLocalidad();
  }, []);

  const handleLocalizacionSelect = (event, value) => {
    setSelectedLocalidad(value);
    console.log('localidad seleccionada:', value);
  };
  return (
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
  );
};

export default Localidad;