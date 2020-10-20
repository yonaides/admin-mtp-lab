import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import PedidoContext from "../../context/pedidos/PedidoContext";

const OBTENER_CLIENTES_USUARIOS = gql`
  query obtenerClienteVendedor {
    obtenerClienteVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const AsignarCliente = () => {
  const [cliente, setCliente] = useState([]);
  // context de pedidos
  const pedidoContext = useContext(PedidoContext);
  const {agregarCliente} = pedidoContext;

  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIOS);

  useEffect(() => {
    agregarCliente(cliente);
  }, [cliente]);

  const seleccionar = (producto) => {
    setCliente(producto);
  };

  if (loading) {
    return null;
  }

  const { obtenerClienteVendedor } = data;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-m font-bold">
        Asignar un Cliente al Pedido
      </p>
      <Select
        className="mt-3"
        options={obtenerClienteVendedor}
        onChange={(opcion) => seleccionar(opcion)}
        getOptionValue={(opciones) => opciones.id}
        getOptionLabel={(opciones) => opciones.nombre}
        placeholder="Busque o Seleccione el Cliente"
        noOptionsMessage={() => "No hay resultados"}
      />
    </>
  );
};

export default AsignarCliente;
