import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";
import PedidoState from "../context/pedidos/PedidoState";
import "../static/nprogress.css";
import "../css/index.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <PedidoState>
        <Component {...pageProps} />
      </PedidoState>
    </ApolloProvider>
  );
}

export default MyApp;
