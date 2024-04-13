import React from 'react'

const AddDelitos = () => {
  return (
    <div >
        <form >
            <div className='flex px-10'>
                  <div className=' mr-3'>
                      <label className='mr-2'>Delito</label>
                      <input type="String" className="w-15 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
                  </div>
                  <div className=' mx-3'>
                      <label className='mr-2'>Sección</label>
                      <input type="String" className=" rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
                  </div>

                  <div className='mx-5'>
                      <button className="py-2 w-20 block text-center bg-blue-950 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-sky-950 hover:text-white">Agregar</button>
                  </div>
            </div>
            



        </form>


    </div>
  )
}

export default AddDelitos