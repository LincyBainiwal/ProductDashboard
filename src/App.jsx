import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import { Button } from "./components/ui/button";
import { Menu } from "lucide-react";

const queryClient = new QueryClient();

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex h-screen overflow-hidden">
          <div
            className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity lg:hidden ${
              sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div
            className={`fixed top-0 left-0 z-50 h-screen w-64 bg-gray-900 text-black transform transition-transform duration-300 lg:translate-x-0 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar />
          </div>

          <div className="flex-1 flex flex-col lg:ml-64">
            <div className="lg:hidden p-4 bg-gray-100 border-b flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setSidebarOpen(true)}
                className="p-2"
              >
                <Menu className="w-6 h-6" />
              </Button>
              <h1 className="font-bold text-lg">Dashboard</h1>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
