import axios from 'axios'
import React, { useState } from 'react'
import Mensaje from '../Alertas/Mensaje'

const AddDelitos = () => {
    const [mensaje, setMensaje] = useState({})
    const [form, setform] = useState({
        delito: "",
        seccion: ""
    })
    const handleChange = (e) => {
        setform({...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e) => { 
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/registro/delito`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.post(url,form,options)
			setMensaje({ respuesta:"Delito Añadido a la Lista", tipo: true })
            setform({
                delito: " ",
                seccion: " "
            })
            setTimeout(() => {
                setMensaje({});
            }, 3000);
            
        } catch (error) {
			setMensaje({ respuesta: error.response.data.msg, tipo: false })
            setform({})
            setTimeout(() => {
                setMensaje({})
                
            }, 3000);
        }
    }

  return (
    <div >
        {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
        <form  onSubmit={handleSubmit}>
            <div className='flex flex-row flex-wrap  gap-8 mb-3'>
                  <div >
                      <label className='mr-2' >Delito</label>
                      <input type="String"
                      id='delito' 
                      name='delito'
                      onChange={handleChange}
                      className="w-15 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
                  </div>
                  <div >
                      <label className='mr-2'>Sección</label>
                      <input type="String" 
                      id='seccion' 
                      name='seccion'
                      onChange={handleChange}
                      className=" rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
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