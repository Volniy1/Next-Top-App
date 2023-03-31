import "@/styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

export default function MyApp({
  Component,
  pageProps,
  router,
}: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Next-Top-app</title>
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
        />
        <meta property="og:locale" content="ru_RU" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
