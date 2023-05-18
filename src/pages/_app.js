/* eslint-disable @next/next/no-sync-scripts */
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <script
          id="cookieyes"
          type="text/javascript"
          src="https://cdn-cookieyes.com/client_data/3a0b16ab6c347a640f2bc380/script.js"
        ></script>
        <title>Newsy – Your News Now!</title>
        <meta
          name="description"
          content="Newsy: Discover a new world of insights. Breaking down the barriers of conventional news platforms, Newsy brings you the freshest updates from across the globe. 'Your News Now!' isn't just our tagline - it's our promise."
        />
        <meta property="og:title" content="Newsy – Your News Now!" />
        <meta property="og:url" content="https://newsy-app.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Newsy – Your News Now!" />
        <meta
          property="og:description"
          content="Newsy: Discover a new world of insights. Breaking down the barriers of conventional news platforms, Newsy brings you the freshest updates from across the globe. 'Your News Now!' isn't just our tagline - it's our promise."
        />
        <meta
          property="og:image"
          content="https://newsy-app.vercel.app/images/newsy-wide.webp"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="newsy-app.vercel.app" />
        <meta property="twitter:url" content="https://newsy-app.vercel.app" />
        <meta name="twitter:title" content="Newsy – Your News Now!" />
        <meta
          name="twitter:description"
          content="Newsy: Discover a new world of insights. Breaking down the barriers of conventional news platforms, Newsy brings you the freshest updates from across the globe. 'Your News Now!' isn't just our tagline - it's our promise."
        />
        <meta
          name="twitter:image"
          content="https://newsy-app.vercel.app/images/newsy-wide.webp"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
