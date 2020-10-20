import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";
import Cliente from "../components/cliente";
import jwt from 'jsonwebtoken';

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

const Index = () => {
    const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIOS);
    const router = useRouter();

    useEffect(() => {
        var token = localStorage.getItem("token");
        if (!token) {
            router.push('/login');
        }

        return function validar() {
            try {
                const usuario = jwt.verify(token, 'palabraSecreta');
            } catch (error) {
                console.log('error de token desde index');
                router.push('/login');
            }
        }

    }, []);
    
    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-ligth">Clientes</h1>
                <Link href="/nuevocliente">
                    <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-grey-800 mb-3 uppercase font-bold w-full lg:w-auto text-center">
                        Nuevo Cliente
          </a>
                </Link>

                <div className="overflow-x-scroll">
                    <table className=" table-auto shadow-md mt-10 w-full w-lg">
                        <thead className="bg-gray-800">
                            <tr className="text-white">
                                <th className="w-1/5 py-2">Nombre</th>
                                <th className="w-1/5 py-2">Empresa</th>
                                <th className="w-1/5 py-2">Email </th>
                                <th className="w-1/5 py-2">Eliminar</th>
                                <th className="w-1/5 py-2">Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data ? (
                                data.obtenerClienteVendedor.map((cliente) => (
                                    <Cliente key={cliente.id} cliente={cliente} />
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
        </div>
    );
};

export default Index;
