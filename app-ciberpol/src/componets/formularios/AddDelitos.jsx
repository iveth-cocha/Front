import React from 'react'

const AddDelitos = () => {
  return (
    <div >
        <form >
            <div className='flex flex-row flex-wrap  gap-8'>
                  <div >
                      <label >Delito</label>
                      <input type="String" className="w-15 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
                  </div>
                  <div >
                      <label >Sección</label>
                      <input type="String" className=" rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
                  </div>

                  <div >
                      <button className="py-2 w-20 text-center bg-blue-950 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-sky-950 hover:text-white">Agregar</button>
                  </div>
            </div>
            



        </form>


    </div>
  )
}

export default AddDelitos