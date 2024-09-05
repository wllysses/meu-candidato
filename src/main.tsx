import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Home from "./pages/home";
import JuripirangaPage from "./pages/juripiranga";
import "./index.css";
import ItambePage from "./pages/itambe";
import CandidatePage from "./pages/candidate";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/itambe" element={<ItambePage />} />
          <Route path="/juripiranga" element={<JuripirangaPage />} />
          <Route
            path="/candidato/:codigoMunicipio/:candidatoId"
            element={<CandidatePage />}
          />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
