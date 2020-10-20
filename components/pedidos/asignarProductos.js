import React, { useEffect, useContext, useState } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import PedidoContext from "../../context/pedidos/PedidoContext";

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

const AsignarProductos = () => {
  const [productos, setProductos] = useState([]);
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);
  const pedidoContext = useContext(PedidoContext);
  const { agregarProductos } = pedidoContext;

  useEffect(() => {
    if (productos) {
      agregarProductos(productos);
    }
  }, [productos]);

  const seleccionar = (producto) => {
    setProductos(producto);
  };

  if (loading) return null;

  const { obtenerProductos } = data;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-m font-bold">
        Buscar Productos
      </p>
      <Select
        className="mt-3"
        options={obtenerProductos}
        onChange={(opcion) => seleccionar(opcion)}
        getOptionValue={(opciones) => opciones.id}
        getOptionLabel={(opciones) =>
          `${opciones.nombre} - ${opciones.existencia} disponibles`
        }
        placeholder="Seleccione el producto"
        noOptionsMessage={() => "No hay resultados"}
        isMulti={true}
      />
    </>
  );
};

export default AsignarProductos;
