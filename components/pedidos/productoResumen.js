import React, { useContext, useState, useEffect } from "react";
import PedidoContext from "../../context/pedidos/PedidoContext";

const ProductoResumen = ({ producto }) => {
  const { nombre, precio } = producto;
  const [cantidad, setCantidad] = useState(0);
  const pedidoContext = useContext(PedidoContext);
  const { cantidadProductos, actualizarTotal } = pedidoContext;

  useEffect(() => {
    actualizarCantidad();
    actualizarTotal();
  }, [cantidad]);

  const actualizarCantidad = () => {
    const nuevoProducto = { ...producto, cantidad: Number(cantidad) };
    cantidadProductos(nuevoProducto);
  };

  return (
    <tr>
      <td className="border px-4 py-2">{nombre}</td>
      <td className="border px-4 py-2">{precio}</td>
      <td className="border">
        <input
          type="number"
          placeholder="cantidad"
          className="shadow apperance-none border rounded text-gray-700 leading-tight focus:online-none focus:shadow-outline md:ml-2"
          onChange={(e) => setCantidad(e.target.value)}
          value={cantidad}
        />
      </td>
    </tr>
  );
};

export default ProductoResumen;
