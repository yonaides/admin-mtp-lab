import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Layout from "../../components/Layout";

const OBTENER_PRODUCTO = gql`
  query obtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
      id
      nombre
      existencia
      precio
      creado
    }
  }
`;

const ACTUALIZAR_PRODUCTO = gql`
  mutation actualizarProducto($id: ID!, $input: ProductoInput) {
    actualizarProducto(id: $id, input: $input) {
      id
      nombre
      existencia
      precio
    }
  }
`;

const EditarProducto = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
    variables: { id },
  });

  const [
    actualizarProducto,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(ACTUALIZAR_PRODUCTO);

  const schemaValidation = Yup.object({
    nombre: Yup.string().required("El nombre del producto es obligatorio"),
    existencia: Yup.number()
      .required("la existencia es obligatoria")
      .positive("Solo numeros positivos")
      .integer("la existencia debe ser positivo"),
    precio: Yup.number()
      .required("La empresa es obligatoria")
      .positive("Solo numeros positivos"),
  });

  if (loading) {
    return "Buscando datos...";
  }
  const { obtenerProducto } = data;

  const actualizarDatosProducto = async (valores) => {
    const { nombre, existencia, precio } = valores;

    try {
      const { data } = await actualizarProducto({
        variables: {
          id,
          input: {
            nombre,
            existencia,
            precio,
          },
        },
      });

      Swal.fire({
        icon: "success",
        title: "Producto actualizado",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/productos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-ligth">Editando Producto </h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidation}
            enableReinitialize
            initialValues={obtenerProducto}
            onSubmit={(valores) => {
              actualizarDatosProducto(valores);
            }}
          >
            {(props) => {
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
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
                      placeholder="Nombre Producto"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.nombre}
                    />
                    {props.touched.nombre && props.errors.nombre ? (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold"> Error </p>
                        <p>{props.errors.nombre} </p>
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="existencia"
                    >
                      Existenca
                    </label>
                    <input
                      type="number"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline focus:shadow-outline"
                      id="existencia"
                      placeholder="Existencia"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.existencia}
                    />
                  </div>
                  {props.touched.existencia && props.errors.existencia ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold"> Error </p>
                      <p>{props.errors.existencia} </p>
                    </div>
                  ) : null}
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
                      placeholder="precio"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.precio}
                    />
                  </div>
                  {props.touched.precio && props.errors.precio ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold"> Error </p>
                      <p>{props.errors.precio} </p>
                    </div>
                  ) : null}

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                    value="Actualizar"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditarProducto;
