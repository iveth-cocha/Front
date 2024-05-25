import React, { useEffect } from 'react';
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

const NoAccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/delegaciones');
        }, 3000);

        // Limpia el temporizador en el desmontaje del componente
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="h-screen bg-cover bg-center font-serif relative" style={{ backgroundImage: `url('/fondo_base.jpg')` }}>
            <div className="flex flex-col justify-center items-center h-full">
                <ImCancelCircle className="absolute text-red-200 text-[35rem]" />
                <div className='flex flex-col items-center gap-8 z-20'>
                    <div className='flex flex-row flex-wrap gap-8 mb-3'>
                        <img src="/logo_policia.png" className='h-32' />
                        <img src="/logo_ciberpol.png" className='h-32' />
                    </div>
                    <p className="text-3xl md:text-4xl lg:text-3xl text-gray-800 mt-8">
                        Su rol no cuenta con el permiso para acceder a esta acción
                    </p>
                </div>
            </div>
        </div>
    );
}

export default NoAccess;
