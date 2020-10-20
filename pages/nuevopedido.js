import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import PedidoContext from "../context/pedidos/PedidoContext";
import AsignarCliente from "../components/pedidos/asignarCliente";
import AsignarProductos from "../components/pedidos/asignarProductos";
import ResumenPedido from "../components/pedidos/resumenPedido";
import Total from "../components/pedidos/total";

const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
    }
  }
`;

const OBTENER_PEDIDOS = gql`
  query obtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
    }
  }
`;

const NuevoPedido = () => {
  const router = useRouter();
  const pedidoContext = useContext(PedidoContext);
  const { cliente, productos, total } = pedidoContext;
  const [mensaje, setMensaje] = useState(null);

  // Mutation para el nuevo pedido
  const [nuevoPedido] = useMutation(NUEVO_PEDIDO, {
    update(cache, { data: { nuevoPedido } }) {
      const { obtenerPedidosVendedor } = cache.readQuery({
        query: OBTENER_PEDIDOS,
      });
      cache.writeQuery({
        query: OBTENER_PEDIDOS,
        data: {
          obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido],
        },
      });
    },
  });

  const crearNuevoPedido = async () => {
    const { id } = cliente;
    // remover no deseado de productos
    const pedido = productos.map(
      ({ __typename, existencia, ...producto }) => producto
    );
    try {
      const { data } = await nuevoPedido({
        variables: {
          input: { pedido, cliente: id, total },
        },
      });

      setMensaje("Datos salvados");
      router.push("/pedidos");
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const validarPedido = () => {
    return !productos.every((producto) => producto.cantidad > 0) ||
      total === 0 ||
      cliente.length === 0
      ? "opacity-50 cursor-not-allowed"
      : "";
  };

  const MostrarMensaje = () => {
    return (
      <div className=" flex justify-center py-2 px-3 text-center">
        <p> {mensaje} </p>
      </div>
    );
  };

  return (
    <Layout className="text-2xl text-gray-800 font-ligth">
      <h1 className="flex justify-center text-2xl text-gray-800 font-ligth">
        Crear Nuevo Pedido
      </h1>
      {mensaje && MostrarMensaje()}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProductos />
          <ResumenPedido />
          <Total />
          <button
            type="button"
            className={`bg-gray-800 w-full mt-5 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
            onClick={() => crearNuevoPedido()}
          >
            Registrar
          </button>
        </div>
      </div>
    </Layout>
  );
};
export default NuevoPedido;
