import React from 'react'
import { BiCaretLeftCircle } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom'
import NewDelegacion from '../componets/formularios/NewDelegacion';


const AgregarDelegacion = () => {
    const navigate = useNavigate();
  
  return (
    <div>
        <div className='flex items-center'>
        <BiCaretLeftCircle  className='text-4xl text-sky-950'
        onClick={() => navigate(`/delegaciones`)}/>
        <h1 className='font-black text-4xl text-gray-500 '>AGREGAR DELEGACIÓN</h1>     
        </div>
        <hr className='my-4 border-sky-950  '/>

        <NewDelegacion/>
        
        
        
      
    </div>
  )
}

export default AgregarDelegacion