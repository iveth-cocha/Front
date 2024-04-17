import React from 'react'
import { TablaActualizaciones } from '../componets/TablaActualizaciones'

const Mapeo = () => {
  return (
    <div>
        <h1 className='font-black text-4xl text-gray-500 uppercase '>Segimiento de actualizaciones realizadas</h1>
        <hr className='my-4 border-sky-950  '/>

        <TablaActualizaciones/>
    </div>
  )
}

export default Mapeo