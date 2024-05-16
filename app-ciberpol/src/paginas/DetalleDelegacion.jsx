import React, { useEffect, useState } from 'react'
import { BiCaretLeftCircle } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'
import Mensaje from '../componets/Alertas/Mensaje';
import axios from 'axios';

const DetalleDelegacion = () => {

  
  const navigate = useNavigate();

  const { id } = useParams()
  const [delegacion, setDelegacion] = useState({})
  const [mensaje, setMensaje] = useState({})

  useEffect(() => {
    const consultarDelegacion = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/detalle/delegacion/${id}`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options);
        console.log('detalle', respuesta.data); // Verificar los datos aquí
        setDelegacion(respuesta.data);
        } catch (error) {
          setMensaje({ respuesta: error.response?.data?.msg || 'Error al obtener la delegación', tipo: false });
        }
    }
    consultarDelegacion()
}, [])

const completarDatos = (delegacion) => {
  const delegacionCompleta = {};
  for (const key in delegacion) {
    if (delegacion[key]) {
      delegacionCompleta[key] = delegacion[key];
    } else {
      delegacionCompleta[key] = "No Registra";
    }
  }
  return delegacionCompleta;
};

const delegacionCompleta = completarDatos(delegacion);

  return (
    <div>
      <div className='flex items-center'>
        <BiCaretLeftCircle  className='text-4xl text-sky-950'
        onClick={() => navigate(`/delegaciones`)}/>
        <h1 className='font-black text-4xl text-gray-500 uppercase'>Detalle Delegación</h1>
        
      </div>
      <hr className='my-4 border-sky-950  ' />
      <div>
        {delegacion && Object.keys(delegacion).length !== 0 ? (
          <>
            <div className='rounded-md border-2 border-sky-950 p-8 mb-2 '>
              <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Asiganción de la Investigacion </h1>
              <div className='flex mb-3'>
              <label className='mr-7 font-bold'>N° de Investigación Previa</label>
                <input 
                  disabled value={delegacionCompleta.numero_investigacion_previa}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>N° de Instrucción Fiscal</label>
                <input 
                  disabled value={delegacionCompleta.numero_instruccion_fiscal}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'> Mes de Ingreso de Dispocsiciones Fiscales:</label>
                <input value={delegacionCompleta.mes_ingreso}
                  disabled
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Apellidos y Nombres del Agente</label>
                <input 
                  disabled value={delegacionCompleta.apellidos_nombres_agente}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Grado Agente</label>
                <input 
                  disabled value={delegacionCompleta.grado_agente}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
            </div>

            <div className='rounded-md border-2 border-sky-950 p-8 mb-2 '>
              <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>localización </h1>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Cod Distrito:</label>
                <input 
                  disabled value={delegacionCompleta.cod_distrito}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Distrito:</label>
                <input 
                  disabled value={delegacionCompleta.distrito}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Zona:</label>
                <input 
                  disabled value={delegacionCompleta.zona}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Canton:</label>
                <input 
                  disabled value={delegacionCompleta.canton}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Provincia:</label>
                <input 
                  disabled value={delegacionCompleta.provincia}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
            </div>

            <div className='rounded-md border-2 border-sky-950 p-8 mb-2 '>
              <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>Delito</h1>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Delito Tipificado en Delegación</label>
                <input 
                  disabled value={delegacionCompleta.delito_tipificado_delegacion}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Tipo Delito:</label>
                <input 
                  disabled value={delegacionCompleta.tipo_delito}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Tipo Desgregado:</label>
                <input 
                  disabled value={delegacionCompleta.delito_desagregacion_policia_judicial}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Fecha de Infracción o Delito</label>
                <input 
                  disabled value={delegacionCompleta.fecha_infraccion_delito}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Apellidos y Nombres de la Victima</label>
                <input 
                  disabled value={delegacionCompleta.apellidos_nombres_victima}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Sexo</label>
                <input 
                  disabled value={delegacionCompleta.sexo_victima}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Edad</label>
                <input 
                  disabled value={delegacionCompleta.edad_victima}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              
            </div>
            <div className='rounded-md border-2 border-sky-950 p-8 mb-2 '>
              <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>sospechoso</h1>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Apellidos y Nombres del Detenido o Sospechoso</label>
                <input 
                  disabled value={delegacionCompleta.apellidos_nombres_sospechoso}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Condición del Infractor Involucrado</label>
                <input 
                  disabled value={delegacionCompleta.condicion_infractor_involucrado}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Parentesco del Detenido o Sospechoso con la Victima</label>
                <input 
                  disabled value={delegacionCompleta.parentesco_detenido_sospechoso_victima}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Alias del Sospechoso </label>
                <input 
                  disabled  value={delegacionCompleta.alias_sospechoso}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Placas del Vihículo Involucrado en el Delito</label>
                <input 
                  disabled value={delegacionCompleta.placa_vehiculo_involucrado}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
            </div>

            <div className='rounded-md border-2 border-sky-950 p-8 mb-2 '>
              <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>fiscal</h1>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Apellidos y Nombres del Fiscal</label>
                <input 
                  disabled  value={delegacionCompleta.apellidos_nombres_fiscal}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Unidad Especializada de Fiscalía:</label>
                <input 
                  disabled  value={delegacionCompleta.unidad_especializada}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Fecha de la Delegación</label>
                <input 
                  disabled value={delegacionCompleta.fecha_delegacion}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Fecha de Recepción en CIBERPOL</label>
                <input 
                  disabled value={delegacionCompleta.fecha_recepcion_pj}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Fecha de Recepción por parte del Agente Investigador </label>
                <input 
                  disabled value={delegacionCompleta.fecha_recepcion_agente_investigador}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>N° de Oficio con la que recibe la Diligencia el Agente</label>
                <input 
                  disabled  value={delegacionCompleta.no_oficio_recibe_diligencia}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Plazo Otrogado (Días)</label>
                <input 
                  disabled value={delegacionCompleta.plazo_otorgado_dias}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>N° art.444 COIP</label>
                <input 
                  disabled value={delegacionCompleta.numero_articulo}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
            </div>

            <div className='rounded-md border-2 border-sky-950 p-8 mb-2 '>
              <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>boleta</h1>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>¿Qué art. cumplió dentro del plazo?</label>
                <input 
                  disabled value={delegacionCompleta.articulos_cumplidos}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Cumplimiento Parcial</label>
                <input 
                  disabled value={delegacionCompleta.cumplimiento_parcial}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Cumplimiento Total</label>
                <input 
                  disabled value={delegacionCompleta.cumplimiento_total}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Fecha de Cumplimiento o Descargo</label>
                <input 
                  disabled value={delegacionCompleta.fecha_cumplimiento}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>En Investigación</label>
                <input 
                  disabled value={delegacionCompleta.en_investigacion}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>N° de Oficio de Descargo</label>
                <input 
                  disabled value={delegacionCompleta.numero_oficio_descargo}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Versiones</label>
                <input 
                  disabled value={delegacionCompleta.versiones}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Reconocimiento de Lugar de los Hechos</label>
                <input 
                  disabled  value={delegacionCompleta.reconocimientos_lugar_hechos}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>¿Determinó posibles Responsables?</label>
                <input 
                  disabled value={delegacionCompleta.determino_posibles_responsables}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Comparecencia del Sospechoso</label>
                <input 
                  disabled value={delegacionCompleta.comparecencia_sospechoso}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Peticiones a Fiscalía</label>
                <input 
                  disabled value={delegacionCompleta.peticiones_fiscalia}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Tipo de Requermimientos</label>
                <input 
                  disabled  value={delegacionCompleta.tipo_peticion}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
            </div>

            <div className='rounded-md border-2 border-sky-950 p-8 mb-2 '>
              <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>observaciones</h1>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Nombre del Requerido en la Boleta</label>
                <input 
                  disabled value={delegacionCompleta.nombre_requerido_boleta}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Apellidos y Nombres de los Detenidos, producto del Cumplimiento de la Disposición Fiscal</label>
                <input 
                  disabled value={delegacionCompleta.apellidos_nombres_detenidos_producto}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>N° Boletas Solicitadas</label>
                <input 
                  disabled value={delegacionCompleta.no_boletas_solicitadas}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>N° de Detenidos producto de la Investigación</label>
                <input 
                  disabled value={delegacionCompleta.no_detenidos_producto_investigacion}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>N° de Allanamientos</label>
                <input 
                  disabled value={delegacionCompleta.allanamientos_numero}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>N° de Recuperaión de Bienes</label>
                <input 
                  disabled value={delegacionCompleta.recuperacion_bienes_evidencias}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>N° de Recuperación de Automotores</label>
                <input 
                  disabled value={delegacionCompleta.recuperacion_automotores}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>N° de Recuperación Otros</label>
                <input 
                  disabled  value={delegacionCompleta.recuperacion_otros}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>N° de Notificaciones</label>
                <input 
                  disabled value={delegacionCompleta.notificaciones}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>N° de Citaciones</label>
                <input 
                  disabled  value={delegacionCompleta.citaciones}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>N° de Peritajes</label>
                <input 
                  disabled value={delegacionCompleta.peritajes}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>N° de Traslados</label>
                <input 
                  disabled value={delegacionCompleta.traslados}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
            </div>
            <div className='rounded-md border-2 border-sky-950 p-8 mb-2 '>
              <h1 className='text-gray-500 uppercase font-semibold underline  mb-5  '>informe</h1>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Informe o Descargo</label>
                <input 
                  disabled  value={delegacionCompleta.informe_descargo}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Causas de Incumplimineto de la Investigación</label>
                <input 
                  disabled value={delegacionCompleta.causas_incumplimiento_investigacion}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Nombre de los Detenidos Producto de la Investigación</label>
                <input 
                  disabled value={delegacionCompleta.nombre_detenidos_producto_investigacion}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Observaciones</label>
                <input 
                  disabled  value={delegacionCompleta.observaciones}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Cantidad Sustraida</label>
                <input 
                  disabled value={delegacionCompleta.cantidad_sustraida}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
              <div className='flex mb-3'>
                <label className='mr-7 font-bold'>Entidad Financiera</label>
                <input 
                  disabled  value={delegacionCompleta.entidad_financiera}
                  className="text-md text-black border-none bg-gray-200  p-1 rounded-md" />
              </div>
            </div>
          </>
        ) : (
          Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}
      </div>

      



    </div>
  )
}

export default DetalleDelegacion