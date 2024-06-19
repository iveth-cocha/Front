import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterService } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { VscOpenPreview } from 'react-icons/vsc';
import { MdEditDocument } from 'react-icons/md';

const TablaDelegaciones = () => {

  const navigate = useNavigate();

  const [delegaciones, setDelegaciones] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    numero_instruccion_fiscal: { value: null, matchMode: FilterMatchMode.CONTAINS },
    numero_investigacion_previa: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const listarDelegaciones = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BACKEND_URL}/delegaciones`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(url, options);
      setDelegaciones(respuesta.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarDelegaciones();
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const headerNumeroInvestigacionPrevia = (
    <div className="p-d-flex p-ai-center py-3 w-15">
      <span>N° Investigación Previa</span>
      <InputText
        value={filters.numero_investigacion_previa.value || ''}
        onChange={(e) => setFilters({ ...filters, numero_investigacion_previa: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })}
        placeholder="Buscar"
        className="px-5  text-gray-500 border border-gray-700 rounded-full h-8"
      />
    </div>
  );

  const headerNumeroInstruccionFiscal = (
    <div className="p-d-flex p-ai-center py-3 w-15">
      <span>N° Instrucción Fiscal</span>
      <InputText
        value={filters.numero_instruccion_fiscal.value || ''}
        onChange={(e) => setFilters({ ...filters, numero_instruccion_fiscal: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })}
        placeholder="Buscar"
        className="px-5  text-gray-500 border border-gray-700 rounded-full h-8"
      />
    </div>
  );

  const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <VscOpenPreview
                title="Detalle"
                className="h-7 w-7 text-blue-800 cursor-pointer inline-block mr-2"
                onClick={() => navigate(`/delegaciones/detalleDelegacion/${rowData.id}`)}
            />
            <MdEditDocument
                title="Actualizar"
                className="h-7 w-7 text-green-600 cursor-pointer inline-block mr-2"
                onClick={() => navigate(`/delegaciones/actualizarDelegacion/${rowData.id}`)}
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
        alignItems:'center'
    }
};
  
  return (
    <div className=" flex w-full">
      <DataTable
        value={delegaciones}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={['numero_instruccion_fiscal', 'numero_investigacion_previa']}
        emptyMessage="No Existe la Delegacion Buscada"
          style={tableStyle.header}

      >
        <Column className="text-center w-5 text-black bg-white my-20 border-b border-r border-slate-200 " field="orden" header="N° Orden" />
        <Column className="text-center w-15 text-black bg-white border-b  border-r border-slate-200" field="anio_ingreso" header="Año Ingreso" />
        <Column className="text-center w-2 text-black bg-white border-b  border-r border-slate-200" header={headerNumeroInvestigacionPrevia} field="numero_investigacion_previa"  />
        <Column className="text-center w-auto text-black bg-white border-b  border-r border-slate-200" header={headerNumeroInstruccionFiscal} field="numero_instruccion_fiscal" />
        <Column className="text-center  text-black bg-white border-b  border-r border-slate-200" field="grado_agente" header="Grado" style={{ minWidth: '5rem' }}  />
        <Column className="text-center w-auto my-15 text-black bg-white border-b  border-r border-gray-300 justify-center items-center" field="apellidos_nombres_agente" header="Agente" style={{ minWidth: '12rem'}} />
        <Column className="text-center w-auto text-black bg-white  justify-center items-center border-b border-slate-200" body={actionBodyTemplate} header="Acciones" style={{ minWidth: '8rem' }} />

      </DataTable>
    </div>
  );
};

export default TablaDelegaciones;
