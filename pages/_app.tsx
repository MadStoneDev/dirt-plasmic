import "../components/plasmic/dirt/plasmic.css"; // plasmic-import: 8kaaMUEQHxomwqwuKNMozy/projectcss
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import { Inter } from "next/font/google";
import { OpenPanelComponent } from "@openpanel/nextjs";
import "../styles/globals.css";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const OP_CLIENT_ID = process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID;
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (!GA_ID) return;
    const handleRouteChange = (url: string) => {
      window.gtag?.("event", "page_view", {
        page_path: url
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      {/* Skip link (WCAG 2.4.1). First focusable element on every page;
          visually hidden until focused, then jumps past the nav to
          #main-content (rendered by DirtNav, and the <main> on privacy/terms). */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-dirt-pop focus:text-dirt-deep focus:font-display focus:font-bold focus:uppercase focus:no-underline focus:outline-none focus:ring-2 focus:ring-dirt-deep"
      >
        Skip to main content
      </a>
      {OP_CLIENT_ID && (
        <OpenPanelComponent
          clientId={OP_CLIENT_ID}
          scriptUrl="/api/op/vendor.js"
          apiUrl="/api/op"
          trackScreenViews
          trackOutgoingLinks
          trackAttributes
        />
      )}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
      <div className={inter.variable}>
        <Component {...pageProps} />
      </div>
      {/*
        Standardise the Twitter card to the large-image format across every
        page. Plasmic's generated page <Head> hardcodes `summary` and its
        Studio UI exposes no control for it. This <Head> renders after the page
        component, so it wins next/head's last-one-wins dedup for the un-keyed
        name="twitter:card" tag — making the large card apply everywhere,
        sync-proof.
      */}
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    </>
  );
}
