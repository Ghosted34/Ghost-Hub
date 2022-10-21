import React from "react";
import { Layout } from "../components";
import { CartProvider } from "../context/StateContext";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
