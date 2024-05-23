


import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FilterMatchMode, FilterService } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';

  const TablaDelitos = () => {
    const navigate = useNavigate();

    const [delitos, setDelitos] = useState(null);
    const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      delito: { value: null, matchMode: FilterMatchMode.CONTAINS },
      seccion: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
  
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
  
    const listarDelitos = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = `${import.meta.env.VITE_BACKEND_URL}/delitos`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        const respuesta = await axios.get(url, options);
        setDelitos(respuesta.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      listarDelitos();
    }, []);
  
    const onGlobalFilterChange = (e) => {
      const value = e.target.value;
      let _filters = { ...filters };
  
      _filters['global'].value = value;
  
      setFilters(_filters);
      setGlobalFilterValue(value);
    };
  
    const headerDelito = (
      <div className="flex flex-col my-2  pl-36 justify-center items-center">
        <span>Delito</span>
        <InputText
          value={filters.delito.value || ''}
          onChange={(e) => setFilters({ ...filters, delito: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })}
          placeholder="Buscar Delito"
          className="px-5  text-gray-500 border border-gray-700 rounded-full h-8"
        />
      </div>
    );
    
    const headerSeccion = (
      <div className="flex flex-col my-2 pl-40 justify-center items-center">
        <span className='' >Seccion</span>
        <InputText
          value={filters.seccion.value || ''}
          onChange={(e) => setFilters({ ...filters, seccion: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })}
          placeholder="Buscar"
          className="px-5  text-gray-500 border border-gray-700 rounded-full h-8"
        />
      </div>
    );
    const handleDelete = async (id) => {
      try {
          const confirmar = confirm("Eliminar el delito")
          if (confirmar) {
              const token = localStorage.getItem('token')
              const url = `${import.meta.env.VITE_BACKEND_URL}/eliminar/delito/${id}`
              const headers= {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`
                  }
              await axios.delete(url, {headers});
              listarDelitos();
          }
      }
      catch (error) {
          console.log(error);
      }
  }
  
    const actionBodyTemplate = (rowData) => {
      return (
          <React.Fragment>
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
      <div className=" flex w-full">
      <DataTable
        value={delitos}
        paginator rows={10}
        dataKey="id" filters={filters} filterDisplay="row"
        loading={loading} globalFilterFields={['delito', 'seccion']}
        emptyMessage="No se encontró el delito ingresado"
          style={tableStyle.header}

      >
        
        <Column className="text-center px-3   text-black bg-white border-b  border-r border-slate-200" header={headerDelito} field="delito" style={{width:'35rem'}}  />
        <Column className="text-center  text-black bg-white border-b  border-r border-slate-200" header={headerSeccion} field="seccion" style={{width:'40rem'}}/>
        <Column className="text-center w-20 text-black bg-white  justify-center items-center border-b border-slate-200" body={actionBodyTemplate} header="Borrar"  />

      </DataTable>
    </div>
     
    );
  };
  
  export default TablaDelitos;