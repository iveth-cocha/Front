import React from 'react'
import TablaDelitos from '../componets/TablaDelitos'
import { useNavigate } from 'react-router-dom';

const TipDelitos = () => {
  const navigate = useNavigate();
  return (
    <div>
        <h1 className='font-black text-4xl text-gray-500 uppercase '>registro de delitos</h1>
      <hr className='my-4 border-sky-950  '/>

      


      <div className=' mb-2 ' >
        <button  onClick={() => navigate(`/delitos/agregarDelito`)}className="py-2 px-3 w-auto text-center bg-blue-950 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-sky-950 hover:text-white">Añadir Delito</button>
      </div>
      <TablaDelitos/> 
      



    </div>
  )
}

export default TipDelitos