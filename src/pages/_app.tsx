import AppProvider from "@/hooks";
import { ProtectRoute } from "@/hooks/auth";
import { AnimatePresence } from "framer-motion";
import { SkeletonTheme } from "react-loading-skeleton";
import GlobalStyle from "../styles/GlobalStyle";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
    <GlobalStyle />
      <ProtectRoute>
        <SkeletonTheme color="#0A0A0B" highlightColor="#181A1B">
          <AnimatePresence>
            <Component {...pageProps} />
          </AnimatePresence>
        </SkeletonTheme>
      </ProtectRoute>
    </AppProvider>
  );
}