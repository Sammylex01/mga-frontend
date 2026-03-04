import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem("adminAuth");
    if (authData) {
      const { isAuthenticated: authStatus } = JSON.parse(authData);
      setIsAuthenticated(authStatus);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-light">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-bg-light">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
