import AppProvider from "@/hooks";
import { ProtectRoute } from "@/hooks/auth";
import { SkeletonTheme } from "react-loading-skeleton";
import GlobalStyle from "../styles/GlobalStyle";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
    <GlobalStyle />
      <ProtectRoute>
        <SkeletonTheme color="#0A0A0B" highlightColor="#181A1B">
          <Component {...pageProps} />
        </SkeletonTheme>
      </ProtectRoute>
    </AppProvider>
  );
}