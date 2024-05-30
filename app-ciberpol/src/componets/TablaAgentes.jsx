import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FilterMatchMode, FilterService } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

import axios from 'axios';
import { MdDeleteForever, MdEditDocument } from 'react-icons/md';
import { VscOpenPreview } from 'react-icons/vsc';


const TablaAgentes = () => {
  const navigate = useNavigate();

  const [agentes, setAgentes] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Apellido_Nombre: { value: '', matchMode: FilterMatchMode.CONTAINS },
  });

  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const listarAgentes = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BACKEND_URL}/agentes`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(url, options);
      setAgentes(respuesta.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarAgentes();
  }, []);

  const headerAgentes = (
    <div className="flex flex-col py-3 w-15">
      <span>Nombre y Apellido</span>
      <InputText
        value={filters.Apellido_Nombre.value}
        onChange={(e) => setFilters({ ...filters, Apellido_Nombre: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })}
        placeholder="Buscar"
        className="px-5 text-gray-500 border border-gray-700 rounded-full h-8"
      />
    </div>
  );

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <VscOpenPreview
          title="Detalle"
          className="h-7 w-7 text-blue-800 cursor-pointer inline-block mr-2"
          onClick={() => navigate(`/agentes/VisualizarAgente/${rowData.Cedula}`)}
        />
        <MdEditDocument
          title="Actualizar"
          className="h-7 w-7 text-green-600 cursor-pointer inline-block mr-2"
          onClick={() => navigate(`/agentes/actualizarAgente/${rowData.Cedula}`)}
        />
        <MdDeleteForever
          onClick={() => handleDelete(rowData.id)}
          className="h-7 w-7 text-red-900 cursor-pointer inline-block"
        />
      </React.Fragment>
    );
  };

  const tableStyle = {
    header: {
      backgroundColor: '#203C6B',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold', 
        alignItems:'center',
        
    }
};


  return (
    <div className=" flex justify-center">
    <DataTable
      value={agentes}
      sortField="ORD"
      sortOrder={1} // Ascendente
      paginator
      rows={10}
      dataKey="id"
      filters={filters}
      filterDisplay="row"
      loading={loading}
      globalFilterFields={['Apellido_Nombre']}
      emptyMessage="No Existe el Agente Buscado"
        style={tableStyle.header}

    >
      <Column className="text-center w-10 text-black bg-white my-20 border-b border-r border-slate-200 " field="ORD" header="N° " />
      <Column className="text-center w-36 text-black bg-white my-20 border-b border-r border-slate-200 " field="Cedula" header="Cédula " />
      <Column className="text-center w-10 text-black bg-white border-b  border-r border-slate-200" field="Grado" header="Grado" />
      <Column className="text-center w-64 text-black bg-white border-b  border-r border-slate-200" header={headerAgentes} field="Apellido_Nombre" style={{ minWidth: '8rem' }} />
      <Column className="text-center w-72 text-black bg-white my-20 border-b border-r border-slate-200 " field="Funcion" header="Función" />
      <Column className="text-center w-auto text-black bg-white  justify-center items-center border-b border-slate-200" body={actionBodyTemplate} header=" Acciones" style={{ minWidth: '8rem' }} />

    </DataTable>
  </div>
  )
}

export default TablaAgentes