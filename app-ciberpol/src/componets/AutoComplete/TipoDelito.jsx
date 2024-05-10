import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const TipoDelito = () => {
  const [delitoNom, setDelitoNom] = useState([]);
  const [delitoData, setDelitoData] = useState({});
  const [delitoSeccion, setDelitoSeccion] = useState({});
  const [selectedDelito, setSelectedDelito] = useState('');

  useEffect(() => {
    const obtenerDelitos = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = `${import.meta.env.VITE_BACKEND_URL}/delitos`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        const respuesta = await axios.get(url, options);
        const delitos = respuesta.data.map(delito => {
          const nombreDelito = `${delito.delito} - ${delito.seccion} `;
          const seccion = delito.seccion;
          console.log(`Nombre: ${nombreDelito}, seccion: ${seccion}`);
          setDelitoData(prevState => ({
            ...prevState,
            [nombreDelito]: {
              seccion: delito.seccion,
              delito: delito.delito
            }
          }));
          return nombreDelito;
        });
        setDelitoNom(delitos);
      } catch (error) {
        console.error('Error al obtener los delitos:', error);
      }
    };

    obtenerDelitos();
  }, []);

  const handleClientSelect = (event, value) => {
    setSelectedDelito(value);
    console.log('delito seleccionado:', value);
  };

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={delitoNom}
        onChange={handleClientSelect}
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

      {/* <div>
        <p>
          <span className='mr-7'>Tipo Delito:</span>
          {selectedDelito && delitoSeccion[selectedDelito]}
          {console.log('Email Cliente:', selectedDelito && delitoSeccion[selectedDelito])}
        </p>
      </div> */}

      {/* <div>
        <p>
          <span className='mr-7 '>Tipo Desgregado</span>
          {selectedDelito && delitoSeccion[selectedDelito]}
          {console.log('Email Cliente:', selectedDelito && delitoSeccion[selectedDelito])}
        </p>
      </div> */}
      





    </Stack>
  );
};
export default TipoDelito;
