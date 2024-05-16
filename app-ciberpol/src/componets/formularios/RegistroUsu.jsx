import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import Mensaje from '../Alertas/Mensaje';
import { useNavigate } from 'react-router-dom';

const RegistroUsu = ({ usuario }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedAgente, setSelectedAgente] = useState(null);
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    agenteID: usuario?.agenteID ?? '',
    nombre: usuario?.nombre ?? '',
    email: usuario?.email ?? '',
    Rol: usuario?.Rol ?? ''
  });

  

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

  useEffect(() => {
    if (selectedAgente) {
      const agente = usuarios.find(agente => `${agente.cedula} - ${agente.nombre}` === selectedAgente);
      if (agente) {
        setForm(prevForm => ({
          ...prevForm,
          agenteID: agente.cedula,
          nombre: agente.nombre,
          email: agente.email
        }));
      }
    }
  }, [selectedAgente, usuarios]);

  const handleAgenteSelect = (event, value) => {
    setSelectedAgente(value);
  };

  const handleRolChange = (e) => {
    setForm(prevForm => ({
      ...prevForm,
      Rol: e.target.value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(usuario?.id){
      const token = localStorage.getItem('token');
      let url = `${import.meta.env.VITE_BACKEND_URL}/actualizar/usuario/${usuario?.id}`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      await axios.put(url, form, options)
      setMensaje({ respuesta: 'Rol Actualizado correctamente', tipo: true });
        setTimeout(() => {
          navigate('/usuarios');
        }, 2000);

    }else{
      try {
        const token = localStorage.getItem('token');
        let url = `${import.meta.env.VITE_BACKEND_URL}/registro`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        await axios.post(url, form, options);
        setMensaje({ respuesta: 'Registro exitoso', tipo: true });
        setTimeout(() => {
          navigate('/usuarios');
        }, 3000);
      } catch (error) {
        setMensaje({ respuesta: error?.response?.data?.msg, tipo: false });
        setTimeout(() => {
          setMensaje({});
        }, 2000);
      }

    }
    
  };


  return (
    <div className='flex flex-col justify-center items-center pt-8'>
       {!usuario?.id && (
        <Stack spacing={2} sx={{ width: 300 }}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={usuarios.map(agente => `${agente.cedula} - ${agente.nombre}`)}
            onChange={handleAgenteSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cédula - Nombre"
              />
            )}
          />
        </Stack>
      )}
      <form className='w-96' onSubmit={handleSubmit}>
          {mensaje.respuesta && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
          <div className='flex items-center justify-center mb-2'>
            <label className='mr-7'>Cédula: </label>
            <input
              type="text"
              disabled
              id='agenteID'
              value={form.agenteID}
              className='border-2 w-full p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
            />
          </div>

          <div className='flex items-center justify-center mb-2'>
            <label className='mr-7'>Nombre: </label>
            <input
              type="text"
              disabled
              name='nombre'
              value={form.nombre}
              className='border-2 w-96 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
            />
          </div>
          <div className='flex items-center justify-center mb-2'>
            <label className='mr-7'>Correo: </label>
            <input
              type="text"
              disabled
              name='email'
              value={form.email}
              className='border-2 w-full p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
            />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Rol:</label>
            <select className='border-2 w-2000 p-2 mt-2 rounded-md mb-5' id='Rol' onChange={handleRolChange} value={form.Rol}>
              <option value="">Seleccione el rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Registrador">Registrador</option>
              <option value="Visualizador">Visualizador</option>
            </select>
          </div>
          <div className='mt-6'>
            <input type="submit"   value={usuario?.id ? 'Actualizar Usuario' : 'Registrar Usuario'} className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-blue-900 hover:text-white"></input>
          </div>
        </form>
    </div>
  );
};

export default RegistroUsu;
