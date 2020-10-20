import React from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import Pedido from "../components/pedido";

const OBTENER_PEDIDOS = gql`
  query obtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
      pedido {
        id
        cantidad
        nombre
      }
      cliente{
        id
        nombre
        apellido
        empresa
        email
        telefono
      }
      vendedor
      total
      estado
    }
  }
`;

const Pedidos = () => {
  const { data, loading, error } = useQuery(OBTENER_PEDIDOS);

  if (loading) return "cargando...";

  const { obtenerPedidosVendedor } = data;
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-ligth">Pedidos</h1>
      <Link href="/nuevopedido">
        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-grey-800 mb-3 uppercase font-bold">
          Nuevo Pedido
        </a>
      </Link>

      {obtenerPedidosVendedor.length === 0 ? (
        <p className="mt-5 text-center text-2x-l"> No hay pedidos </p>
      ) : (
         
        obtenerPedidosVendedor.map((pedido) => (
          <Pedido key={pedido.id} pedido={pedido} />
        ))
         
      )}
    </Layout>
  );
};

export default Pedidos;
