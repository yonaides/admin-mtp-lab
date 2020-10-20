import React, { useState } from "react";
import { useFormik } from "formik";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import * as Yup from "yup";
import Swal from "sweetalert2";

const NUEVO_PRODUCTO = gql`
  mutation nuevoProducto($input: ProductoInput) {
    nuevoProducto(input: $input) {
        id
        nombre
        existencia
        precio
        creado
    }
  }
`;

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

const NuevoProducto = () => {
  const [mensaje, setMensaje] = useState(null);
  const router = useRouter();
  const [  nuevoProducto,  { loading: mutationLoading, error: mutationError }  ] = useMutation(NUEVO_PRODUCTO, {
    update(cache, { data: { nuevoProducto } }) {
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS,
      });
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: [...obtenerProductos, nuevoProducto],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      existencia: "",
      precio: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre del producto es obligatorio"),
      existencia: Yup.number()
        .required("la existencia es obligatoria")
        .positive("Solo numeros positivos")
        .integer("la existencia debe ser positivo"),
      precio: Yup.number()
        .required("La empresa es obligatoria")
        .positive("Solo numeros positivos"),
    }),
    onSubmit: async (valores) => {
      const { nombre, existencia, precio } = valores;
      try {
        const { data } = await nuevoProducto({
          variables: {
            input: {
              nombre,
              existencia,
              precio
            },
          },
        });

        Swal.fire({
          icon: "success",
          title: "Producto creado",
          showConfirmButton: false,
          timer: 1500,
        });

        router.push("/productos");
      } catch (error) {
        console.log(mutationError);
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
      <h1 className="text-2xl text-gray-800 font-light"> nuevo producto </h1>
      {mensaje && mostrarMensaje()}
      {mutationLoading && mostrarMensaje("Guardando Producto")}
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
                Nombre Producto
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline focus:shadow-outline"
                id="nombre"
                placeholder="Producto"
                onChange={formik.handleChange}
                value={formik.values.nombre}
                onBlur={formik.handleBlur}
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
                htmlFor="existencia"
              >
                Existencia
              </label>
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline focus:shadow-outline"
                id="existencia"
                placeholder="Existencia"
                onChange={formik.handleChange}
                value={formik.values.existencia}
                onBlur={formik.handleBlur}
              />
              {formik.touched.existencia && formik.errors.existencia ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold"> Error </p>
                  <p>{formik.errors.existencia} </p>
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="precio"
              >
                Precio
              </label>
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline focus:shadow-outline"
                id="precio"
                placeholder="Precio"
                onChange={formik.handleChange}
                value={formik.values.precio}
                onBlur={formik.handleBlur}
              />
              {formik.touched.precio && formik.errors.precio ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold"> Error </p>
                  <p>{formik.errors.precio} </p>
                </div>
              ) : null}
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

export default NuevoProducto;
