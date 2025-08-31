import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState({
    name: "Lincy Bainiwal",
    email: "lincy.bainiwal@example.com",
    role: "Administrator",
  });

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
