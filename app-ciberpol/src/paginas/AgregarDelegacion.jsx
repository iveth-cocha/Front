import React, { useEffect, useState } from 'react'
import { BiCaretLeftCircle } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom'

import DelegacionesDelito from '../componets/formularios/DelegacionesDelito';
import Sospechoso from '../componets/formularios/Sospechoso';
import Fiscal from '../componets/formularios/Fiscal';
import Boleta from '../componets/formularios/Boleta';
import Observaciones from '../componets/formularios/Observaciones';
import Informe from '../componets/formularios/Informe';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const AgregarDelegacion = () => {
    const navigate = useNavigate();
    //////////----//////---------------AUTOCOMPLETADO--------////////-------------//////////
    // **************Asignacion************
    const [agenteNom, setAgenteNom] = useState([]);
  const [agenteGrado, setAgenteGrado] = useState({});
  const [selectedAgente, setSelectedAgente] = useState('');

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
          //console.log(`Nombre: ${nombre}, Grado: ${grado}`);
          setAgenteGrado(prevState => ({
            ...prevState,
            [nombre]: grado
          }));
          return nombre;
        });
        setAgenteNom(nombresAgentes);
      } catch (error) {
        //console.error('Error al obtener los nombres de los agentes:', error);
      }
    };

    agentesNombres();
  }, []);

  const handlenomAgenteSelect = (event, value) => {
    setSelectedAgente(value);
    //console.log('Agente seleccionado:', value);
  };
  //***************** Localidad***********
  const [codDistrito, setCodDistrito] = useState([]);
  const [distrito, setDistrito] = useState({});
  const [selectedLocalidad, setSelectedLocalidad] = useState('');

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
        
        // Mapear los datos de localidad y agregarlos a setDistrito
        const distritosMap = localidades.reduce((acc, localidad) => {
          const localidadesCom = `${localidad.cod_distrito} - ${localidad.distrito} - ${localidad.zona}`;
          acc[localidadesCom] = {
            id: localidad.id,
            cod_distrito: localidad.cod_distrito,
            distrito: localidad.distrito,
            zona: localidad.zona,
            canton: localidad.canton,
            subzona: localidad.subzona,
            
            // Agrega más propiedades aquí si es necesario
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

  const handleLocalizacionSelect = (event, value) => {
    setSelectedLocalidad(value);
    console.log('localidad seleccionada:', value);
  };
  //**********delito*********
  const [delitoNom, setDelitoNom] = useState([]);
  const [delitoData, setDelitoData] = useState({});
  const [delitoSeccion, setDelitoSeccion] = useState({});
  const [selectedDelito, setSelectedDelito] = useState('');

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
          const nombreDelito = `${delito.delito} - ${delito.seccion} `;
          const seccion = delito.seccion;
          console.log(`Nombre: ${nombreDelito}, seccion: ${seccion}`);
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
        console.error('Error al obtener los delitos:', error);
      }
    };

    obtenerDelitos();
  }, []);

  const handleDelitoSelect = (event, value) => {
    setSelectedDelito(value);
    console.log('delito seleccionado:', value);
  };
  //**********fiscalia**************
  const [fiscaliaNom, setFiscaliaNom] = useState([]);
    const [selectedFiscalia, setSelectedFiscalia] = useState('');
    const [numeroFiscalia, setNumeroFiscalia] = useState('');
  
    const handleNumeroFiscaliaChange = (event) => {
      setNumeroFiscalia(event.target.value);
    };
  
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
  
    const handleFiscaliaSelect = (event, value) => {
      setSelectedFiscalia(value);
    };
    
  return (
    <div>
        <div className='flex items-center'>
        <BiCaretLeftCircle  className='text-4xl text-sky-950'
        onClick={() => navigate(`/delegaciones`)}/>
        <h1 className='font-black text-4xl text-gray-500 '>AGREGAR DELEGACIÓN</h1>
     
        </div>
        <hr className='my-4 border-sky-950  '/>

        <form >
        
        <div className='rounded-md border-2 border-sky-950 p-8 mb-2 '>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Asiganción de la Investigacion </h1>


          <div className='flex mb-3'>
            <label className='mr-7'>N° de Investigación Previa</label>
            <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <div className='flex mb-3'>
            <label className='mr-11'>N° de Instrucción Fiscal</label>
            <input type="text" className="block w-200 rounded-md border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500 uppercase" />
          </div>

          <div className='flex  mb-3'>
            <label className='mr-7'>Mes de ingreso de Disposiciones Fiscales</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
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
            </select>
          </div>


          <div className='flex mb-3'>
            <label className='mr-7'>Apellidos y Nombres del Agente </label>
            <Stack spacing={2} sx={{ width: 300 }}>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={agenteNom}
                onChange={handlenomAgenteSelect}
                renderInput={(params) => <TextField {...params} />}
              />

              <div className='flex flex-row'>
                <label className='mr-7 pt-5'>Grado Agente: </label>
                <input type="text"
                  disabled
                  value={selectedAgente && agenteGrado[selectedAgente]}
                  className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                />

              </div>
            </Stack>
          </div>









        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Localización</h1>

          <div className='flex mb-3'>
            <label className='mr-7'>Realice la Búsqueda para la Localización </label>
            <Stack spacing={2} sx={{ width: 300 }}>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={codDistrito}
                onChange={handleLocalizacionSelect}
                renderInput={(params) => <TextField {...params} label="Codigo-Distrito-Zona" />}
              />

              <div className='flex flex-row'>
                <label className='mr-7 pt-5'>Cod Distrito:</label>
                <input type="text"
                  disabled
                  value={selectedLocalidad && distrito[selectedLocalidad]?.cod_distrito}
                  className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                />
              </div>

              <div className='flex flex-row'>
                <label className='mr-7 pt-5'>Distrito:</label>
                <input type="text"
                  disabled
                  value={selectedLocalidad && distrito[selectedLocalidad]?.distrito}
                  className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                />
              </div>
              <div className='flex flex-row'>
                <label className='mr-7 pt-5'>Zona:</label>
                <input type="text"
                  disabled
                  value={selectedLocalidad && distrito[selectedLocalidad]?.zona}
                  className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                />
              </div>
              <div className='flex flex-row'>
                <label className='mr-7 pt-5'>Canton:</label>
                <input type="text"
                  disabled
                  value={selectedLocalidad && distrito[selectedLocalidad]?.canton}
                  className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                />
              </div>
              {/* Agrega más divs para otras propiedades si es necesario */}
              <div className='flex flex-row'>
                <label className='mr-7 pt-5'>Provincia:</label>
                <input type="text"
                  disabled
                  value={selectedLocalidad && distrito[selectedLocalidad]?.subzona}
                  className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                />
              </div>
            </Stack>
          </div>

        </div>
        
        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>

          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Delito </h1>
          <div className='flex mb-3'>
            <label className='mr-7'>Delito Tipificado en Delegación</label>
            <Stack spacing={2} sx={{ width: 300 }}>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={delitoNom}
                onChange={handleDelitoSelect}
                renderInput={(params) => <TextField {...params} label="Delito - Sección" />}
              />
              <div className='flex flex-row'>
                <label className='mr-7 pt-5'>Tipo Delito: </label>
                <input type="text"
                  disabled
                  value={selectedDelito && delitoData[selectedDelito]?.seccion}
                  className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                />

              </div>
              <div className='flex flex-row'>
                <label className='mr-7 pt-5'>Tipo Desgregado: </label>
                <input type="text"
                  disabled
                  value={selectedDelito && delitoData[selectedDelito]?.delito}
                  className='border-2 p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                />

              </div>
            </Stack>
          </div>

          <div className='flex mb-3'>
            <label className='mr-7'>Fecha de Infracción o Delito</label>
            <input type="Date" className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <div className='flex mb-3'>
            <label className='mr-7 '>Apellidos y Nombres de la Victima</label>
            <input type="String" className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <div className='flex  mb-3'>
            <label className='mr-7 '>Sexo</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
              <option value="">--Seleccione el sexo--</option>
              <option value="FEMENINO">FEMENINO</option>
              <option value="MASCULINO" >MASCULINO</option>
              <option value="SIN DATO">SIN DATO</option>
            </select>
          </div>

          <div className='flex mb-3'>
            <label className='mr-7'>Edad</label>
            <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
        </div>
        
        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Sospechoso</h1>

          <div className='flex mb-3'>
            <label className='mr-7'>Apellidos y Nombres del Detenido o Sospechoso</label>
            <input type="String" className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Condición del Infractor Involucrado</label>
            <input type="String" className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Parentesco del Detenido o Sospechoso con la Victima</label>
            <input type="String" className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Alias del Sospechoso </label>
            <input type="String" className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Placas del Vihículo Involucrado en el Delito</label>
            <input type="String" className="uppercase block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2' >
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>fiscal</h1>

          <div className='flex mb-3'>
            <label className='mr-7'>Apellidos y Nombres del Fiscal</label>
            <input type="String" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <p className='text-red-500'>anadir para fiscalia autocompletado  y numero, que se concadenan en "Unidad Especializada de Fiscalia"</p>
          <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
              id="fiscalia-autocomplete"
              freeSolo
              options={fiscaliaNom}
              onChange={handleFiscaliaSelect}
              renderInput={(params) => <TextField {...params} label="Fiscalía Nombre" />}
            />

            <div className='flex mb-3'>
              <label className='mr-4'>N° Fiscalía:</label>
              <input
                type="number"
                value={numeroFiscalia}
                onChange={handleNumeroFiscaliaChange}
                className="block w-15 h-10 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              />
            </div>

            <div className='flex mb-3'>
              <label className='mr-4'>Unidad Especializada de Fiscalía:</label>
              <input
                type="text"
                disabled
                value={`${selectedFiscalia} - ${numeroFiscalia}`}
                className="block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
              />
            </div>
          </Stack>


          <div className='flex mb-3'>
            <label className='mr-11'>Fecha de la Delegación</label>
            <input type="Date" className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Fecha de Recepción en CIBERPOL</label>
            <input type="Date" className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Fecha de Recepción por parte del Agente Investigador </label>
            <input type="Date" className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <div className='flex mb-3'>
            <label className='mr-7'>N° de Oficio con la que recibe la Diligencia el Agente</label>
            <input type="text" className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Plazo Otrogado (Días)</label>
            <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>N° art.444 COIP</label>
            <input type="String" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
        </div>
        
        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>boleta</h1>

          <div className=' mb-3'>
            <label className='mr-7'>¿Qué art. cumplió dentro del plazo?</label>
            <input type="String" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex  mb-3'>
            <label className='mr-7'>Cumplimiento Parcial</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex  mb-3'>
            <label className='mr-7'>Cumplimiento Total</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Fecha de Cumplimiento o Descargo </label>
            <input type="Date" className="block  rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex  mb-3'>
            <label className='mr-7'>En Investigación</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Oficio de Descargo</label>
            <input type="text" className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>Versiones</label>
            <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>Reconocimiento de Lugar de los Hechos</label>
            <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex  mb-3'>
            <label className='mr-7'>¿Determinó posibles Responsables?</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex  mb-3'>
            <label className='mr-7'>Comparecencia del Sospechoso</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex  mb-3'>
            <label className='mr-7'>Peticiones a Fiscalía</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
              <option value="">-- Seleccione --</option>
              <option value="SI" >SI</option>
              <option value="NO" >NO</option>
            </select>
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>Tipo de Requermimientos</label>
            <input type="String" className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>


        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>observaciones</h1>

          <div className='flex mb-3'>
            <label className='mr-7 '>Nombre del Requerido en la Boleta</label>
            <input type="String" className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <div className='mb-3'>
            <label className='mr-7 '>Apellidos y Nombres de los Detenidos, producto del Cumplimiento de la Disposición Fiscal</label>
            <input type="String" className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° Boletas Solicitadas</label>
            <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Detenidos producto de la Investigación</label>
            <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Allanamientos</label>
            <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Recuperaión de Bienes</label>
            <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Recuperación de Automotores</label>
            <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Recuperación Otros</label>
            <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Notificaciones</label>
            <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Citaciones</label>
            <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Peritajes</label>
            <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7 '>N° de Traslados</label>
            <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>



        </div>

        <div className='rounded-md border-2 border-sky-950 p-8 mb-2'>
          <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>informe</h1>
          <div className='flex  mb-3'>
            <label className='mr-7 '>Informe o Descargo</label>
            <select className='border-2 w-2000 p-2 mt-2  rounded-md mb-5' >
              <option value="">-- Seleccione una opción-- </option>
              <option value="INFORME INVESTIGATIVO">INFORME INVESTIGATIVO</option>
              <option value="PARTE DE DESCARGO">PARTE DE DESCARGO</option>
            </select>
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Causas de Incumplimineto de la Investigación</label>
            <input type="String" className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Nombre de los Detenidos Producto de la Investigación</label>
            <input type="String" className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Observaciones</label>
            <input type="String" className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Cantidad Sustraida</label>
            <input type="Number" className="block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>
          <div className='flex mb-3'>
            <label className='mr-7'>Entidad Financiera</label>
            <input type="String" className="uppercase block w-2000 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>


        </div>

        <div className="mx-8">
            <button to="/Delegaciones" className="py-2  w-full block text-center bg-sky-950 text-gray-300 border rounded-xl hover:scale-100 duration-300 hover:bg-blue-950 hover:text-white">Guardar</button>
          </div>

        </form>
        
        
        
      
    </div>
  )
}

export default AgregarDelegacion