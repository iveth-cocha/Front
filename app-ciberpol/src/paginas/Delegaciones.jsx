import React from 'react'
import TablaDelegaciones from '../componets/TablaDelegaciones'
import { useNavigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";

const Delegaciones = () => {
  const navigate = useNavigate();
  return (
    <div >
      <h1 className='font-black text-4xl text-gray-500 '>DELEGACIONES</h1>
      <hr className='my-4 border-sky-950  '/>

      <div className=' flex justify-center items-center mb-2'>
        <div className='flex'>
          <label className='mr-3 mt-1'>Buscar</label>
          <input type="String" placeholder=" Instrución Fiscal/Investugación Previa" className=" rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          <IoSearch className='p-2 h-9 w-9 bg-blue-950 rounded-md border text-slate-200 mr-8' />
        </div>



      </div>

      <input
        type="submit"
        className='bg-sky-950 w-auto p-3  text-slate-300 font-bold rounded-lg 
                    hover:bg-blue-950 cursor-pointer transition-all ml-auto mb-3'
        onClick={() => navigate(`/delegaciones/nuevaDelegacion`)}
        value='Nueva Delegación'
      />


      <TablaDelegaciones/>
    


    </div>
  )
}

export default Delegaciones