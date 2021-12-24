import Head from "next/head";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tacvue - MultiVerse Portal</title>
        <link rel="icon" type="image/png" href="/images/Logo.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Rubik:300,400,500,700"
          rel="stylesheet"
        ></link>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
