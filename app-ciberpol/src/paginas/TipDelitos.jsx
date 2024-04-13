import React from 'react'
import AddDelitos from '../componets/formularios/AddDelitos'
import TablaDelitos from '../componets/TablaDelitos'

const TipDelitos = () => {
  return (
    <div>
        <h1 className='font-black text-4xl text-gray-500 uppercase '>registro de delitos</h1>
      <hr className='my-4 border-sky-950  '/>

      <AddDelitos/>
      <TablaDelitos/>



    </div>
  )
}

export default TipDelitos