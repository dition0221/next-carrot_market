import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
// CSS
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: async (url: string) => await (await fetch(url)).json(),
      }}
    >
      <div className="w-full max-w-lg mx-auto">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
