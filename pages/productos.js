import React from "react";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import Layout from "../components/Layout";
import Producto from "../components/producto";

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      precio
      existencia
    }
  }
`;

const Productos = () => {
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

  if (loading) return "espere...";

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-ligth">
        Listado de Productos
      </h1>

      <Link href="/nuevoproducto">
        <a
          className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm  w-full lg:w-auto text-center"
          href="#"
        >
          Nuevo Producto
        </a>
      </Link>
      <div className="overflow-x-scroll">
        <table className=" table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Existencia</th>
              <th className="w-1/5 py-2">Precio</th>
              <th className="w-1/5 py-2">Eliminar</th>
              <th className="w-1/5 py-2">Editar</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.obtenerProductos.map((producto) => (
                <Producto key={producto.id} producto={producto} />
              ))
            ) : (
              <tr>
                <td className="border px-4 py-2">No hay datos que mostrar</td>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Productos;
