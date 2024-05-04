import React from 'react'
import { BiCaretLeftCircle } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import Asignacion from '../componets/formularios/Asignacion';
import Localizacion from '../componets/formularios/Localizacion';
import DelegacionesDelito from '../componets/formularios/DelegacionesDelito';

const ActualizarDelegacion = () => {
    const navigate = useNavigate();

  return (
    <div>
        <div className='flex items-center'>
        <BiCaretLeftCircle  className='text-4xl text-sky-950'
        onClick={() => navigate(`/delegaciones`)}/>
        <h1 className='font-black text-4xl text-gray-500 uppercase'>Actualizar Delegación</h1>
        
      </div>
      <hr className='my-4 border-sky-950  '/>
        <p >agregar el id para la funcionalida app, (panel) y en la ruta que viene desde la tabla </p>
        <p >importar el resto del formulario </p>

        <form >
        <Asignacion/>
        <Localizacion/>
        <DelegacionesDelito/>
        </form>



    </div>
  )
}

export default ActualizarDelegacion