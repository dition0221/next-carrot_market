import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
// CSS
import "@/styles/globals.css";
// FONTS
import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: async (url: string) => await (await fetch(url)).json(),
      }}
    >
      <div className={`w-full max-w-lg mx-auto ${notoSansKr.className}`}>
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
