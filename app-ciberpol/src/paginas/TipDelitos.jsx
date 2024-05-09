import React from 'react'
import TablaDelitos from '../componets/TablaDelitos'
import { useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';

const TipDelitos = () => {
  const navigate = useNavigate();
  return (
    <div>
        <h1 className='font-black text-4xl text-gray-500 uppercase '>registro de delitos</h1>
      <hr className='my-4 border-sky-950  '/>

      <div className=' flex justify-center items-center mb-2'>
        <div className='flex'>
          <label className='mr-2 mt-1' >Buscar</label>
          <input type="String" className=" rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          <IoSearch className='p-2 h-9 w-9 bg-blue-950 rounded-md border text-slate-200 mr-8' />
        </div>
      </div>


      <div className=' mb-2 ml-10' >
        <button  onClick={() => navigate(`/delitosyTipificaciones/agregarDelito`)}className="py-2 px-3 w-auto text-center bg-blue-950 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-sky-950 hover:text-white">Añadir Delito</button>
      </div>
      <TablaDelitos/>



    </div>
  )
}

export default TipDelitos