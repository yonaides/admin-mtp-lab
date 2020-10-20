import React, { useEffect, useReducer, useContext, useState } from "react";
import PedidoContext from "../../context/pedidos/PedidoContext";
import ProductoResumen from "./productoResumen";

const ResumenPedido = () => {
  const pedidoContext = useContext(PedidoContext);
  const { productos } = pedidoContext;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-m font-bold">
        Ajustar cantidades del producto
      </p>

      {productos.length > 0 ? (
        <>
          <table className=" table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Precio</th>
                <th className="py-2">Cantidad </th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <ProductoResumen key={producto.id} producto={producto} />
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <p className="mt-5 text-sm"> No Hay Productos </p>
        </>
      )}
    </>
  );
};

export default ResumenPedido;
