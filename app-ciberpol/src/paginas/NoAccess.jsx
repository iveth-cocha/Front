import React from 'react'

import { useNavigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import Asiganacion from '../componets/formularios/Asignacion';
import TablaVisualidorD from '../componets/TablaVisualidorD';


const NoAccess = () => {
    const navigate = useNavigate();
  return (
    <div >
      <h1 className='font-black text-4xl text-gray-500 '>DELEGACIONES</h1>
      <hr className='my-4 border-sky-950  '/>



      <TablaVisualidorD/> 
       
    


    </div>
  )
}

export default NoAccess;
