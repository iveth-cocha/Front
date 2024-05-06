import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import Mensaje from '../Alertas/Mensaje';

const RegistroUsu = () => {
  //---------------logica para autocompletado
  const [usuarios, setUsuarios] = useState([]);
  const [selectedAgente, setSelectedAgente] = useState(null);
  const [mensaje, setMensaje] = useState({});

  useEffect(() => {
    const obtenerAgentes = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = `${import.meta.env.VITE_BACKEND_URL}/agentes`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        const respuesta = await axios.get(url, options);
        const agentes = respuesta.data.map(agente => ({
          cedula: agente.Cedula,
          nombre: agente.Apellido_Nombre,
          grado: agente.Grado,
          email: agente.Email
        }));
        setUsuarios(agentes);
      } catch (error) {
        console.error('Error al obtener la información de los agentes:', error);
      }
    };

    obtenerAgentes();
  }, []);

  const handleAgenteSelect = (event, value) => {
    setSelectedAgente(value);
    console.log('Agente seleccionado:', value);
  };
  //-------------logica oara registrar usuario


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BACKEND_URL}/registro`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const form = {
        agenteID: selectedAgente ? selectedAgente.split(' - ')[0] : '',
        nombre: selectedAgente ? selectedAgente.split(' - ')[1] : '',
        email: usuarios.find(agente => `${agente.cedula} - ${agente.nombre}` === selectedAgente)?.email,
        Rol: document.getElementById('Rol').value
      };
      await axios.post(url, form, options);
      setMensaje({ respuesta: 'Registro exitoso', tipo: true });
      
    } catch (error) {
      setMensaje({respuesta:error?.response?.data?.msg,tipo:false});
      setTimeout(() => {
        setMensaje({});
      }, 2000);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center pt-8'>
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={usuarios.map(agente => `${agente.cedula} - ${agente.nombre}`)}
          onChange={handleAgenteSelect}
          renderInput={(params) => <TextField {...params} label="Cédula - Nombre" />}
        />
        <form className='w-96' onSubmit={handleSubmit}>
          {mensaje.respuesta && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
          <div className='flex items-center justify-center mb-2'>
            <label className='mr-7'>Cédula: </label>
            <input
              type="text"
              disabled
              id='agenteID'
              value={selectedAgente ? selectedAgente.split(' - ')[0] : ''}
              className='border-2 w-full p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
            />
          </div>
          
          <div className='flex items-center justify-center mb-2'>
            <label className='mr-7'>Nombre: </label>
            <input
              type="text"
              disabled
              name='nombre'
              value={selectedAgente ? selectedAgente.split(' - ')[1] : ''}
              className='border-2 w-96 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
            />
          </div>
          <div className='flex items-center justify-center mb-2'>
            <label className='mr-7'>Correo: </label>
            <input
              type="text"
              disabled
              name='email'
              value={usuarios.find(agente => `${agente.cedula} - ${agente.nombre}` === selectedAgente)?.email || ''}
              className='border-2 w-full p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Rol:</label>
            <select className='border-2 w-2000 p-2 mt-2 rounded-md mb-5' id='Rol'>
              <option value="">Seleccione el rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Registrador">Registrador</option>
              <option value="Visualizador">Visualizador</option>
            </select>
          </div>
          <div className='mt-6'>
            <button className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-blue-900 hover:text-white">Crear Usuario</button>
          </div>
        </form>
      </Stack>
    </div>
  );
};

export default RegistroUsu;
