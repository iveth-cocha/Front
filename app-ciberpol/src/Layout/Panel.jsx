import {React,useContext, useEffect, useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';
import AuthContext from '../componets/context/AuthProvider';
import axios from 'axios';





const Panel = () => {
    const location = useLocation();
    const urlActual = location.pathname;
    const esDelegaciones = urlActual.startsWith('/delegaciones');
    const esDelito = urlActual.startsWith('/delitos');
    const esMapeo = urlActual.startsWith('/mapeo');
    const esUsuario = urlActual.startsWith('/usuarios');
    const esAgente = urlActual.startsWith('/agentes');
    const { auth} = useContext(AuthContext)
    const autenticado = localStorage.getItem('token')

    const grado = localStorage.getItem('grado');
    const nombre = localStorage.getItem('nombre');
    const rol = localStorage.getItem('Rol');

    const navigate = useNavigate();
    const [tokenS, setTokenS] = useState(null);
    const [mensaje, setMensaje] = useState({});
  
    const handleLogout = async () => {
        const consultarToken = async () => {
            try {
                const tokenSession = localStorage.getItem('tokenSession');
                const url = `${import.meta.env.VITE_BACKEND_URL}/logout/${tokenSession}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                };

                const respuesta = await axios.post(url, {}, options);
                setTokenS(respuesta.data.msg);
            } catch (error) {
                setMensaje({ respuesta: error?.response?.data?.msg, tipo: false });
            }
        };

        await consultarToken();
        
        localStorage.removeItem('token');
        localStorage.removeItem('grado');
        localStorage.removeItem('nombre');
        localStorage.removeItem('Rol');
        localStorage.removeItem('tokenSession');
        navigate('/');
    };


    return (
        <div className='md:flex md:min-h-screen font-serif'>
            <div className='md:w-1/5 bg-blue-950 px-5 py-4'>
                <h2 className='text-2xl font-black text-center text-slate-200'>Bienvenido </h2>
                <div className='flex items-center justify-center mt-4'>
                    <FaRegUserCircle className='h-20 w-20 text-slate-200' />
                </div>
                <p className='text-slate-400 text-center my-4 text-sm font-bold'>{grado && nombre && rol ? `${grado} ${nombre} - ${rol}` : ''}</p>
                <hr className="mt-5 border-slate-500" />
                <ul className="mt-5">
                    {rol === "Administrador" && (
                        <>
                            <li className="text-center">
                                <Link to='/delegaciones' className={`${esDelegaciones ? 'text-black-200 bg-gradient-to-r from-gray-300 to-slate-300  px-3 py-2 rounded-md text-center ' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Delegaciones</Link>
                            </li>
                            <li className="text-center">
                                <Link to='/usuarios' className={`${esUsuario ? 'text-black-200 bg-gradient-to-r from-gray-300 to-slate-300  px-3 py-2 rounded-md text-center ' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Usuarios</Link>
                            </li>
                            <li className="text-center">
                                <Link to='/mapeo' className={`${esMapeo ? 'text-black-200 bg-gradient-to-r from-gray-300 to-slate-300  px-3 py-2 rounded-md text-center ' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Mapeo</Link>
                            </li>
                            <li className="text-center">
                                <Link to='/agentes' className={`${esAgente ? 'text-black-200 bg-gradient-to-r from-gray-300 to-slate-300  px-3 py-2 rounded-md text-center ' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Agentes</Link>
                            </li>
                        </>
                    )}
                    {(rol === "Registrador" ) && (
                        <>
                            <li className="text-center">
                                <Link to='/delegaciones' className={`${esDelegaciones ? 'text-black-200 bg-gradient-to-r from-gray-300 to-slate-300  px-3 py-2 rounded-md text-center ' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Delegaciones</Link>
                            </li>
                            <li className="text-center">
                                <Link to='/delitos' className={`${esDelito ? 'text-black-200 bg-gradient-to-r from-gray-300 to-slate-300  px-3 py-2 rounded-md text-center ' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Delitos</Link>
                            </li>
                        
                            <li className="text-center">
                                <Link to='/agentes' className={`${esAgente ? 'text-black-200 bg-gradient-to-r from-gray-300 to-slate-300  px-3 py-2 rounded-md text-center ' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Agentes</Link>
                            </li>
                            
                        </>
                    )}
                    
                    {(rol === "Visualizador" ) && (
                        <>
                            <li className="text-center">
                                <Link to='/delegaciones' className={`${esDelegaciones ? 'text-black-200 bg-gradient-to-r from-gray-300 to-slate-300  px-3 py-2 rounded-md text-center ' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Delegaciones</Link>
                            </li>
                            
                            
                        </>
                    )}
                </ul>
            </div>

            <div className='flex-1 flex flex-col justify-between h-screen'>
                <div className='bg-gradient-to-r from-blue-950 to-sky-950 py-2 flex md:justify-end items-center gap-5 justify-center'>
                    <div>
                        <button  onClick={handleLogout}  className="text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-800 px-4 py-1 rounded-lg">Salir</button>
                    </div>
                </div>
                <div className='overflow-y-scroll h-screen bg-cover bg-center p-10' style={{backgroundImage: `url('/fondo_base.jpg')`}}>
                    {autenticado ? <Outlet /> : <Navigate to="/" />}
                </div>
            </div>
        </div>
    );
};

export default Panel;
