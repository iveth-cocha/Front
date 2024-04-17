import React from 'react'
import { Link } from 'react-router-dom'

const Confirmar = () => {
  return (

      <div className="h-screen bg-cover bg-center font-serif" style={{ backgroundImage: `url('/fondo_base.jpg')` }} >
          <div className="flex flex-col justify-center items-center h-full">
            <p className='uppercase'>agregar el token en la ruta para la funcionalida en el archivo app</p>
              <div className='flex flex-row flex-wrap  gap-8 mb-3'>
                  <img src="/logo_policia.png" className=' h-32' />
                  <img src="/logo_ciberpol.png" className='h-32' />
              </div>
              <p className="text-3xl md:text-4xl lg:text-3xl text-gray-800 mt-8 uppercase">Muchas Gracias por confirmar tu cuenta</p>
              <p className="md:text-lg lg:text-xl text-gray-600 mt-8 ">Ya puedes    
                <Link to="/" className=" text-gray-600 hover:text-blue-900 underline ">Iniciar Seción</Link>
              </p>

          </div>
      </div>
   
  )
}

export default Confirmar