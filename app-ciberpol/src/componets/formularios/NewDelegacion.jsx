import React, { useEffect, useState } from 'react'
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
import { useForm } from 'react-hook-form';


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
    fecha_infraccion_delito: "", //ver formato fecha
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
    fecha_delegacion: "", //ver formato fecha
    fecha_recepcion_pj: "", //ver formato fecha
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
    recuperacion_bienes_evidencias: "",
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
    console.log("marets", setSelectedLocalidad(value))
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
    // Validar que el valor ingresado sean máximo 2 dígitos numéricos o esté vacío
    const isValid = !value || /^\d{0,2}$/.test(value);
    // Si la validación es correcta, actualizamos el estado del número de fiscalía
    if (isValid) {
      setNumeroFiscalia(value);
      const unidadEspecializada = `${selectedFiscalia || ''} - ${value || ''}`;
      setForm({
        ...form,
        unidad_especializada: unidadEspecializada.trim()
      });
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setForm({ ...form, [name]: uppercaseValue });
  };

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const numero_investigacion_previa = watch('numero_investigacion_previa');
  const numero_instruccion_fiscal = watch('numero_instruccion_fiscal');

  const onSubmit = async (data) => {
    //e.preventDefault()
    console.log("antes", data)
    try {
      if (!numero_investigacion_previa && !numero_instruccion_fiscal) {
        setMensaje({ respuesta: 'Debe llenar alguno de los dos campos de Investigación Previa o Instrucción Fiscal para registrar la Delegación', tipo: false });
        setTipo(false);
        setOpenDialog(true);
        setTimeout(() => {
          setOpenDialog(false);
        }, 4000);
        return;
      }

      const token = localStorage.getItem('token')
      const url = `${import.meta.env.VITE_BACKEND_URL}/registro/delegacion`
      //conversion de datos 
      const formData = {
        ...form,
        ...data,
        numero_investigacion_previa: data.numero_investigacion_previa !== null && data.numero_investigacion_previa !== '' ? parseInt(data.numero_investigacion_previa) : null,
        edad_victima: data.edad_victima !== null && data.edad_victima !== '' ? parseInt(data.edad_victima) : null,
        plazo_otorgado_dias: data.plazo_otorgado_dias !== null && data.plazo_otorgado_dias !== '' ? parseInt(data.plazo_otorgado_dias) : null,
        versiones: data.versiones !== null && data.versiones !== '' ? parseInt(data.versiones) : null,
        reconocimientos_lugar_hechos: data.reconocimientos_lugar_hechos !== null && data.reconocimientos_lugar_hechos !== '' ? parseInt(data.reconocimientos_lugar_hechos) : null,
        no_boletas_solicitadas: data.no_boletas_solicitadas !== null && data.no_boletas_solicitadas !== '' ? parseInt(data.no_boletas_solicitadas) : null,
        no_detenidos_producto_investigacion: data.no_detenidos_producto_investigacion !== null && data.no_detenidos_producto_investigacion !== '' ? parseInt(data.no_detenidos_producto_investigacion) : null,
        allanamientos_numero: data.allanamientos_numero !== null && data.allanamientos_numero !== '' ? parseInt(data.allanamientos_numero) : null,
        recuperacion_automotores: data.recuperacion_automotores !== null && data.recuperacion_automotores !== '' ? parseInt(data.recuperacion_automotores) : null,
        recuperacion_otros: data.recuperacion_otros !== null && data.recuperacion_otros !== '' ? parseInt(data.recuperacion_otros) : null,
        notificaciones: data.notificaciones !== null && data.notificaciones !== '' ? parseInt(data.notificaciones) : null,
        citaciones: data.citaciones !== null && data.citaciones !== '' ? parseInt(data.citaciones) : null,
        peritajes: data.peritajes !== null && data.peritajes !== '' ? parseInt(data.peritajes) : null,
        traslados: data.traslados !== null && data.traslados !== '' ? parseInt(data.traslados) : null,
      };
      console.log('ANTES DE ENVIAR:', formData);
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      await axios.post(url, formData, options)
      console.log('DESPUES:', formData);
      setMensaje({ respuesta: "Delegación agregada Correctamente", tipo: true })
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
  const [isCausasDisabled, setIsCausasDisabled] = useState(form.informe_descargo !== 'PARTE DE DESCARGO');

  useEffect(() => {
    if (form.informe_descargo !== 'PARTE DE DESCARGO') {
      setForm((prevForm) => ({ ...prevForm, causas_incumplimiento_investigacion: "" }));
    }
  setIsCausasDisabled(form.informe_descargo !== 'PARTE DE DESCARGO');
}, [form.informe_descargo]);



const causasClass = isCausasDisabled
    ? "uppercase block w-2000 rounded-md border border-gray-300 bg-gray-200 text-gray-400 cursor-not-allowed focus:outline-none h-8"
    : "uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500";
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2 '>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Asiganción de la Investigacion </h1>

          <div className='flex mb-3 items-center'>
            <label className='mr-11'>N° de Investigación Previa</label>
            <input
              type="Number"
              id='numero_investigacion_previa'
              name='numero_investigacion_previa'
              onChange={handleChange}
              {...register('numero_investigacion_previa', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  if (value.length < 5 || value.length > 50) return 'El campo debe tener entre 5 y 50 caracteres';
                  return true; // Si la longitud está dentro del rango, no hay problemas
                }
              })}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
            {errors.numero_investigacion_previa && (
              <span className="text-red-500 text-sm ml-2">{errors.numero_investigacion_previa.message}</span>
            )}
          </div>

          <div className='flex mb-3 items-center'>
            <label className='mr-16'>N° de Instrucción Fiscal</label>
            <input type="text" id='numero_instruccion_fiscal'
              name='numero_instruccion_fiscal'
              onChange={handleChange}
              {...register('numero_instruccion_fiscal', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  if (value.length < 5 || value.length > 50) return 'El campo debe tener entre 5 y 50 caracteres';
                  return true; // Si la longitud está dentro del rango, no hay problemas
                }
              })}
              className="block w-200 rounded-md border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500 uppercase" />
            {errors.numero_instruccion_fiscal && (
              <span className="text-red-500 text-sm ml-2">{errors.numero_instruccion_fiscal.message}</span>
            )}
          </div>

          <div className='flex  mb-3 items-center'>
            <label className='mr-7'>Mes de ingreso de Disposiciones Fiscales</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='mes_ingreso' name='mes_ingreso'

              onChange={handleChange}
              {...register('mes_ingreso', {
                required: { value: true, message: 'Debe seleccionar un mes' }
              })} >

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
            {errors.mes_ingreso && (<span className="text-red-500 text-sm ml-2 mb-3">{errors.mes_ingreso.message}</span>
            )}
          </div >


          <div className='flex mb-3 '>
            <label className='mr-11'>Apellidos y Nombres del Agente </label>
            <Stack spacing={2} sx={{ width: 500 }}>
              <Autocomplete
                id="apellidos_nombres_agente"
                name="apellidos_nombres_agente"
                freeSolo
                options={agenteNom}
                onChange={handlenomAgenteSelect}
                renderInput={(params) => <TextField {...params}
                  {...register('apellidos_nombres_agente', {
                    required: 'Debe seleccionar el nombre de un agente',
                  })} />}
              />
              {errors.apellidos_nombres_agente && (
                <span className="text-red-500 text-sm ml-2">{errors.apellidos_nombres_agente.message}</span>
              )}
            </Stack>
          </div>
          <div className='flex flex-row'>
            <label className='mr-7 pt-5'>Grado Agente: </label>
            <input type="text" id='grado_agente'
              name='grado_agente' onChange={handleChange}
              disabled
              value={selectedAgente && agenteGrado[selectedAgente]}
              className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'

            />

          </div>

        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Localización</h1>

          <div className='flex mb-3 place-content-center'>
            <label className='mr-7 pt-4 '>Realice la Búsqueda para la Localización </label>
            <Stack spacing={2} sx={{ width: 600 }}>
              <Autocomplete
                id="localizacion"
                freeSolo
                options={codDistrito}
                onChange={handleLocalizacionSelect}
                renderInput={(params) => <TextField {...params} label="Codigo-Provincia-Distrito-Zona"
                  {...register('localizacion', {
                    required: 'Debe realizar la busqueda de la Localizacion para añadir la informacion',
                  })} />}
              />
              {errors.localizacion && (
                <span className="text-red-500 text-sm ml-2">{errors.localizacion.message}</span>
              )}
            </Stack>
          </div>
          <div className='flex flex-row'>
            <label className='mr-4 pt-5'>Cod Distrito:</label>
            <input type="text" id='cod_distrito' name='cod_distrito' onChange={handleChange}
              disabled
              value={selectedLocalidad && distrito[selectedLocalidad]?.cod_distrito}
              className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5 w-64'
            />
          </div>

          <div className='flex flex-row'>
            <label className='mr-11 pt-5'>Distrito:</label>
            <input type="text" id='distrito' name='distrito' onChange={handleChange}
              disabled
              value={selectedLocalidad && distrito[selectedLocalidad]?.distrito}
              className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5  w-64'
            />
          </div>
          <div className='flex flex-row'>
            <label className='mr-16 pt-5'>Zona:</label>
            <input type="text" id='zona' name='zona' onChange={handleChange}
              disabled
              value={selectedLocalidad && distrito[selectedLocalidad]?.zona}
              className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5 w-64'
            />
          </div>
          <div className='flex flex-row'>
            <label className='mr-12 pt-5'>Cantón:</label>
            <input type="text" id='canton' name='canton' onChange={handleChange}
              disabled
              value={selectedLocalidad && distrito[selectedLocalidad]?.canton}
              className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5 w-64'
            />
          </div>

          <div className='flex flex-row'>
            <label className='mr-7 pt-5'>Provincia:</label>
            <input type="text" id='provincia' name='provincia' onChange={handleChange}
              disabled
              value={selectedLocalidad && distrito[selectedLocalidad]?.subzona}
              className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5 w-64'
            />
          </div>

        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>

          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Delito </h1>
          <div className='flex mb-3'>
            <label className='mr-7 mt-4'>Delito Tipificado en Delegación</label>
            <Stack spacing={2} sx={{ width: 500 }}>
              <Autocomplete
                id="delito_tipificado_delegacion"
                name="delito_tipificado_delegacion"
                freeSolo
                options={delitoNom}
                onChange={handleDelitoSelect}
                renderInput={(params) => <TextField {...params} label="Delito - Sección"
                  {...register('delito_tipificado_delegacion', {
                    required: 'El campo Delito Tipificado en Delegación debe estar lleno',
                  })} />}
              />
              {errors.delito_tipificado_delegacion && (
                <span className="text-red-500 text-sm ml-2">{errors.delito_tipificado_delegacion.message}</span>
              )}
            </Stack>

          </div>
          <div className='flex flex-row'>
            <label className='mr-5 pt-5'>Tipo Delito: </label>
            <input type="text" id='tipo_delito' name='tipo_delito' onChange={handleChange}
              disabled
              value={selectedDelito && delitoData[selectedDelito]?.seccion}
              className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5 w-96'

            />

          </div>

          <div className='flex flex-row'>
            <label className='mr-7 pt-5'>Delito Desagregación Policia Judicial: </label>
            <input type="text" id='delito_desagregacion_policia_judicial' name='delito_desagregacion_policia_judicial' onChange={handleChange}
              disabled
              value={selectedDelito && delitoData[selectedDelito]?.delito}
              className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5 w-96'

            />

          </div>
          <div className='flex mb-3'>
            <label className='mr-16'>Fecha de la Infracción/Delito</label>
            <input type="Date" id='fecha_infraccion_delito' name='fecha_infraccion_delito' onChange={handleChange}
              className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('fecha_infraccion_delito', {
                required: 'El campo Fecha de la Infracción/Delito debe estar lleno ',
              })}
            />
            {errors.fecha_infraccion_delito && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.fecha_infraccion_delito.message}</span>
            )}
          </div>

          <div className='flex mb-3'>
            <label className='mr-7 '>Apellidos y Nombres de la Víctima</label>
            <input type="String" id='apellidos_nombres_victima' name='apellidos_nombres_victima' onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('apellidos_nombres_victima', {
                required: 'Este campo debe estar lleno ',
              })}
            />
            {errors.apellidos_nombres_victima && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.apellidos_nombres_victima.message}</span>
            )}
          </div>

          <div className='flex  mb-3 items-center'>
            <label className='mr-7 '>Sexo</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='sexo_victima' name='sexo_victima' onChange={handleChange}
              {...register('sexo_victima', {
                required: { value: true, message: 'Debe seleccionar una opción' }
              })}>
              <option value="">--Seleccione el sexo--</option>
              <option value="FEMENINO">FEMENINO</option>
              <option value="MASCULINO" >MASCULINO</option>
              <option value="SIN DATO">SIN DATO</option>
            </select>
            {errors.sexo_victima && (<span className="text-red-500 text-sm ml-2 mb-3">{errors.sexo_victima.message}</span>
            )}
          </div>

          <div className='flex mb-3'>
            <label className='mr-7'>Edad</label>
            <input
              type="number"
              id='edad_victima'
              name='edad_victima'
              onChange={handleChange}
              className="w-28 block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('edad_victima', {
                validate: value => !value || value.length <= 2 || 'El campo debe tener máximo 2 caracteres'
              })}
            />
            {errors.edad_victima && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.edad_victima.message}</span>
            )}
          </div>
        </div>


        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Sospechoso</h1>
          <h2 className='text-blue-800  font-medium italic mb-5 text-center '>Llenar esta sección si existe en la boleta o en el proceso de Descargo</h2>

          <div className='flex mb-3'>
            <label className='mr-7'>Apellidos y Nombres del Detenido o Sospechoso</label>
            <input type="String" id='apellidos_nombres_sospechoso' name='apellidos_nombres_sospechoso' onChange={handleChange}
              className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('apellidos_nombres_sospechoso', {

                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  if (value.length < 5) return 'El campo debe tener al menos 5 caracteres'; // Verifica que tenga al menos 2 caracteres
                  const regex = /^[a-zA-Z,\s]*$/; // Expresión regular para letras y comas
                  return regex.test(value) || 'El campo solo puede contener letras y comas';
                }
              })}
            />
            {errors.apellidos_nombres_sospechoso && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.apellidos_nombres_sospechoso.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Condición del Infractor Involucrado</label>
            <input type="String" id='condicion_infractor_involucrado' name='condicion_infractor_involucrado' onChange={handleChange}
              className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('condicion_infractor_involucrado', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  if (value.length < 5) return 'El campo debe tener al menos 5 caracteres'; // Verifica que tenga al menos 2 caracteres
                  const regex = /^[a-zA-Z,\s]*$/;// Expresión regular para letras y comas
                  return regex.test(value) || 'El campo solo puede contener letras y comas';
                }
              })}
            />
            {errors.condicion_infractor_involucrado && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.condicion_infractor_involucrado.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Parentesco del Detenido o Sospechoso con la Victima</label>
            <input type="String" id='parentesco_detenido_sospechoso_victima' name='parentesco_detenido_sospechoso_victima' onChange={handleChange} className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('parentesco_detenido_sospechoso_victima', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  if (value.length < 5) return 'El campo debe tener al menos 5 caracteres'; // Verifica que tenga al menos 2 caracteres
                  const regex = /^[a-zA-Z,\s]*$/;// Expresión regular para letras y comas
                  return regex.test(value) || 'El campo solo puede contener letras y comas';
                }
              })}
            />
            {errors.parentesco_detenido_sospechoso_victima && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.parentesco_detenido_sospechoso_victima.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Alias del Sospechoso </label>
            <input type="String" id='alias_sospechoso' name='alias_sospechoso' onChange={handleChange}
              className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('alias_sospechoso', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  if (value.length < 4) return 'El campo debe tener al menos 4 caracteres'; // Verifica que tenga al menos 2 caracteres
                  const regex = /^[a-zA-Z,\s]*$/;// Expresión regular para letras y comas
                  return regex.test(value) || 'El campo solo puede contener letras y comas';
                }
              })}
            />
            {errors.alias_sospechoso && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.alias_sospechoso.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Placas del Vihículo Involucrado en el Delito</label>
            <input type="String" id='placa_vehiculo_involucrado' name='placa_vehiculo_involucrado' onChange={handleChange}
              className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('placa_vehiculo_involucrado', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  if (value.length < 8) return 'El campo debe tener al menos 8 caracteres'; // Verifica que tenga al menos 2 caracteres
                  const regex = /^[a-zA-Z0-9, -]*$/;// Expresión regular para letras y comas y guion
                  return regex.test(value) || 'El campo solo puede contener  y comas para separar las placas';
                }
              })}
            />
            {errors.placa_vehiculo_involucrado && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.placa_vehiculo_involucrado.message}</span>
            )}
          </div>

        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2' >
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>fiscal</h1>

          <div className='flex mb-3'>
            <label className='mr-7'>Apellidos y Nombres del Fiscal</label>
            <input type="String" id='apellidos_nombres_fiscal' name='apellidos_nombres_fiscal' onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500 w-72"
              {...register('apellidos_nombres_fiscal', {
                required: 'Debe proporcionar el nombre del fiscal',
                pattern: {
                  value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                  message: 'El nombre solo puede contener letras'
                }

              })}
            />
            {errors.apellidos_nombres_fiscal && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.apellidos_nombres_fiscal.message}</span>
            )}
          </div>
          <div className='flex place-content-center mb-3' >
            <div className='flex mr-5 '>
              <label className='mr-2 mt-5'>Buscar Fiscalía</label>
              <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                  id="fiscaliaNombre"
                  freeSolo
                  options={fiscaliaNom}
                  onChange={handleFiscaliaChange} // Usamos el mismo manejador para la fiscalía
                  renderInput={(params) => <TextField {...params} label="Fiscalía Nombre"
                    {...register('fiscaliaNombre', {
                      required: 'Seleccione el nombre de una Fiscalía',
                    })}
                  />}
                />
                {errors.fiscaliaNombre && (
                  <span className="text-red-500 text-sm ml-2">{errors.fiscaliaNombre.message}</span>
                )}
              </Stack>
            </div>
            <div className='flex mt-2'>
              <label className='mr-4 mt-1'>N° Fiscalía:</label>
              <input
                id='numeroFiscalia'
                type="text" // Cambiamos el tipo de input a "text"
                value={numeroFiscalia}
                onChange={handleNumeroFiscaliaChange}
                className="block w-15 h-10 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              />
            </div>
          </div>


          <div className='flex mb-3'>
            <label className='mr-4 mt-4' >Unidad Especializada de Fiscalía:</label>
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
              className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('fecha_delegacion', {
                required: 'El campo Fecha de la Delegacion debe estar llena ',
              })}
            />
            {errors.fecha_delegacion && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.fecha_delegacion.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Fecha de Recepción en PJ</label>
            <input type="Date" id='fecha_recepcion_pj' name='fecha_recepcion_pj' onChange={handleChange}
              className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('fecha_recepcion_pj', {
                required: 'El campo Fecha de  Recepción en PJ debe estar lleno ',
              })}
            />
            {errors.fecha_recepcion_pj && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.fecha_recepcion_pj.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Fecha de Recepción por parte del Agente Investigador </label>
            <input type="Date" id='fecha_recepcion_agente_investigador' name='fecha_recepcion_agente_investigador' onChange={handleChange}
              className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('fecha_recepcion_agente_investigador', {
                required: 'El campo Fecha de Recepción por parte del Agente Investigador debe estar lleno ',
              })}
            />
            {errors.fecha_recepcion_agente_investigador && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.fecha_recepcion_agente_investigador.message}</span>
            )}
          </div>

          <div className='flex mb-3'>
            <label className='mr-7'>N° de Oficio con la que recibe la Diligencia el Agente</label>
            <input type="text" id='no_oficio_recibe_diligencia' name='no_oficio_recibe_diligencia' onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('no_oficio_recibe_diligencia', {
                required: 'Este campo debe estar lleno ',
                minLength: {
                  value: 10,
                  message: 'El texto debe tener al menos 10 caracteres'
                }
              })}
            />
            {errors.no_oficio_recibe_diligencia && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.no_oficio_recibe_diligencia.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Plazo Otrogado (Días)</label>
            <input type="Number" id='plazo_otorgado_dias' name='plazo_otorgado_dias' onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('plazo_otorgado_dias', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[0-9]+$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener números';
                }
              })}
            />
            {errors.plazo_otorgado_dias && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.plazo_otorgado_dias.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>N° art.444 COIP</label>
            <input type="String" id='numero_articulo' name='numero_articulo' onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('numero_articulo', {
                required: 'Este campo es obligatorio ',
                minLength: {
                  value: 1,
                  message: 'El texto debe tener al menos 1 caracter'
                },
                pattern: {
                  value: /^[0-9,\s-]+$/,
                  message: 'El campo solo puede contener números, guiones y comas'
                }
              })}
            />
            {errors.numero_articulo && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.numero_articulo.message}</span>
            )}
          </div>
        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Cumplimiento</h1>

          <div className='flex mb-3'>
            <label className='mr-7'>¿Qué art. cumplió dentro del plazo?</label>
            <input type="String" id='articulos_cumplidos' name='articulos_cumplidos' onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('articulos_cumplidos', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[0-9,\s-]+$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener números, guiones y comas';
                }
              })}
            />
            {errors.articulos_cumplidos && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.articulos_cumplidos.message}</span>
            )}
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
            <label className='mr-7'>Fecha de Cumplimiento o Descargo de Delegación </label>
            <input type="Date" id='fecha_cumplimiento' name='fecha_cumplimiento' onChange={handleChange}
              className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('fecha_cumplimiento', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación

                }
              })}
            />
            {errors.fecha_cumplimiento && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.fecha_cumplimiento.message}</span>
            )}
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
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('numero_oficio_descargo', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[a-zA-Z0-9-]+$/; // Expresión regular para letras, números y guiones
                  if (!regex.test(value)) {
                    return 'El campo solo puede contener números, letras y guiones';
                  }
                  if (value.length < 23) {
                    return 'El campo debe tener al menos 23 caracteres';
                  }
                  return true;
                }
              })}
            />
            {errors.numero_oficio_descargo && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.numero_oficio_descargo.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>Versiones (Número)</label>
            <input type="Number" id='versiones' name='versiones' onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('versiones', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[0-9,]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener números y letras';
                }
              })}
            />
            {errors.versiones && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.versiones.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>Reconocimiento de Lugar de los Hechos (Número)</label>
            <input type="Number" id='reconocimientos_lugar_hechos' name='reconocimientos_lugar_hechos' onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('reconocimientos_lugar_hechos', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[0-9,]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener números y letras';
                }
              })}
            />
            {errors.reconocimientos_lugar_hechos && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.reconocimientos_lugar_hechos.message}</span>
            )}
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
            <label className='mr-14'>Comparecencia del Sospechoso</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='comparecencia_sospechoso' name='comparecencia_sospechoso' onChange={handleChange}   >
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex  mb-3'>
            <label className='mr-28'>Peticiones a Fiscalía</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='peticiones_fiscalia' name='peticiones_fiscalia' onChange={handleChange}  >
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>Tipo de Requermimientos</label>
            <input type="String" id='tipo_peticion' name='tipo_peticion' onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('tipo_peticion', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[a-zA-Z0-9,]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener números y letras y comas';
                }
              })}
            />
            {errors.tipo_peticion && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.tipo_peticion.message}</span>
            )}
          </div>


        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Resultados de operativos</h1>

          <div className='flex mb-3'>
            <label className='mr-7 '>Nombre del Requerido en la Boleta</label>
            <input type="String" id='nombre_requerido_boleta' name='nombre_requerido_boleta' onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('nombre_requerido_boleta', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[a-zA-Z,]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener  letras y comas';
                }
              })}
            />
            {errors.nombre_requerido_boleta && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.nombre_requerido_boleta.message}</span>
            )}
          </div>

          <div className='mb-3'>
            <label className='mr-7 '>Apellidos y Nombres de los Detenidos, producto del Cumplimiento de la Disposición Fiscal</label>
            <input type="String" id='apellidos_nombres_detenidos_producto' name='apellidos_nombres_detenidos_producto' onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('apellidos_nombres_detenidos_producto', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[a-zA-Z,]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener  letras y comas';
                }
              })}
            />
            {errors.apellidos_nombres_detenidos_producto && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.apellidos_nombres_detenidos_producto.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° Boletas Solicitadas</label>
            <input type="Number" id='no_boletas_solicitadas' name='no_boletas_solicitadas' onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('no_boletas_solicitadas', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[0-9,]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener  numeros y comas';
                }
              })}
            />
            {errors.no_boletas_solicitadas && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.no_boletas_solicitadas.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Detenidos producto de la Investigación</label>
            <input type="Number" id='no_detenidos_producto_investigacion' name='no_detenidos_producto_investigacion' onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('no_detenidos_producto_investigacion', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[0-9,]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener  numeros y comas';
                }
              })}
            />
            {errors.no_detenidos_producto_investigacion && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.no_detenidos_producto_investigacion.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Allanamientos</label>
            <input type="Number" id='allanamientos_numero' name='allanamientos_numero' onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('allanamientos_numero', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[0-9,]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener  numeros y comas';
                }
              })}
            />
            {errors.allanamientos_numero && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.allanamientos_numero.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Recuperaión de Bienes o evidencias</label>
            <input type="text" id='recuperacion_bienes_evidencias' name='recuperacion_bienes_evidencias' onChange={handleChange}
              className="block w-96 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('recuperacion_bienes_evidencias', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex =/^[a-zA-Z0-9,\-\sáéíóúÁÉÍÓÚñÑ]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener  numeros y comas';
                }
              })}
            />
            {errors.recuperacion_bienes_evidencias && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.recuperacion_bienes_evidencias.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Recuperación de Automotores</label>
            <input type="Number" id='recuperacion_automotores' name='recuperacion_automotores' onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('recuperacion_automotores', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[0-9,]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener  numeros y comas';
                }
              })}
            />
            {errors.recuperacion_automotores && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.recuperacion_automotores.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Recuperación Otros</label>
            <input type="Number" id='recuperacion_otros' name='recuperacion_otros' onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('recuperacion_otros', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[0-9,]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener  numeros y comas';
                }
              })}
            />
            {errors.recuperacion_otros && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.recuperacion_otros.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Notificaciones</label>
            <input type="Number" id='notificaciones' name='notificaciones' onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('notificaciones', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[0-9,]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener  numeros y comas';
                }
              })}
            />
            {errors.notificaciones && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.notificaciones.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Citaciones</label>
            <input type="Number" id='citaciones' name='citaciones' onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('citaciones', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[0-9,]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener  numeros y comas';
                }
              })}
            />
            {errors.citaciones && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.citaciones.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Peritajes</label>
            <input type="Number" id='peritajes' name='peritajes' onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('peritajes', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[0-9,]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener  numeros y comas';
                }
              })}
            />
            {errors.peritajes && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.peritajes.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Traslados</label>
            <input type="Number" id='traslados' name='traslados' onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('traslados', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[0-9,]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener  numeros y comas';
                }
              })}
            />
            {errors.traslados && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.traslados.message}</span>
            )}
          </div>



        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>informe</h1>
          <div className='flex  mb-3'>
            <label className='mr-7 '>Informe o Descargo</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' id='informe_descargo' name='informe_descargo' onChange={handleChange}  >
              <option value="">-- Seleccione una opción-- </option>
              <option value="INFORME INVESTIGATIVO">INFORME INVESTIGATIVO</option>
              <option value="INFORME DE CUMPLIMIENTO">INFORME DE CUMPLIMIENTO</option>
              <option value="PARTE DE DESCARGO">PARTE DE DESCARGO</option>
            </select>
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Causas de Incumplimineto de la Investigación</label>
            <input type="String" id='causas_incumplimiento_investigacion' name='causas_incumplimiento_investigacion' onChange={handleChange}
              disabled={isCausasDisabled} className={causasClass}
              {...register('causas_incumplimiento_investigacion', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[a-zA-Z,\s]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener  Letras y comas';
                }
              })}
            />
            {errors.causas_incumplimiento_investigacion && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.causas_incumplimiento_investigacion.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Nombre de los Detenidos Producto de la Investigación</label>
            <input type="String" id='nombre_detenidos_producto_investigacion' name='nombre_detenidos_producto_investigacion' onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('nombre_detenidos_producto_investigacion', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[a-zA-Z,\s]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener  Letras y comas';
                }
              })}
            />
            {errors.nombre_detenidos_producto_investigacion && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.nombre_detenidos_producto_investigacion.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Observaciones</label>
            <input type="String" id='observaciones' name='observaciones' onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('observaciones', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[a-zA-Z,\s]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener  Letras y comas';
                }
              })}
            />
            {errors.observaciones && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.observaciones.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Cantidad Sustraida</label>
            <input type="Number" id='cantidad_sustraida' name='cantidad_sustraida' onChange={handleChange}
              className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('cantidad_sustraida', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[0-9,]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener  numeros y comas';
                }
              })}
            />
            {errors.cantidad_sustraida && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.cantidad_sustraida.message}</span>
            )}
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Entidad Financiera</label>
            <input type="String" id='entidad_financiera' name='entidad_financiera' onChange={handleChange}
              className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              {...register('entidad_financiera', {
                validate: value => {
                  if (!value) return true; // Si el campo está vacío, no se activa la validación
                  const regex = /^[a-zA-Z,\s]*$/; // Expresión regular para números
                  return regex.test(value) || 'El campo solo puede contener  Letras y comas';
                }
              })}
            />
            {errors.entidad_financiera && (
              <span className="text-red-500 text-sm ml-2 mt-2">{errors.entidad_financiera.message}</span>
            )}
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