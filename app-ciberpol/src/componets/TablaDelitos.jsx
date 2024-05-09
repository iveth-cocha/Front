import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDeleteForever, MdEditDocument } from 'react-icons/md'
import Mensaje from './Alertas/Mensaje'
import ReactPaginate from 'react-paginate';

const Paginator = ({ pageCount, handlePageClick, currentPage }) => {
    return (
      <ReactPaginate  className="flex flex-row flex-wrap justify-center  bg-sky-950 text-white italic py-2 rounded-t-lg border-b-2 border-gray-500"
        previousLabel={'Anterior <'}
        nextLabel={'> Siguiente'}
        breakLabel={`... Página ${currentPage + 1} de ${pageCount} ...`}
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
    const [tipDelitos, setTipDelitos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage] = useState(8); 
    const [pageCount, setPageCount] = useState(0);
  
    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
    };
  
    const fetchData = async () => {
        try {
          const token = localStorage.getItem('token');
          const url = `${import.meta.env.VITE_BACKEND_URL}/delitos`;
          const options = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          };
          const respuesta = await axios.get(url, options);
          setTipDelitos(respuesta.data);
          setPageCount(Math.ceil(respuesta.data.length / perPage));
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, [currentPage, perPage]);

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm("Eliminar el delito")
            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/eliminar/delito/${id}`
                const headers= {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                await axios.delete(url, {headers});
                fetchData();
            }
        }
        catch (error) {
            console.log(error);
        }
    }

  
    const displayDelitos = tipDelitos
      .slice(currentPage * perPage, (currentPage + 1) * perPage)
      .map((tipDelito, index) => (
        <tr className="border-b hover:bg-gray-300 text-center px-8" key={tipDelito.id}>
          <td>{index + 1}</td>
          <td>{tipDelito.delito}</td>
          <td>{tipDelito.seccion}</td>
          <td className="py-2 text-center">
            <MdEditDocument
              title="Actualizar"
              className="h-7 w-7 text-green-600 cursor-pointer inline-block mr-2"
            />
            <MdDeleteForever
              onClick={() => handleDelete(tipDelito.id)}
              className="h-7 w-7 text-red-900 cursor-pointer inline-block"
            />
          </td>
        </tr>
      ));

    
     

  
    return (
      <>
        {tipDelitos.length === 0 ? (
          <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
        ) : (
          <>
          <Paginator 
              pageCount={pageCount}
              handlePageClick={handlePageClick}
              currentPage={currentPage}
            />
            <table className="w-full table-auto shadow-lg bg-white">
              <thead className="bg-sky-950 text-white">
                <tr>
                  <th className="p-2">N° </th>
                  <th className="p-2">Delito </th>
                  <th className="p-2">Sección</th>
                  <th className="p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>{displayDelitos}</tbody>
            </table>
            
          </>
        )}
      </>
    );
  };
  
  export default TablaDelitos;