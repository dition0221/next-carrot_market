import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="/manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {/* Link Preview */}
        <meta
          property="description"
          content="Serverless 'Carrot-Market' clone coding using NextJS, Tailwind, Prisma, PlanetScale, Cloudflare. by dition0221."
        />
        <meta property="og:title" content="dition0221's Carrot-Market" />
        <meta
          property="og:description"
          content="Serverless 'Carrot-Market' clone coding using NextJS, Tailwind, Prisma, PlanetScale, Cloudflare. by dition0221."
        />
        <meta
          property="og:image"
          content="https://dition0221-next-carrot-market.vercel.app/thumbnail.png"
        />
        <meta
          property="og:url"
          content="https://dition0221-next-carrot-market.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <meta property="twitter:title" content="dition0221's Carrot-Market" />
        <meta
          property="twitter:description"
          content="Serverless 'Carrot-Market' clone coding using NextJS, Tailwind, Prisma, PlanetScale, Cloudflare. by dition0221."
        />
        <meta
          property="twitter:image"
          content="https://dition0221-next-carrot-market.vercel.app/thumbnail.png"
        />
        <meta
          property="twitter:card"
          content="https://dition0221-next-carrot-market.vercel.app/thumbnail.png"
        />
        <meta
          property="twitter:url"
          content="https://dition0221-next-carrot-market.vercel.app/"
        />
        <meta property="twitter:type" content="website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
