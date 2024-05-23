import React ,{ useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
//dialogo 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


const NewDelegacion = () => {
  

  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({})
  const [tipo, setTipo] = useState({})
  const [form, setForm] = useState({
    numero_investigacion_previa: null,
    numero_instruccion_fiscal: "",
    mes_ingreso: "",
    apellidos_nombres_agente: "",
    grado_agente: "",
    cod_distrito: "",
    distrito: "",
    zona: "",
    canton: "",
    provincia: "",
    tipo_delito: "",
    delito_tipificado_delegacion: "",
    delito_desagregacion_policia_judicial: "",
    fecha_infraccion_delito:  "", //ver formato fecha
    apellidos_nombres_victima: "",
    sexo_victima: "",
    edad_victima: null,
    apellidos_nombres_sospechoso: "",
    condicion_infractor_involucrado: "",
    parentesco_detenido_sospechoso_victima: "",
    alias_sospechoso: "",
    placa_vehiculo_involucrado: "",
    apellidos_nombres_fiscal: "",
    unidad_especializada: "",
    fecha_delegacion:  "", //ver formato fecha
    fecha_recepcion_pj:  "", //ver formato fecha
    fecha_recepcion_agente_investigador: "", //ver formato fecha
    no_oficio_recibe_diligencia: "",
    plazo_otorgado_dias: null,
    numero_articulo: "",
    articulos_cumplidos: "",
    cumplimiento_parcial: "",
    cumplimiento_total: "",
    fecha_cumplimiento: "", //ver formato fecha
    en_investigacion: "",
    numero_oficio_descargo: "",
    versiones: null,
    reconocimientos_lugar_hechos: null,
    determino_posibles_responsables: "",
    comparecencia_sospechoso: "",
    peticiones_fiscalia: "",
    tipo_peticion: "",
    nombre_requerido_boleta: "",
    apellidos_nombres_detenidos_producto: "",
    no_boletas_solicitadas: null,
    no_detenidos_producto_investigacion: null,
    allanamientos_numero: null,
    recuperacion_bienes_evidencias: null,
    recuperacion_automotores: null,
    recuperacion_otros: null,
    notificaciones: null,
    citaciones: null,
    peritajes: null,
    traslados: null,
    informe_descargo: "",
    causas_incumplimiento_investigacion: "",
    nombre_detenidos_producto_investigacion: "",
    observaciones: "",
    cantidad_sustraida: "",
    entidad_financiera: ""
  })
  const [openDialog, setOpenDialog] = useState(false);
  

 

  const [agenteNom, setAgenteNom] = useState([]);
    const [agenteGrado, setAgenteGrado] = useState({});
    const [selectedAgente, setSelectedAgente] = useState('');

    // Efecto para obtener nombres de agentes
    useEffect(() => {
        const agentesNombres = async () => {
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
                const nombresAgentes = respuesta.data.map(agentes => {
                    const nombre = `${agentes.Apellido_Nombre}`;
                    const grado = agentes.Grado;
                    setAgenteGrado(prevState => ({
                        ...prevState,
                        [nombre]: grado
                    }));
                    return nombre;
                });
                setAgenteNom(nombresAgentes);
            } catch (error) {
                // Manejo de errores
            }
        };

        agentesNombres();
    }, []);

    const handlenomAgenteSelect = (event, value) => {
      setSelectedAgente(value);
      const gradoSeleccionado = agenteGrado[value] || '';
      setForm({
          ...form,
          apellidos_nombres_agente: value,
          grado_agente: gradoSeleccionado
      });
  };

  // Estado para localidades
  const [codDistrito, setCodDistrito] = useState([]);
  const [distrito, setDistrito] = useState({});
  const [selectedLocalidad, setSelectedLocalidad] = useState('');

  // Efecto para obtener localidades
  useEffect(() => {
      const obtenerLocalidad = async () => {
          try {
              const token = localStorage.getItem('token');
              const url = `${import.meta.env.VITE_BACKEND_URL}/localizaciones`;
              const options = {
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`
                  }
              };
              const respuesta = await axios.get(url, options);
              const localidades = respuesta.data;

              const distritosMap = localidades.reduce((acc, localidad) => {
                  const localidadesCom = `${localidad.cod_distrito} -${localidad.subzona}- ${localidad.distrito} - ${localidad.zona}`;
                  acc[localidadesCom] = {
                      id: localidad.id,
                      cod_distrito: localidad.cod_distrito,
                      distrito: localidad.distrito,
                      zona: localidad.zona,
                      canton: localidad.canton,
                      subzona: localidad.subzona,
                  };
                  return acc;
              }, {});

              setDistrito(distritosMap);
              setCodDistrito(Object.keys(distritosMap));
          } catch (error) {
              console.error('Error al obtener las localidades', error);
          }
      };

      obtenerLocalidad();
  }, []);

  // Manejador de selección de localidad
  const handleLocalizacionSelect = (event, value) => {
      setSelectedLocalidad(value);
      const localidadSeleccionada = distrito[value];
      setForm({
          ...form,
          cod_distrito: localidadSeleccionada?.cod_distrito || '',
          distrito: localidadSeleccionada?.distrito || '',
          zona: localidadSeleccionada?.zona || '',
          canton: localidadSeleccionada?.canton || '',
          provincia: localidadSeleccionada?.subzona || ''
      });
  };

  // Estado para delitos
  const [delitoNom, setDelitoNom] = useState([]);
  const [delitoData, setDelitoData] = useState({});
  const [delitoSeccion, setDelitoSeccion] = useState({});
  const [selectedDelito, setSelectedDelito] = useState('');

  // Efecto para obtener delitos
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
                  const nombreDelito = `${delito.delito}  `;
                  const seccion = delito.seccion;
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
            
              console.error('Error al obtener las delitos', error);
          }
      };

      obtenerDelitos();
  }, []);
  const handleDelitoSelect = (event, value) => {
    setSelectedDelito(value);
    const seccionSeleccionada = delitoData[value]?.seccion || '';
    const delitoSeleccionado = delitoData[value]?.delito || '';
    setForm({
        ...form,
        tipo_delito: seccionSeleccionada,
        delito_tipificado_delegacion: delitoSeleccionado,
        delito_desagregacion_policia_judicial: delitoSeleccionado
    });
};

// Estado para fiscalías
const [fiscaliaNom, setFiscaliaNom] = useState([]);
const [selectedFiscalia, setSelectedFiscalia] = useState("");
const [numeroFiscalia, setNumeroFiscalia] = useState("");

// Efecto para obtener fiscalías
useEffect(() => {
    const obtenerFiscalias = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}/fiscalias`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            const nombresFiscalias = respuesta.data.map(fiscalias => fiscalias.N_fiscalia);
            setFiscaliaNom(nombresFiscalias);
        } catch (error) {
            console.error('Error al obtener las fiscalias:', error);
        }
    };

    obtenerFiscalias();
}, []);

// Manejador de cambio de fiscalía
const handleFiscaliaChange = (event, value) => {
    setSelectedFiscalia(value);
    const unidadEspecializada = `${value || ''} - ${numeroFiscalia || ''}`;
    setForm({
        ...form,
        unidad_especializada: unidadEspecializada.trim()
    });
};

// Manejador de cambio de número de fiscalía
const handleNumeroFiscaliaChange = (event) => {
    const { value } = event.target;
    setNumeroFiscalia(value);
    const unidadEspecializada = `${selectedFiscalia || ''} - ${value || ''}`;
    setForm({
        ...form,
        unidad_especializada: unidadEspecializada.trim()
    });
};

const handleChange = (e) => {
  const { name, value } = e.target;
  const uppercaseValue = value.toUpperCase();
  setForm({...form, [name]: uppercaseValue });
};

  const handleSubmit = async(e) => { 
      e.preventDefault()

        try {
          const token = localStorage.getItem('token')
          const url = `${import.meta.env.VITE_BACKEND_URL}/registro/delegacion`
          //conversion de datos 
          const formData = {
            ...form,
            numero_investigacion_previa: form.numero_investigacion_previa !== null && form.numero_investigacion_previa !== '' ? parseInt(form.numero_investigacion_previa) : null,
            edad_victima: form.edad_victima !== null && form.edad_victima !== '' ? parseInt(form.edad_victima) : null,
            plazo_otorgado_dias: form.plazo_otorgado_dias !== null && form.plazo_otorgado_dias !== '' ? parseInt(form.plazo_otorgado_dias) : null,
            versiones: form.versiones !== null && form.versiones !== '' ? parseInt(form.versiones) : null,
            reconocimientos_lugar_hechos: form.reconocimientos_lugar_hechos !== null && form.reconocimientos_lugar_hechos !== '' ? parseInt(form.reconocimientos_lugar_hechos) : null,
            no_boletas_solicitadas: form.no_boletas_solicitadas !== null && form.no_boletas_solicitadas !== '' ? parseInt(form.no_boletas_solicitadas) : null,
            no_detenidos_producto_investigacion: form.no_detenidos_producto_investigacion !== null && form.no_detenidos_producto_investigacion !== '' ? parseInt(form.no_detenidos_producto_investigacion) : null,
            allanamientos_numero: form.allanamientos_numero !== null && form.allanamientos_numero !== '' ? parseInt(form.allanamientos_numero) : null,
            recuperacion_bienes_evidencias: form.recuperacion_bienes_evidencias !== null && form.recuperacion_bienes_evidencias !== '' ? parseInt(form.recuperacion_bienes_evidencias) : null,
            recuperacion_automotores: form.recuperacion_automotores !== null && form.recuperacion_automotores !== '' ? parseInt(form.recuperacion_automotores) : null,
            recuperacion_otros: form.recuperacion_otros !== null && form.recuperacion_otros !== '' ? parseInt(form.recuperacion_otros) : null,
            notificaciones: form.notificaciones !== null && form.notificaciones !== '' ? parseInt(form.notificaciones) : null,
            citaciones: form.citaciones !== null && form.citaciones !== '' ? parseInt(form.citaciones) : null,
            peritajes: form.peritajes !== null && form.peritajes !== '' ? parseInt(form.peritajes) : null,
            traslados: form.traslados !== null && form.traslados !== '' ? parseInt(form.traslados) : null,
          };
          const options={
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
              }
          }
          await axios.post(url,formData,options)
          console.log('DESPUES:', formData);
          setMensaje({ respuesta:"Delegación agregada Correctamente", tipo: true })
          setTipo(tipo)
          setOpenDialog(true);
          setTimeout(() => {
            setOpenDialog(false);
              navigate('/delegaciones');
          }, 3000);
      } catch (error) {
          setMensaje({ respuesta: error.response.data.msg, tipo: false })
          setTipo(tipo)
          setOpenDialog(true);
          setTimeout(() => {
            setOpenDialog(false);
              setForm
          }, 4000);
      }
      
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
};
  return (
    <div>
      <form onSubmit={handleSubmit} >
      


        <div className='rounded-md border-2 border-sky-950 p-8 mb-2 '>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Asiganción de la Investigacion </h1>


          <div className='flex mb-3'>
            <label className='mr-7'>N° de Investigación Previa</label>
            <input type="Number"
              id='numero_investigacion_previa'
              name='numero_investigacion_previa'
              
              onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <div className='flex mb-3'>
            <label className='mr-11'>N° de Instrucción Fiscal</label>
            <input type="text" id='numero_instruccion_fiscal'
              name='numero_instruccion_fiscal'
              onChange={handleChange}
             
            className="block w-200 rounded-md border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500 uppercase" />
          </div>

          <div className='flex  mb-3'>
            <label className='mr-7'>Mes de ingreso de Disposiciones Fiscales</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='mes_ingreso' name='mes_ingreso' onChange={handleChange} >
              <option value="">-- Seleccione un mes --</option>
              <option value="ENERO">ENERO</option>
              <option value="FEBRERO">FEBRERO</option>
              <option value="MARZO">MARZO</option>
              <option value="ABRIL">ABRIL</option>
              <option value="MAYO">MAYO</option>
              <option value="JUNIO">JUNIO</option>
              <option value="JULIO">JULIO</option>
              <option value="AGOSTO">AGOSTO</option>
              <option value="SEPTIEMBRE">SEPTIEMBRE</option>
              <option value="OCTUBRE">OCTUBRE</option>
              <option value="NOVIEMBRE">NOVIEMBRE</option>
              <option value="DICIEMBRE">DICIEMBRE</option>
            </select >
          </div >


          <div className='flex mb-3 '>
            <label className='mr-7'>Apellidos y Nombres del Agente </label>
            <Stack spacing={2} sx={{ width: 500 }}>
              <Autocomplete
                id="apellidos_nombres_agente"
                name="apellidos_nombres_agente"
                freeSolo
                options={agenteNom}
                onChange={handlenomAgenteSelect}
                
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </div>
          <div className='flex flex-row'>
            <label className='mr-7 pt-5'>Grado Agente: </label>
            <input type="text" id='grado_agente'
              name='grado_agente' onChange={handleChange}
              disabled
              value={selectedAgente && agenteGrado[selectedAgente] }
              className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
            />

          </div>

        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Localización</h1>

          <div className='flex mb-3 place-content-center'>
            <label className='mr-7 pt-4 '>Realice la Búsqueda para la Localización </label>
            <Stack spacing={2} sx={{ width: 300 }}>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={codDistrito}
                onChange={handleLocalizacionSelect}
                renderInput={(params) => <TextField {...params} label="Codigo-Provincia-Distrito-Zona" />}
              />
            </Stack>
          </div>
          <div className='flex flex-row'>
                <label className='mr-7 pt-5'>Cod Distrito:</label>
                <input type="text" id='cod_distrito' name='cod_distrito' onChange={handleChange}
                  disabled
                  value={selectedLocalidad && distrito[selectedLocalidad]?.cod_distrito}
                  className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                />
              </div>

              <div className='flex flex-row'>
                <label className='mr-7 pt-5'>Distrito:</label>
                <input type="text" id='distrito' name='distrito' onChange={handleChange}
                  disabled
                  value={selectedLocalidad && distrito[selectedLocalidad]?.distrito }
                  className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                />
              </div>
              <div className='flex flex-row'>
                <label className='mr-7 pt-5'>Zona:</label>
                <input type="text" id='zona' name='zona' onChange={handleChange}
                  disabled
                  value={selectedLocalidad && distrito[selectedLocalidad]?.zona }
                  className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                />
              </div>
              <div className='flex flex-row'>
                <label className='mr-7 pt-5'>Canton:</label>
                <input type="text" id='canton' name='canton' onChange={handleChange}
                  disabled
                  value={selectedLocalidad && distrito[selectedLocalidad]?.canton }
                  className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                />
              </div>
             
              <div className='flex flex-row'>
                <label className='mr-7 pt-5'>Provincia:</label>
                <input type="text" id='provincia' name='provincia' onChange={handleChange}
                  disabled
                  value={selectedLocalidad && distrito[selectedLocalidad]?.subzona }
                  className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                />
              </div>

        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>

          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Delito </h1>
          <div className='flex mb-3'>
            <label className='mr-7'>Delito Tipificado en Delegación</label>
            <Stack spacing={2} sx={{ width: 300 }}>
              <Autocomplete
                id="delito_tipificado_delegacion"
                name="delito_tipificado_delegacion"
                freeSolo
                options={delitoNom}
                onChange={handleDelitoSelect}
                renderInput={(params) => <TextField {...params} label="Delito - Sección" />}
              />
              <div className='flex flex-row'>
                <label className='mr-7 pt-5'>Tipo Delito: </label>
                <input type="text" id='tipo_delito' name='tipo_delito' onChange={handleChange}
                  disabled
                  value={selectedDelito && delitoData[selectedDelito]?.seccion}
                  className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                />

              </div>
              <div className='flex flex-row'>
                <label className='mr-7 pt-5'>Tipo Desgregado: </label>
                <input type="text" id='delito_desagregacion_policia_judicial' name='delito_desagregacion_policia_judicial' onChange={handleChange}
                  disabled
                  value={selectedDelito && delitoData[selectedDelito]?.delito}
                  className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                />

              </div>
            </Stack>
          </div>

          <div className='flex mb-3'>
            <label className='mr-7'>Fecha de Infracción o Delito</label>
            <input type="Date" id='fecha_infraccion_delito' name='fecha_infraccion_delito' onChange={handleChange} 
              className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <div className='flex mb-3'>
            <label className='mr-7 '>Apellidos y Nombres de la Victima</label>
            <input type="String" id='apellidos_nombres_victima' name='apellidos_nombres_victima' onChange={handleChange} 
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <div className='flex  mb-3'>
            <label className='mr-7 '>Sexo</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='sexo_victima' name='sexo_victima' onChange={handleChange} >
              <option value="">--Seleccione el sexo--</option>
              <option value="FEMENINO">FEMENINO</option>
              <option value="MASCULINO" >MASCULINO</option>
              <option value="SIN DATO">SIN DATO</option>
            </select>
          </div>

          <div className='flex mb-3'>
            <label className='mr-7'>Edad</label>
            <input type="Number" id='edad_victima' name='edad_victima' onChange={handleChange} 
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Sospechoso</h1>

          <div className='flex mb-3'>
            <label className='mr-7'>Apellidos y Nombres del Detenido o Sospechoso</label>
            <input type="String" id='apellidos_nombres_sospechoso' name='apellidos_nombres_sospechoso' onChange={handleChange} 
              className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Condición del Infractor Involucrado</label>
            <input type="String" id='condicion_infractor_involucrado' name='condicion_infractor_involucrado' onChange={handleChange} 
              className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Parentesco del Detenido o Sospechoso con la Victima</label>
            <input type="String" id='parentesco_detenido_sospechoso_victima' name='parentesco_detenido_sospechoso_victima' onChange={handleChange}              className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Alias del Sospechoso </label>
            <input type="String" id='alias_sospechoso' name='alias_sospechoso' onChange={handleChange}
              className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Placas del Vihículo Involucrado en el Delito</label>
            <input type="String" id='placa_vehiculo_involucrado' name='placa_vehiculo_involucrado' onChange={handleChange} 
              className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2' >
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>fiscal</h1>

          <div className='flex mb-3'>
            <label className='mr-7'>Apellidos y Nombres del Fiscal</label>
            <input type="String" id='apellidos_nombres_fiscal' name='apellidos_nombres_fiscal' onChange={handleChange} 
                         className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <p className='text-red-500'>anadir para fiscalia autocompletado  y numero, que se concadenan en "Unidad Especializada de Fiscalia"</p>
          <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
              id="free-solo"
              freeSolo
              options={fiscaliaNom}
              onChange={handleFiscaliaChange} // Usamos el mismo manejador para la fiscalía
              renderInput={(params) => <TextField {...params} label="Fiscalía Nombre" />}
            />

            <div className='flex mb-3'>
              <label className='mr-4'>N° Fiscalía:</label>
              <input
                type="number"
                value={numeroFiscalia}
                onChange={handleNumeroFiscaliaChange} // Usamos el mismo manejador para el número de fiscalía
                className="block w-15 h-10 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              />
            </div>

            
          </Stack>
          <div className='flex mb-3'>
              <label className='mr-4'>Unidad Especializada de Fiscalía:</label>
              <input
                type="text" id='unidad_especializada' name='unidad_especializada'
                disabled
                value={`${selectedFiscalia} - ${numeroFiscalia}`}

                className="border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5 w-96"
              />
            </div>



          <div className='flex mb-3'>
            <label className='mr-11'>Fecha de la Delegación</label>
            <input type="Date" id='fecha_delegacion' name='fecha_delegacion' onChange={handleChange}
              className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Fecha de Recepción en CIBERPOL</label>
            <input type="Date" id='fecha_recepcion_pj' name='fecha_recepcion_pj' onChange={handleChange} 
              className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Fecha de Recepción por parte del Agente Investigador </label>
            <input type="Date" id='fecha_recepcion_agente_investigador' name='fecha_recepcion_agente_investigador' onChange={handleChange} 
              className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <div className='flex mb-3'>
            <label className='mr-7'>N° de Oficio con la que recibe la Diligencia el Agente</label>
            <input type="text" id='no_oficio_recibe_diligencia' name='no_oficio_recibe_diligencia' onChange={handleChange} 
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Plazo Otrogado (Días)</label>
            <input type="Number" id='plazo_otorgado_dias' name='plazo_otorgado_dias' onChange={handleChange} 
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>N° art.444 COIP</label>
            <input type="String" id='numero_articulo' name='numero_articulo' onChange={handleChange}
                         className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>boleta</h1>

          <div className=' mb-3'>
            <label className='mr-7'>¿Qué art. cumplió dentro del plazo?</label>
            <input type="String" id='articulos_cumplidos' name='articulos_cumplidos' onChange={handleChange} 
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex  mb-3'>
            <label className='mr-7'>Cumplimiento Parcial</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='cumplimiento_parcial' name='cumplimiento_parcial' onChange={handleChange}  >
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex  mb-3'>
            <label className='mr-7'>Cumplimiento Total</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='cumplimiento_total' name='cumplimiento_total' onChange={handleChange}  >
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Fecha de Cumplimiento o Descargo </label>
            <input type="Date" id='fecha_cumplimiento' name='fecha_cumplimiento' onChange={handleChange} 
              className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex  mb-3'>
            <label className='mr-7'>En Investigación</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='en_investigacion' name='en_investigacion' onChange={handleChange}  >
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Oficio de Descargo</label>
            <input type="text" id='numero_oficio_descargo' name='numero_oficio_descargo' onChange={handleChange} 
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>Versiones</label>
            <input type="Number" id='versiones' name='versiones' onChange={handleChange} 
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>Reconocimiento de Lugar de los Hechos</label>
            <input type="Number" id='reconocimientos_lugar_hechos' name='reconocimientos_lugar_hechos' onChange={handleChange} 
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex  mb-3'>
            <label className='mr-7'>¿Determinó posibles Responsables?</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='determino_posibles_responsables' name='determino_posibles_responsables' onChange={handleChange} >
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex  mb-3'>
            <label className='mr-7'>Comparecencia del Sospechoso</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='comparecencia_sospechoso' name='comparecencia_sospechoso' onChange={handleChange}   >
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex  mb-3'>
            <label className='mr-7'>Peticiones a Fiscalía</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='peticiones_fiscalia' name='peticiones_fiscalia' onChange={handleChange}  >
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>Tipo de Requermimientos</label>
            <input type="String" id='tipo_peticion' name='tipo_peticion' onChange={handleChange} 
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>


        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>observaciones</h1>

          <div className='flex mb-3'>
            <label className='mr-7 '>Nombre del Requerido en la Boleta</label>
            <input type="String" id='nombre_requerido_boleta' name='nombre_requerido_boleta' onChange={handleChange} 
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <div className='mb-3'>
            <label className='mr-7 '>Apellidos y Nombres de los Detenidos, producto del Cumplimiento de la Disposición Fiscal</label>
            <input type="String" id='apellidos_nombres_detenidos_producto' name='apellidos_nombres_detenidos_producto' onChange={handleChange} 
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° Boletas Solicitadas</label>
            <input type="Number" id='no_boletas_solicitadas' name='no_boletas_solicitadas' onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Detenidos producto de la Investigación</label>
            <input type="Number" id='no_detenidos_producto_investigacion' name='no_detenidos_producto_investigacion' onChange={handleChange} 
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Allanamientos</label>
            <input type="Number" id='allanamientos_numero' name='allanamientos_numero' onChange={handleChange} 
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Recuperaión de Bienes</label>
            <input type="Number" id='recuperacion_bienes_evidencias' name='recuperacion_bienes_evidencias' onChange={handleChange} 
                          className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Recuperación de Automotores</label>
            <input type="Number" id='recuperacion_automotores' name='recuperacion_automotores' onChange={handleChange} 
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Recuperación Otros</label>
            <input type="Number" id='recuperacion_otros' name='recuperacion_otros' onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Notificaciones</label>
            <input type="Number" id='notificaciones' name='notificaciones' onChange={handleChange} 
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Citaciones</label>
            <input type="Number" id='citaciones' name='citaciones' onChange={handleChange} 
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Peritajes</label>
            <input type="Number" id='peritajes' name='peritajes' onChange={handleChange} 
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Traslados</label>
            <input type="Number" id='traslados' name='traslados' onChange={handleChange} 
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>



        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>informe</h1>
          <div className='flex  mb-3'>
            <label className='mr-7 '>Informe o Descargo</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='informe_descargo' name='informe_descargo' onChange={handleChange}  >
              <option value="">-- Seleccione una opción-- </option>
              <option value="INFORME INVESTIGATIVO">INFORME INVESTIGATIVO</option>
              <option value="PARTE DE DESCARGO">PARTE DE DESCARGO</option>
            </select>
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Causas de Incumplimineto de la Investigación</label>
            <input type="String" id='causas_incumplimiento_investigacion' name='causas_incumplimiento_investigacion' onChange={handleChange} 
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Nombre de los Detenidos Producto de la Investigación</label>
            <input type="String" id='nombre_detenidos_producto_investigacion' name='nombre_detenidos_producto_investigacion' onChange={handleChange} 
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Observaciones</label>
            <input type="String" id='observaciones' name='observaciones' onChange={handleChange} 
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Cantidad Sustraida</label>
            <input type="Number" id='cantidad_sustraida' name='cantidad_sustraida' onChange={handleChange} 
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Entidad Financiera</label>
            <input type="String" id='entidad_financiera' name='entidad_financiera' onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>


        </div>
        
        <div className="mx-8">
        <button className="py-2 w-full block text-center bg-sky-950 text-gray-300 border rounded-xl hover:scale-100 duration-300 hover:bg-blue-950 hover:text-white"
                type="submit" >Agregar Delegacion</button>      
        </div>

      </form>
      <Dialog
    open={openDialog}
    onClose={handleCloseDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    
>
    
    <DialogContent>
        <DialogContentText id="alert-dialog-description" tipo={mensaje.tipo}>
            {mensaje.respuesta}
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCloseDialog} autoFocus>
            Ok
        </Button>
    </DialogActions>
</Dialog>

    </div>
    
      
  )
}

export default NewDelegacion