import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever, MdEditDocument } from 'react-icons/md';
import { VscOpenPreview } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import Mensaje from './Alertas/Mensaje';
import ReactPaginate from 'react-paginate';

const Paginator = ({ pageCount, handlePageClick, currentPage }) => {
  return (
    <ReactPaginate className="flex flex-row flex-wrap justify-center  bg-sky-950 text-white italic py-2 rounded-t-lg border-b-2 border-gray-500"
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

const TablaDelegaciones = () => {
  const navigate = useNavigate();

  const [delegaciones, setDelegaciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10);
  //const [perPage] = useState(8);
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const listarDelegaciones = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BACKEND_URL}/delegaciones`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(url, options);
      setDelegaciones(respuesta.data);
      setPageCount(Math.ceil(respuesta.data.length / perPage));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarDelegaciones();
  }, [currentPage, perPage]);

  return (
    <>
      {delegaciones.length === 0 ? (
        <Mensaje tipo={'active'}>{'No existen Delegaciones'}</Mensaje>
      ) : (
        <>
          <Paginator
            pageCount={pageCount}
            handlePageClick={handlePageClick}
            currentPage={currentPage}
          />
          <table className="w-full  table-auto shadow-lg bg-white">
            <thead className="bg-sky-950 text-white">
              <tr>
                <th className="p-2 w-4">N° Orden</th>
                <th className="p-3 w-7">Año Ingreso</th>
                <th className="p-3 w-20">N° Instrucción Fiscal</th>
                <th className="p-2">N° Investigación Previa</th>
                <th className="p-2 w-3">Grado</th>
                <th className="p-2">Agente</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {delegaciones
                .slice(currentPage * perPage, (currentPage + 1) * perPage)
                .map((delegacion) => (
                  <tr
                    className="border-b hover:bg-gray-300 text-center"
                    key={delegacion._id}
                  >
                    <td>{delegacion.orden}</td>
                    <td>{delegacion.anio_ingreso}</td>
                    <td>{delegacion.numero_instruccion_fiscal}</td>
                    <td>{delegacion.numero_investigacion_previa}</td>
                    <td>{delegacion.grado_agente}</td>
                    <td>{delegacion.apellidos_nombres_agente}</td>
                    <td className="py-2 text-center">
                      <VscOpenPreview
                        title="Detalle"
                        className="h-7 w-7 text-blue-800 cursor-pointer inline-block mr-2"
                        onClick={() =>
                          navigate(`/delegaciones/detalleDelegacion/${delegacion.id}`)
                        }
                      />
                      <MdEditDocument
                        title="Actualizar"
                        className="h-7 w-7 text-green-600 cursor-pointer inline-block mr-2"
                        onClick={() =>
                          navigate(`/delegaciones/actualizarDelegacion/${delegacion.id}`)
                        }
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default TablaDelegaciones;
