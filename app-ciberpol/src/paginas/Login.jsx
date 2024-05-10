import {React,useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../componets/context/AuthProvider'

import axios from 'axios'
import Mensaje from '../componets/Alertas/Mensaje'





const Login = () => {
  
  const navigate = useNavigate()
  const {setAuth,setEstado} = useContext(AuthContext)
  const [mensaje, setMensaje] = useState({})

  const [form, setform] = useState({
      email: "",
      password: ""
  })

  const handleChange = (e) => {
    setform({...form,
        [e.target.name]:e.target.value
    })
}

const handleSubmit = async(e) => { 
      e.preventDefault()
      try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/login`
          const respuesta= await axios.post(url,form)
          localStorage.setItem('token',respuesta.data.token)
          localStorage.setItem('grado',respuesta.data.grado);
          localStorage.setItem('nombre',respuesta.data.nombre);
          localStorage.setItem('Rol',respuesta.data.Rol);
          console.log('Usuario almacenado en localStorage:', respuesta.data.grado + respuesta.data.nombre+respuesta.data.rol);

          setAuth(respuesta.data)
          navigate('/delegaciones')
      } catch (error) {
          setMensaje({respuesta:error.response.data.msg,tipo:false})
          setform({})
          setTimeout(() => {
              setMensaje({})
          }, 3000);
      }
}


  return (
    <div  className="h-screen bg-cover bg-center" style={{backgroundImage: `url('/fondo_base.jpg')`}} >
      <div className="flex flex-col justify-center items-center h-full">
        <div className='flex flex-row flex-wrap  gap-8 mb-5'>
          <img src="/logo_policia.png" className=' h-32' />
          <img src="/logo_ciberpol.png" className='h-32' />
        </div>

        <h1 className="text-3xl font-bold underline text-red mb-3">SISTEMA DE DELEGACIONES </h1>
        
        <h1 className="text-3xl font-bold text-red mb-4">Inicio de Sesión </h1>
        {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

        <form onSubmit={handleSubmit}>
          <div className='flex items-center justify-center mb-3'>
          <label className='mr-7'>Correo</label>
          <input type="email" 
           name='email'
           value={form.email || ""} onChange={handleChange}
          className="block w-full rounded-md border border-gray-300 focus:border-sky-900 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <div className='flex items-center justify-center mb-3'>
          <label className='mr-4'>Contraseña</label>
          <input type="password" placeholder="**************" 
          name='password'
          value={form.password || ""} onChange={handleChange}
          className="block w-full rounded-md border border-gray-300 focus:border-sky-900 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500" />
          </div>

          <div className="mx-8">
            <button to="/delegaciones" className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Ingresar</button>
          </div>

        </form>

        <div className="mt-3 text-sm flex justify-between items-center">
          
          <Link to="/registrar" className=" text-gray-600 hover:text-blue-900 ">Solicitar Registro</Link>

        </div>
        
        <div className="mt-3 text-sm flex justify-between items-center">
          
          <Link to="/forgot" className=" text-gray-600 hover:text-blue-900 ">Olvidó su contraseña</Link>

        </div>
        


      </div>
    </div>
  )
}

export default Login