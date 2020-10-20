import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Layout from "../components/Layout";

const MEJORES_CLIENTES = gql`
  query mejoresClientes {
    mejoresClientes {
      cliente {
        nombre
      }
      total
    }
  }
`;

const MejoresClientes = () => {
  const { data, loading, error, startPolling, stopPolling } = useQuery(
    MEJORES_CLIENTES
  );

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling;
    };
  }, [startPolling, stopPolling]);

  if (loading) return "...cargando";
  const { mejoresClientes } = data;
  const clientesGrafica = [];

  mejoresClientes.map((cliente, index) => {
    clientesGrafica[index] = {
      ...cliente.cliente[0],
      total: cliente.total,
    };
  });

  return (
    <Layout>
      <h1 className="flex justify-center text-2xl text-gray-800 font-ligth">
        Mejores vendedores
      </h1>

      <BarChart
        className="mt-10 "
        width={600}
        height={500}
        data={clientesGrafica}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nombre" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#3182CE" />
      </BarChart>
    </Layout>
  );
};

export default MejoresClientes;
