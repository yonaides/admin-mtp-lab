import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import Layout from "../components/Layout";

const NUEVO_CLIENTE = gql`
  mutation nuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const OBTENER_CLIENTES_USUARIOS = gql`
  query obtenerClienteVendedor {
    obtenerClienteVendedor {
      id
      nombre
      apellido
      empresa
      email
      vendedor
    }
  }
`;

const NuevoCliente = () => {
  const router = useRouter();
  const [mensaje, setMensaje] = useState(null);
  const [nuevoCliente, { loading: mutationLoading, error: mutationError }] = useMutation( NUEVO_CLIENTE,
    {
      update(cache, { data: { nuevoCliente } }) {
        const { obtenerClienteVendedor } = cache.readQuery({
          query: OBTENER_CLIENTES_USUARIOS,
        });
        cache.writeQuery({
          query: OBTENER_CLIENTES_USUARIOS,
          data: {
            obtenerClienteVendedor: [...obtenerClienteVendedor, nuevoCliente],
          },
        });
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      empresa: "",
      email: "",
      telefono: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required("El nombre es obligatorio")
        .min(2, "Debe escribir un nombre valido"),
      apellido: Yup.string().required("El apellido es obligatorio"),
      empresa: Yup.string().required("La empresa es obligatoria"),
      email: Yup.string()
        .required("El nombre es obligatorio")
        .email("Escriba un email valido"),
    }),
    onSubmit: async (valores) => {
      const { nombre, apellido, empresa, email, telefono } = valores;
      try {
        const { data } = await nuevoCliente({
          variables: {
            input: {
              nombre,
              apellido,
              empresa,
              email,
              telefono,
            },
          },
        });

        router.push("/");
      } catch (error) {
        setMensaje(error.message); 
      }
    },
  });

  const mostrarMensaje = (msj) => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        {msj ? msj : mensaje}
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-ligth">Nuevo Cliente</h1>
      {mensaje && mostrarMensaje()}
      {mutationLoading && mostrarMensaje("Guardando Cliente")}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline focus:shadow-outline"
                id="nombre"
                placeholder="Nombre Cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
              {formik.touched.nombre && formik.errors.nombre ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold"> Error </p>
                  <p>{formik.errors.nombre} </p>
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="apellido"
              >
                Apellido
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline focus:shadow-outline"
                id="apellido"
                placeholder="Apellido"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.apellido}
              />
              {formik.touched.apellido && formik.errors.apellido ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold"> Error </p>
                  <p>{formik.errors.apellido} </p>
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="empresa"
              >
                Empresa
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline focus:shadow-outline"
                id="empresa"
                placeholder="Empresa"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.empresa}
              />
              {formik.touched.empresa && formik.errors.empresa ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold"> Error </p>
                  <p>{formik.errors.empresa} </p>
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline focus:shadow-outline"
                id="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold"> Error </p>
                <p>{formik.errors.email} </p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="telefono"
              >
                Telefono
              </label>
              <input
                type="tel"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline focus:shadow-outline"
                id="telefono"
                placeholder="Telefono"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telefono}
              />
            </div>
            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Registrar"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default NuevoCliente;
