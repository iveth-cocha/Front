import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';



const RegistroUsu = () => {
    const [clientNames, setClientNames] = useState([]);
  const [clientEmails, setClientEmails] = useState({});
  const [selectedClient, setSelectedClient] = useState('');

  useEffect(() => {
    const obtenerNombresClientes = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = `${import.meta.env.VITE_BACKEND_URL}/clientes`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        const respuesta = await axios.get(url, options);
        const nombresClientes = respuesta.data.map(cliente => {
          const nombreCompleto = `${cliente.nombre} ${cliente.apellido}`;
          const email = cliente.email;
          console.log(`Nombre: ${nombreCompleto}, Email: ${email}`);
          setClientEmails(prevState => ({
            ...prevState,
            [nombreCompleto]: email
          }));
          return nombreCompleto;
        });
        setClientNames(nombresClientes);
      } catch (error) {
        console.error('Error al obtener los nombres de los clientes:', error);
      }
    };

    obtenerNombresClientes();
  }, []);

  const handleClientSelect = (event, value) => {
    setSelectedClient(value);
    console.log('Cliente seleccionado:', value);
  };




  return (
    <div className='flex flex-col justify-center items-center pt-8'>
        <Stack spacing={2} sx={{ width: 300 }} >
      <Autocomplete 
      
        id="free-solo-demo"
        freeSolo
        options={clientNames}
        onChange={handleClientSelect}
        renderInput={(params) => <TextField {...params} label="cédula " />}
      />

      <div className='text-xl '>
        <form >
        <p className='mb-2' >
          <span className='mr-7'>Nombre y Apellido:</span>
          {selectedClient && clientEmails[selectedClient]}
          {console.log('Email Cliente:', selectedClient && clientEmails[selectedClient])}
        </p>
        <p className='mb-2'>
          <span className='mr-7'>Grado:</span>
          {selectedClient && clientEmails[selectedClient]}
          {console.log('Email Cliente:', selectedClient && clientEmails[selectedClient])}
        </p>
        <p className='mb-2'>
          <span className='mr-7'>Cédula:</span>
          {selectedClient && clientEmails[selectedClient]}
          {console.log('Email Cliente:', selectedClient && clientEmails[selectedClient])}
        </p>

        <div className='flex mb-3'>
                  <label className='mr-7'>Correo</label>
                  <input type="String" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
        </div>

            <div className='flex  mb-3'>
                <label className='mr-7 '>Rol:</label>
                <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
                    <option value="">Seleccione el rol</option>
                    <option >Administrador</option>
                    <option >Registrador</option>
                    <option >Visulaizador</option>
                </select>
            </div>

            <div className='mt-6'>
                <button  className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-blue-900 hover:text-white">Crear Usuario</button>
            </div>

        </form>
        
      </div>
    </Stack>
    </div>


    
    
  );
};

export default RegistroUsu