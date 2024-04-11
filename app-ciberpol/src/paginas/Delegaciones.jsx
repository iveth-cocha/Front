import React from 'react'
import TablaDelegaciones from '../componets/TablaDelegaciones'
import { useNavigate } from 'react-router-dom'

const Delegaciones = () => {
  const navigate = useNavigate();
  return (
    <div >
      <h1 className='font-black text-4xl text-gray-500 '>DELEGACIONES</h1>
      <hr className='my-4 border-sky-950  '/>

      <input
        type="submit"
        className='bg-sky-950 w-auto p-3  text-slate-300 font-bold rounded-lg 
                    hover:bg-blue-950 cursor-pointer transition-all ml-auto'
        onClick={() => navigate(`/Delegaciones/NuevaDelegacion`)}
        value='Nueva Delegación'
      />


      <TablaDelegaciones/>
    


    </div>
  )
}

export default Delegaciones