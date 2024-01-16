import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import axios from "axios";
import { url } from "./utils/general";
import { QueryClient, QueryClientProvider } from "react-query";
import Routes from "./routes";
import { useTheme } from "./hooks/useTheme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    axios.defaults.baseURL = url;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <main className={`App theme-${theme}`}>
            <Routes />
          </main>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
