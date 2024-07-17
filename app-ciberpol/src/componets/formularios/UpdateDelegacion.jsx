import React ,{ useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import Mensaje from '../Alertas/Mensaje';
import { useNavigate } from 'react-router-dom';
//dialogo 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


const UpdateDelegacion = ({ delegacion }) => {

  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({})
  const [form, setForm] = useState({
    numero_investigacion_previa: delegacion?.numero_investigacion_previa ?? null,
    numero_instruccion_fiscal: delegacion?.numero_instruccion_fiscal ?? "",
    mes_ingreso: delegacion?.mes_ingreso ?? "",
    apellidos_nombres_agente: delegacion?.apellidos_nombres_agente?? "",
    grado_agente: delegacion?.grado_agente?? "",
    cod_distrito: delegacion?.cod_distrito?? "",
    distrito: delegacion?.distrito?? "",
    zona: delegacion?.zona?? "",
    canton: delegacion?.canton??"",
    provincia: delegacion?.provincia??"",
    tipo_delito: delegacion?.tipo_delito?? "",
    delito_tipificado_delegacion: delegacion?.delito_tipificado_delegacion?? "",
    delito_desagregacion_policia_judicial: delegacion?.delito_desagregacion_policia_judicial?? "",
    fecha_infraccion_delito: delegacion?.fecha_infraccion_delito?? "", //ver formato fecha
    apellidos_nombres_victima: delegacion?.apellidos_nombres_victima?? "",
    sexo_victima: delegacion?.sexo_victima??"",
    edad_victima: delegacion?.edad_victima?? null,
    apellidos_nombres_sospechoso: delegacion?.apellidos_nombres_sospechoso?? "",
    condicion_infractor_involucrado: delegacion?.condicion_infractor_involucrado?? "",
    parentesco_detenido_sospechoso_victima: delegacion?.parentesco_detenido_sospechoso_victima?? "",
    alias_sospechoso: delegacion?.alias_sospechoso?? "",
    placa_vehiculo_involucrado: delegacion?.placa_vehiculo_involucrado?? "",
    apellidos_nombres_fiscal: delegacion?.apellidos_nombres_fiscal?? "",
    unidad_especializada: delegacion?.unidad_especializada?? "",
    fecha_delegacion: delegacion?.fecha_delegacion?? "", //ver formato fecha
    fecha_recepcion_pj: delegacion?.fecha_recepcion_pj?? "", //ver formato fecha
    fecha_recepcion_agente_investigador: delegacion?.fecha_recepcion_agente_investigador?? "", //ver formato fecha
    no_oficio_recibe_diligencia: delegacion?.no_oficio_recibe_diligencia?? "",
    plazo_otorgado_dias: delegacion?.plazo_otorgado_dias?? null,
    numero_articulo: delegacion?.numero_articulo??"",
    articulos_cumplidos: delegacion?.articulos_cumplidos?? "",
    cumplimiento_parcial: delegacion?.cumplimiento_parcial?? "",
    cumplimiento_total: delegacion?.cumplimiento_total?? "",
    fecha_cumplimiento: delegacion?.fecha_cumplimiento?? null, //ver formato fecha
    en_investigacion: delegacion?.en_investigacion??"",
    numero_oficio_descargo: delegacion?.numero_oficio_descargo?? "",
    versiones: delegacion?.versiones?? null,
    reconocimientos_lugar_hechos: delegacion?.reconocimientos_lugar_hechos?? null, 
    determino_posibles_responsables: delegacion?.determino_posibles_responsables??"",
    comparecencia_sospechoso: delegacion?.comparecencia_sospechoso?? "",
    peticiones_fiscalia: delegacion?.peticiones_fiscalia??"",
    tipo_peticion: delegacion?.tipo_peticion?? "",
    nombre_requerido_boleta:delegacion?.nombre_requerido_boleta?? "",
    apellidos_nombres_detenidos_producto: delegacion?.apellidos_nombres_detenidos_producto?? "",
    no_boletas_solicitadas: delegacion?.no_boletas_solicitadas??null,
    no_detenidos_producto_investigacion: delegacion?.no_detenidos_producto_investigacion??null,
    allanamientos_numero: delegacion?.allanamientos_numero??null,
    recuperacion_bienes_evidencias: delegacion?.recuperacion_bienes_evidencias??"",
    recuperacion_automotores: delegacion?.recuperacion_automotores??null,
    recuperacion_otros: delegacion?.recuperacion_otros?? null,
    notificaciones: delegacion?.notificaciones?? null,
    citaciones: delegacion?.citaciones ??null,
    peritajes:delegacion?.peritajes?? null,
    traslados: delegacion?.traslados?? null,
    informe_descargo: delegacion?.informe_descargo??"",
    causas_incumplimiento_investigacion: delegacion?.causas_incumplimiento_investigacion?? "",
    nombre_detenidos_producto_investigacion: delegacion?.nombre_detenidos_producto_investigacion??"",
    observaciones: delegacion?.observaciones??"",
    cantidad_sustraida: delegacion?.cantidad_sustraida?? "",
    entidad_financiera: delegacion?.entidad_financiera??""
  })

  const [tipo, setTipo] = useState({})
  const [openDialog, setOpenDialog] = useState(false);
  

  useEffect(() => {
    if (delegacion?.id) {
        setForm(delegacion);
        if (delegacion.unidad_especializada) {
            const [selected, numero] = delegacion.unidad_especializada.split('-');
            setSelectedFiscalia(selected);
            setNumeroFiscalia(numero);
            console.log("Valores extraídos:", { selected, numero });
        }
    }
}, [delegacion]);

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
      try{
        if(delegacion?.id){
          const token = localStorage.getItem('token')
          const url = `${import.meta.env.VITE_BACKEND_URL}/actualizar/delegacion/${delegacion?.id}`
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
          await axios.put(url,formData,options)
            setMensaje({ respuesta:"Delegación Actualizada", tipo: true })
            setTipo(tipo)
            setOpenDialog(true);
            setTimeout(() => {
              setOpenDialog(false);
                navigate('/delegaciones');
            }, 3000);
        }
      }catch (error) {
        setMensaje({
          respuesta: error?.response?.data?.errors?.[0]?.msg || error?.response?.data?.msg,
          tipo: false
        })
        setTipo(tipo)
        setOpenDialog(true);
        setTimeout(() => {
          setOpenDialog(false);
        }, 3000);
      }
      
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
};

const [isCausasDisabled, setIsCausasDisabled] = useState(form.informe_descargo !== 'PARTE DE DESCARGO');

useEffect(() => {
  if (form.informe_descargo !== 'PARTE DE DESCARGO') {
    setForm((prevForm) => ({ ...prevForm, causas_incumplimiento_investigacion: "" }));
  }
setIsCausasDisabled(form.informe_descargo !== 'PARTE DE DESCARGO');
}, [form.informe_descargo]);



const causasClass = isCausasDisabled
    ? "uppercase block w-96 rounded-md border border-gray-300 bg-gray-200 text-gray-400 cursor-not-allowed focus:outline-none h-8"
    : "uppercase block w-96 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500";
  return (
      <div>
        <form onSubmit={handleSubmit} >
      {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}


        <div className='rounded-md border-2 border-sky-950 p-8 mb-2 '>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Asiganción de la Investigacion </h1>


          <div className='flex mb-3'>
            <label className='mr-7'>N° de Investigación Previa</label>
            <input 
                  disabled value={form.numero_investigacion_previa}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>

          <div className='flex mb-3'>
            <label className='mr-11'>N° de Instrucción Fiscal</label>
            <input 
                  disabled value={form.numero_instruccion_fiscal}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>

          <div className='flex  mb-3'>
            <label className='mr-7'>Mes de ingreso de Disposiciones Fiscales</label>
            <input 
                  disabled value={form.mes_ingreso}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
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
                value={form.apellidos_nombres_agente}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </div>
          <div className='flex flex-row'>
            <label className='mr-7 pt-5'>Grado Agente: </label>
            <input type="text" id='grado_agente'
              name='grado_agente' onChange={handleChange}
              disabled
              value={selectedAgente && agenteGrado[selectedAgente] || form.grado_agente}
              className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5 w-24'
            />

          </div>

        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Localización</h1>
          <div className='flex flex-row mb-2'>
                <label className='mr-7 pt-5'>Cod Distrito:</label>
                <input 
                  disabled value={form.cod_distrito}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md " />
              </div>

              <div className='flex flex-row mb-2'>
                <label className='mr-16 pt-5'>Distrito:</label>
                <input 
                  disabled value={form.distrito}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex flex-row mb-2'>
                <label className='mr-20 pt-5'>Zona:</label>
                <input 
                  disabled value={form.zona}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex flex-row mb-2'>
                <label className='mr-16 pt-5'>Canton:</label>
                <input 
                  disabled value={form.canton}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
             
              <div className='flex flex-row mb-2'>
                <label className='mr-10 pt-5'>Provincia:</label>
                <input 
                  disabled value={form.provincia}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md ml-2" />
              </div>

        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>

          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Delito </h1>
          <div className='flex mb-3'> 
            <label className='mb-2 mr-3'>Delito Tipificado en Delegación</label>
            <input 
                  disabled value={form.delito_tipificado_delegacion}
                  className="text-md text-black border-none bg-gray-200  p-2 rounded-md w-96" />
            </div> 
            <div className='flex mb-3'> 
            <label className='mb-2 mr-12'>Tipo Delito:</label>
            <input 
                  disabled value={form.tipo_delito}
                  className="text-md w-96 text-black border-none bg-gray-200  p-2 rounded-md" />
            </div> 
            <div className='flex mb-3'> 
            <label className='mb-2 mr-3'>Tipo Desgregado:</label>
            <input 
                  disabled value={form.delito_desagregacion_policia_judicial}
                  className="text-md w-96 text-black border-none bg-gray-200  p-2 rounded-md" />
            </div>      
            

          <div className='flex mb-3'>
            <label className='mr-7 '>Fecha de Infracción o Delito</label>
            <input 
                  disabled value={form.fecha_infraccion_delito}
                  className="text-md  text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>

          <div className='flex mb-3'>
            <label className='mr-7 '>Apellidos y Nombres de la Victima</label>
            <input type="String" id='apellidos_nombres_victima' name='apellidos_nombres_victima' onChange={handleChange} value={form.apellidos_nombres_victima}
              className="uppercase block w-80 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <div className='flex  mb-3'>
            <label className='mr-7 mt-3'>Sexo</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='sexo_victima' name='sexo_victima' onChange={handleChange} value={form.sexo_victima}>
              <option value="">--Seleccione el sexo--</option>
              <option value="FEMENINO">FEMENINO</option>
              <option value="MASCULINO" >MASCULINO</option>
              <option value="SIN DATO">SIN DATO</option>
            </select>
          </div>

          <div className='flex mb-3'>
            <label className='mr-7'>Edad</label>
            <input type="Number" id='edad_victima' name='edad_victima' onChange={handleChange} value={form.edad_victima}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Sospechoso</h1>

          <div className='flex mb-3'>
            <label className='mr-7'>Apellidos y Nombres del Detenido o Sospechoso</label>
            <input type="String" id='apellidos_nombres_sospechoso' name='apellidos_nombres_sospechoso' onChange={handleChange} value={form.apellidos_nombres_sospechoso}
              className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500 w-80" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Condición del Infractor Involucrado</label>
            <input type="String" id='condicion_infractor_involucrado' name='condicion_infractor_involucrado' onChange={handleChange} value={form.condicion_infractor_involucrado}
              className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Parentesco del Detenido o Sospechoso con la Victima</label>
            <input type="String" id='parentesco_detenido_sospechoso_victima' name='parentesco_detenido_sospechoso_victima' onChange={handleChange} value={form.parentesco_detenido_sospechoso_victima}
              className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Alias del Sospechoso </label>
            <input type="String" id='alias_sospechoso' name='alias_sospechoso' onChange={handleChange} value={form.alias_sospechoso}
              className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Placas del Vihículo Involucrado en el Delito</label>
            <input type="String" id='placa_vehiculo_involucrado' name='placa_vehiculo_involucrado' onChange={handleChange} value={form.placa_vehiculo_involucrado}
              className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2' >
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>fiscal</h1>

          <div className='flex mb-3'>
            <label className='mr-7'>Apellidos y Nombres del Fiscal</label>
            <input 
                  disabled value={form.apellidos_nombres_fiscal}
                  className="text-md text-black border-none bg-gray-200  p-2 rounded-md w-80" />
          </div>

        
          <div className='flex mb-3'>
              <label className='mr-4'>Unidad Especializada de Fiscalía:</label>
              
              <input
                type="text" id='unidad_especializada' name='unidad_especializada'
                disabled
                value={ form.unidad_especializada}

                className="text-md w-96 text-black border-none bg-gray-200  p-1 rounded-md"/>
            </div>



          <div className='flex mb-3'>
            <label className='mr-12'>Fecha de la Delegación</label>
            <input 
                  disabled value={form.fecha_delegacion}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Fecha de Recepción en CIBERPOL</label>
            <input 
                  disabled value={form.fecha_recepcion_pj}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-5'>Fecha de Recepción por parte del Agente Investigador </label>
            <input 
                  disabled value={form.fecha_recepcion_agente_investigador}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>

          <div className='flex mb-3'>
            <label className='mr-7'>N° de Oficio con la que recibe la Diligencia el Agente</label>
            <input 
                  disabled value={form.no_oficio_recibe_diligencia}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Plazo Otrogado (Días)</label>
            <input type="Number" id='plazo_otorgado_dias' name='plazo_otorgado_dias' onChange={handleChange} value={form.plazo_otorgado_dias}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>N° art.444 COIP</label>
            <input type="String" id='numero_articulo' name='numero_articulo' onChange={handleChange} value={form.numero_articulo}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Cumplimiento</h1>

          <div className=' mb-3'>
            <label className='mr-7'>¿Qué art. cumplió dentro del plazo?</label>
            <input type="String" id='articulos_cumplidos' name='articulos_cumplidos' onChange={handleChange} value={form.articulos_cumplidos}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex  mb-3'>
            <label className='mr-7 mt-3'>Cumplimiento Parcial</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='cumplimiento_parcial' name='cumplimiento_parcial' onChange={handleChange}  value={form.cumplimiento_parcial}>
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex  mb-3'>
            <label className='mr-7 mt-3'>Cumplimiento Total</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='cumplimiento_total' name='cumplimiento_total' onChange={handleChange} value={form.cumplimiento_total}  >
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Fecha de Cumplimiento o Descargo </label>
            <input type="Date" id='fecha_cumplimiento' name='fecha_cumplimiento' onChange={handleChange} value={form.fecha_cumplimiento}
              className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex  mb-3'>
            <label className='mr-7 mt-3'>En Investigación</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='en_investigacion' name='en_investigacion' onChange={handleChange} value={form.en_investigacion} >
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Oficio de Descargo</label>
            <input type="text" id='numero_oficio_descargo' name='numero_oficio_descargo' onChange={handleChange} value={form.numero_oficio_descargo}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>Versiones (Número)</label>
            <input type="Number" id='versiones' name='versiones' onChange={handleChange} value={form.versiones}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>Reconocimiento de Lugar de los Hechos (Número)</label>
            <input type="Number" id='reconocimientos_lugar_hechos' name='reconocimientos_lugar_hechos' onChange={handleChange} value={form.reconocimientos_lugar_hechos}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex  mb-3'>
            <label className='mr-7 mt-3'>¿Determinó posibles Responsables?</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='determino_posibles_responsables' name='determino_posibles_responsables' onChange={handleChange} value={form.determino_posibles_responsables}>
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex  mb-3'>
            <label className='mr-7 mt-3'>Comparecencia del Sospechoso</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='comparecencia_sospechoso' name='comparecencia_sospechoso' onChange={handleChange}  value={form.comparecencia_sospechoso} >
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex  mb-3'>
            <label className='mr-7 mt-3'>Peticiones a Fiscalía</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='peticiones_fiscalia' name='peticiones_fiscalia' onChange={handleChange}  value={form.peticiones_fiscalia}>
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>Tipo de Requerimientos</label>
            <input type="String" id='tipo_peticion' name='tipo_peticion' onChange={handleChange} value={form.tipo_peticion}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>


        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Resultados de Operativos</h1>

          <div className='flex mb-3'>
            <label className='mr-7 '>Nombre del Requerido en la Boleta</label>
            <input type="String" id='nombre_requerido_boleta' name='nombre_requerido_boleta' onChange={handleChange} value={form.nombre_requerido_boleta}
              className="uppercase block w-80 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <div className='mb-3'>
            <label className='mr-7 '>Apellidos y Nombres de los Detenidos, producto del Cumplimiento de la Disposición Fiscal</label>
            <input type="String" id='apellidos_nombres_detenidos_producto' name='apellidos_nombres_detenidos_producto' onChange={handleChange} value={form.apellidos_nombres_detenidos_producto}
              className="uppercase block w-96 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° Boletas Solicitadas</label>
            <input type="Number" id='no_boletas_solicitadas' name='no_boletas_solicitadas' onChange={handleChange} value={form.no_boletas_solicitadas}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Detenidos producto de la Investigación</label>
            <input type="Number" id='no_detenidos_producto_investigacion' name='no_detenidos_producto_investigacion' onChange={handleChange} value={form.no_detenidos_producto_investigacion}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Allanamientos</label>
            <input type="Number" id='allanamientos_numero' name='allanamientos_numero' onChange={handleChange} value={form.allanamientos_numero}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>N° de Recuperaión de Bienes o evidencias</label>
            <input type="text" id='recuperacion_bienes_evidencias' name='recuperacion_bienes_evidencias' onChange={handleChange} value={form.recuperacion_bienes_evidencias}
              className="block w-96 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Recuperación de Automotores</label>
            <input type="Number" id='recuperacion_automotores' name='recuperacion_automotores' onChange={handleChange} value={form.recuperacion_automotores}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Recuperación Otros</label>
            <input type="Number" id='recuperacion_otros' name='recuperacion_otros' onChange={handleChange} value={form.recuperacion_otros}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Notificaciones</label>
            <input type="Number" id='notificaciones' name='notificaciones' onChange={handleChange} value={form.notificaciones}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Citaciones</label>
            <input type="Number" id='citaciones' name='citaciones' onChange={handleChange} value={form.citaciones}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Peritajes</label>
            <input type="Number" id='peritajes' name='peritajes' onChange={handleChange} value={form.peritajes}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Traslados</label>
            <input type="Number" id='traslados' name='traslados' onChange={handleChange} value={form.traslados}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>



        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>informe</h1>
          <div className='flex  mb-3'>
            <label className='mr-7 mt-3'>Informe o Descargo</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='informe_descargo' name='informe_descargo' onChange={handleChange} value={form.informe_descargo} >
              <option value="">-- Seleccione una opción-- </option>
              <option value="INFORME INVESTIGATIVO">INFORME INVESTIGATIVO</option>
              <option value="INFORME DE CUMPLIMIENTO">INFORME DE CUMPLIMIENTO</option>
              <option value="PARTE DE DESCARGO">PARTE DE DESCARGO</option>
            </select>
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Causas de Incumplimineto de la Investigación</label>
            <input type="String" id='causas_incumplimiento_investigacion' name='causas_incumplimiento_investigacion' onChange={handleChange} value={form.causas_incumplimiento_investigacion}
              disabled={isCausasDisabled} className={causasClass}/>
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Nombre de los Detenidos Producto de la Investigación</label>
            <input type="String" id='nombre_detenidos_producto_investigacion' name='nombre_detenidos_producto_investigacion' onChange={handleChange} value={form.nombre_detenidos_producto_investigacion}
              className="uppercase block w-80 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Observaciones</label>
            <input type="String" id='observaciones' name='observaciones' onChange={handleChange} value={form.observaciones}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Cantidad Sustraida</label>
            <input type="Number" id='cantidad_sustraida' name='cantidad_sustraida' onChange={handleChange} value={form.cantidad_sustraida}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Entidad Financiera</label>
            <input type="String" id='entidad_financiera' name='entidad_financiera' onChange={handleChange} value={form.entidad_financiera}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>


        </div>

        <div className="mx-8">
          <button type="submit" 
             className="py-2 w-full block text-center bg-sky-950 text-gray-300 border rounded-xl hover:scale-100 duration-300 hover:bg-blue-950 hover:text-white"
            >
          Actualizar Delegacion
          </button>
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

export default UpdateDelegacion