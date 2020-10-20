import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Head >
        <title>Admin MTP </title>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      {
        router.pathname === "/login" || router.pathname === "/nuevacuenta" ? (
          <div className="bg-teal-500 min-h-screen flex flex-col justify-center">
            <div> {children} </div>
          </div>
        ) : (
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 w-full max-w-4xl p-4 mx-auto md:px-8 md:py-16">
                {children}
              </main>
              <Footer />
            </div>
          )
      }
    </>
  )

}

export default Layout;
