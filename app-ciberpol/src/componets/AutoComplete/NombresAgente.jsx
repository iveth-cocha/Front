import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const NombresAgente = () => {
  const [agenteNom, setAgenteNom] = useState([]);
  const [agenteGrado, setAgenteGrado] = useState({});
  const [selectedAgente, setSelectedAgente] = useState('');

  useEffect(() => {
    const agentesNombres = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = `${import.meta.env.VITE_BACKEND_URL}//agentes`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        const respuesta = await axios.get(url, options);
        const nombresAgentes = respuesta.data.map(agentes => {
          const nombre = `${agentes.Apellido_Nombre}`;
          const grado = agentes.Grado;
          //console.log(`Nombre: ${nombre}, Grado: ${grado}`);
          setAgenteGrado(prevState => ({
            ...prevState,
            [nombre]: grado
          }));
          return nombre;
        });
        setAgenteNom(nombresAgentes);
      } catch (error) {
        //console.error('Error al obtener los nombres de los agentes:', error);
      }
    };

    agentesNombres();
  }, []);

  const handleClientSelect = (event, value) => {
    setSelectedAgente(value);
    //console.log('Agente seleccionado:', value);
  };

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={agenteNom}
        onChange={handleClientSelect}
        renderInput={(params) => <TextField {...params} />}
      />

      <div className='flex flex-row'>
        <label className='mr-7 pt-5'>Grado Agente: </label>
        <input type="text" 
        disabled
        value={selectedAgente && agenteGrado[selectedAgente]}
        className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
        />
        
      </div>
    </Stack>
  );
};
export default NombresAgente;
