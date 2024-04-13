import React from 'react'
import { BiCaretLeftCircle } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom'
import Asignacion from '../componets/formularios/Asignacion';
import Localizacion from '../componets/formularios/Localizacion';
import DelegacionesDelito from '../componets/formularios/DelegacionesDelito';
import Sospechoso from '../componets/formularios/Sospechoso';
import Fiscal from '../componets/formularios/Fiscal';
import Boleta from '../componets/formularios/Boleta';
import Observaciones from '../componets/formularios/Observaciones';
import Informe from '../componets/formularios/Informe';


const AgregarDelegacion = () => {
    const navigate = useNavigate();
    
  return (
    <div>
        <div className='flex items-center'>
        <BiCaretLeftCircle  className='text-4xl text-sky-950'
        onClick={() => navigate(`/Delegaciones`)}/>
        <h1 className='font-black text-4xl text-gray-500 '>AGREGAR DELEGACIÓN</h1>
     
        </div>
        <hr className='my-4 border-sky-950  '/>

        <form >
        <Asignacion/>
        <Localizacion/>
        <DelegacionesDelito/>
        <Sospechoso/>
        <Fiscal/>
        <Boleta/>
        <Observaciones/>
        <Informe/>

        <div className="mx-8">
            <Link to="/Delegaciones" className="py-2 w-300 block text-center bg-sky-950 text-gray-300 border rounded-xl hover:scale-100 duration-300 hover:bg-blue-950 hover:text-white">Guardar</Link>
          </div>

        </form>
        
        
        
      
    </div>
  )
}

export default AgregarDelegacion