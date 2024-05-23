import React from 'react'
import TablaDelegaciones from '../componets/TablaDelegaciones'
import { useNavigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import Asiganacion from '../componets/formularios/Asignacion';


const Delegaciones = () => {
  const navigate = useNavigate();
  return (
    <div >
      <h1 className='font-black text-4xl text-gray-500 '>DELEGACIONES</h1>
      <hr className='my-4 border-sky-950  '/>

      <input
        type="submit"
        className=' bg-blue-900 w-auto p-3  text-white font-bold rounded-lg 
                  hover:bg-gray-600 cursor-pointer transition-all ml-auto mb-5'
        onClick={() => navigate(`/delegaciones/nuevaDelegacion`)}
        value='Nueva Delegación'
      />


      <TablaDelegaciones/> 
       
    


    </div>
  )
}

export default Delegaciones