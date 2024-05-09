import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDeleteForever, MdEditDocument } from 'react-icons/md'
import Mensaje from './Alertas/Mensaje'
import ReactPaginate from 'react-paginate';

const Paginator = ({ pageCount, handlePageClick, currentPage }) => {
    return (
      <ReactPaginate
        previousLabel={'Anterior <'}
        nextLabel={'> Siguiente'}
        breakLabel={`Página ${currentPage + 1} de ${pageCount}`}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        previousClassName={'prev'}
        nextClassName={'next'}
      />
    );
  };

const TablaDelitos = () => {
    const [tipDelitos, setTipDelitossuarios] = useState([])
    const [mensaje, setMensaje] = useState({})

    const [currentPage, setCurrentPage] = useState(0);
    const [perPage] = useState(5); // Cantidad de elementos por página



    const listarTipDelitos = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/delitos`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setTipDelitossuarios(respuesta.data, ...tipDelitos)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listarTipDelitos();
    }, [])

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm("Eliminar al usuario")
            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}//eliminar/delito/${id}`
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
                await axios.delete(url, { headers, data });
                listarUsuarios()
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const pageCount = Math.ceil(tipDelitos.length / perPage);
    const startIndex = currentPage * perPage;
    const endIndex = Math.min(startIndex + perPage, tipDelitos.length);
    const currentData = tipDelitos.slice(startIndex, endIndex);

    const displayDelitos = currentData.map((tipDelito, index) => (
        <tr key={tipDelito.id}>
            <td>{startIndex + index + 1}</td>
            <td>{tipDelito.delito}</td>
            <td>{tipDelito.seccion}</td>
            <td className='py-2 text-center'>
                <MdEditDocument title='Actualizar' className="h-7 w-7 text-green-600 cursor-pointer inline-block mr-2" />
                <MdDeleteForever onClick={() => handleDelete(tipDelito.id)} className="h-7 w-7 text-red-900 cursor-pointer inline-block" />
            </td>
        </tr>
    ));

    return (
        <>
            {tipDelitos.length === 0
                ? <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                :
                <>
                    <div className="flex items-center justify-between  bg-sky-950 text-white">
                    <ReactPaginate className='flex items-center justify-between'
                            previousLabel={'Anterior <'}
                            nextLabel={'> Siguiente'}
                            breakLabel={`Página ${currentPage + 1} de ${pageCount}`}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            previousClassName={'prev'}
                            nextClassName={'next'}
                        />
                        
                    </div>
                    <table className='w-full table-auto shadow-lg bg-white'>
                        <thead className='bg-sky-950 text-white'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Delito</th>
                                <th className='p-2'>Sección</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayDelitos}
                        </tbody>
                    </table>
                </>
            }
        </>

    )
}

export default TablaDelitos