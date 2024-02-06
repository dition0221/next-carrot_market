import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
// CSS
import "@/styles/globals.css";
// LIBS
import useUser from "@/libs/client/useUser";

// *Temporary
// ! Issue: 로그인 후 router.push()가 작동하지 않음
// ? 추후 middleware를 사용해야하나?
function LoginCheck() {
  useUser();
  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: async (url: string) => await (await fetch(url)).json(),
      }}
    >
      <div className="w-full max-w-lg mx-auto">
        <Component {...pageProps} />
        <LoginCheck />
      </div>
    </SWRConfig>
  );
}
