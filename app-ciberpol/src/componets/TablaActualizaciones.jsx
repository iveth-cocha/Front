import axios from 'axios';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react'
import Mensaje from './Alertas/Mensaje';


export const TablaActualizaciones = () => {
  const [ingresos, setIngresos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [mensaje, setMensaje] = useState({})

  const listarMapeo = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BACKEND_URL}/mapeos`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(url, options);
      setIngresos(respuesta.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarMapeo();
  }, []);

  const tableStyle = {
    header: {
      backgroundColor: '#203C6B',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold', 
        alignItems:'center',
        
    }
};
const handleDelete = async () => {
  try {
    const token = localStorage.getItem('token');
    const url = `${import.meta.env.VITE_BACKEND_URL}/eliminar-mapeos`;
     const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
  await axios.delete(url, options );

  listarMapeo();
  setMensaje({ respuesta: 'Todos los mapeos han sido eliminados correctamente', tipo: true });
  setTimeout(() => {
    setMensaje({});
  }, 3000);
  } catch (error) {
      setMensaje({ respuesta: error?.response?.data?.msg, tipo: false });
      setTimeout(() => {
        setMensaje({});
      }, 3000);

  }
};
  return (
    <div>
      <div  className="flex justify-end">
      <input
        type="submit"
        className=' bg-gray-600 w-auto p-3  text-white font-bold rounded-lg 
                  hover:bg-red-500 cursor-pointer transition-all ml-auto mb-5'
                  onClick={handleDelete}  
        value='Eliminar registros de la tabla'
      />
      </div>
      
       <div>
        {mensaje.respuesta && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
        </div>
      <div className=" flex justify-center">
            
    <DataTable
      value={ingresos}
      sortField="id"
      sortOrder={1} // Ascendente
      paginator
      rows={10}
      dataKey="id"
      filterDisplay="row"
      loading={loading}
      
      emptyMessage="No Existen Ingresos en el Sistema"
        style={tableStyle.header}

    >
      <Column className="text-center w-10 text-black bg-white my-20 border-b border-r border-slate-200 " field="id" header="N° " />
      
      <Column className="text-center w-10 text-black bg-white border-b  border-r border-slate-200" field="grado" header="Grado" />
      <Column className="text-center w-64 text-black bg-white border-b  border-r border-slate-200" header="Agente" field="nombreAgente" style={{ minWidth: '8rem' }} />
      <Column className="text-center w-72 text-black bg-white my-20 border-b border-r border-slate-200 " field="Rol" header="Rol" />
      <Column className="text-center w-64 text-black bg-white border-b  border-r border-slate-200" header="Fecha y Hora de Ingreso" field="hora_entrada" style={{ minWidth: '8rem' }} />
      <Column className="text-center w-64 text-black bg-white border-b  border-r border-slate-200" header="Fecha y Hora de Salida" field="hora_salida" style={{ minWidth: '8rem' }} />

    </DataTable>
  </div>
    </div>
    
  )
}
