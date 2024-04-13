import React from 'react'
import TablaUsuarios from '../componets/TablaUsuarios'

const Usuarios = () => {
  return (
    <div>
        <h1 className='font-black text-4xl text-gray-500 '>Usuarios</h1>
        <hr className='my-4 border-sky-950  '/>

    <TablaUsuarios/>

</div>
  )
}

export default Usuarios