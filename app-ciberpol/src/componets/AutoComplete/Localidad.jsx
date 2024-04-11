import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const Localidad = () => {
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
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={clientNames}
        onChange={handleClientSelect}
        renderInput={(params) => <TextField {...params} label="Codigo-Distrito-Zona" />}
      />

      <div>
        <p>
          <span className='mr-7'>Cod Distrito:</span>
          {selectedClient && clientEmails[selectedClient]}
          {console.log('Email Cliente:', selectedClient && clientEmails[selectedClient])}
        </p>
      </div>
      <div>
        <p>
          <span className='mr-7'>Distrito:</span>
          {selectedClient && clientEmails[selectedClient]}
          {console.log('Email Cliente:', selectedClient && clientEmails[selectedClient])}
        </p>
      </div>
      <div>
        <p>
          <span className='mr-7'>Zona:</span>
          {selectedClient && clientEmails[selectedClient]}
          {console.log('Email Cliente:', selectedClient && clientEmails[selectedClient])}
        </p>
      </div>
      <div>
        <p>
          <span className='mr-7'>Cantón:</span>
          {selectedClient && clientEmails[selectedClient]}
          {console.log('Email Cliente:', selectedClient && clientEmails[selectedClient])}
        </p>
      </div>
      <div>
        <p>
          <span className='mr-7'>Provincia:</span>
          {selectedClient && clientEmails[selectedClient]}
          {console.log('Email Cliente:', selectedClient && clientEmails[selectedClient])}
        </p>
      </div>





    </Stack>
  );
};
export default Localidad;
