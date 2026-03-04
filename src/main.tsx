import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { StrictMode } from "react";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <App />
                <Toaster richColors position="top-right" closeButton={true} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>
);
