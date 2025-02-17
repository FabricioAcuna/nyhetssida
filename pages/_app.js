import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SavedArticlesProvider } from "@/context/SavedArticlesContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <SavedArticlesProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </SavedArticlesProvider>
    </div>
  );
}


