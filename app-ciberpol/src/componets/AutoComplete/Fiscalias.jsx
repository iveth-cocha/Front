import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const Fiscalias = () => {
    const [fiscaliaNom, setFiscaliaNom] = useState([]);
    const [selectedFiscalia, setSelectedFiscalia] = useState('');
    const [numeroFiscalia, setNumeroFiscalia] = useState('');
  
    const handleNumeroFiscaliaChange = (event) => {
      setNumeroFiscalia(event.target.value);
    };
  
    useEffect(() => {
      const obtenerFiscalias = async () => {
        try {
          const token = localStorage.getItem('token');
          const url = `${import.meta.env.VITE_BACKEND_URL}/fiscalias`;
          const options = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          };
          const respuesta = await axios.get(url, options);
          const nombresFiscalias = respuesta.data.map(fiscalias => fiscalias.N_fiscalia);
          setFiscaliaNom(nombresFiscalias);
        } catch (error) {
          console.error('Error al obtener las fiscalias:', error);
        }
      };
  
      obtenerFiscalias();
    }, []);
  
    const handleFiscaliaSelect = (event, value) => {
      setSelectedFiscalia(value);
    };
  
    return (
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
    );
  };
  
  export default Fiscalias;