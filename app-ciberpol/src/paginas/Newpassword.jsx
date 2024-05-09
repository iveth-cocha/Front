import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';

const Newpassword = () => {
  const navigate = useNavigate();
    const { token } = useParams(); 
  
    const [mensaje, setMensaje] = useState({})
    const [form, setForm] = useState({
        newPassword: '',
        confirmPassword: ''
      });
    
      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/actualizar-contrasena/${token}`;
          const response = await axios.put(url, form); // Envía los datos del formulario en la solicitud
          setMensaje({ respuesta: response.data.msg, tipo: true });
          setTimeout(() => {
            navigate('/');
        }, 3000);
        } catch (error) {
          setMensaje({ respuesta: error.response.data.msg, tipo: false });
        }
      };

  return (
    <div className="h-screen bg-cover bg-center font-serif" style={{ backgroundImage: `url('/fondo_base.jpg')` }}>
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex flex-row flex-wrap gap-8 mb-3">
          <img src="/logo_policia.png" className="h-32" alt="Logo Policía" />
          <img src="/logo_ciberpol.png" className="h-32" alt="Logo Ciberpol" />
        </div>
        <h1 className="text-3xl font-bold underline text-red mb-3">SISTEMA DE DELEGACIONES</h1>
        <h2 className="text-3xl font-bold text-red mb-4">Crear contraseña</h2>
        {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

        <form onSubmit={handleSubmit} className='bg-slate-300 rounded-lg border p-5'>
          <div className="mb-3">
            <label className="mr-4">Nueva Contraseña</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="**************"
              className="block w-full rounded-md border border-gray-300 focus:border-sky-900 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>
          <div className="mb-3">
            <label className="mr-4">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="**************"
              className="block w-full rounded-md border border-gray-300 focus:border-sky-900 focus:outline-none focus:ring-1 focus:ring-sky-900 py-1 px-2 text-gray-500"
            />
          </div>

          <div className="mx-8">
            <button to="/" type="submit" className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Crear Contraseña</button>
          </div>
        </form>

        <div className="mt-3 text-sm flex justify-between items-center">
          
          

        </div>
      </div>
    </div>
  );
};

export default Newpassword;
