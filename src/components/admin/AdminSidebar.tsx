import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Bus,
  Calendar,
  ChevronDown,
  House,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  Ticket,
  User,
  UserCog,
  Users,
} from "lucide-react";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  to,
  icon,
  label,
  active,
}) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-3 text-sm ${
        active
          ? "text-white bg-primary/20 border-l-4 border-secondary"
          : "text-gray-300 hover:bg-primary/10 hover:text-white"
      }`}
    >
      <span className="inline-flex items-center justify-center w-6 h-6 mr-3">
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
};

interface SidebarGroupProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const SidebarGroup: React.FC<SidebarGroupProps> = ({
  icon,
  label,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-1">
      <button
        className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-primary/10 hover:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="inline-flex items-center justify-center w-6 h-6 mr-3">
          {icon}
        </span>
        <span>{label}</span>
        <ChevronDown
          size={16}
          className={`ml-auto transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="pl-4 border-l border-primary/10 ml-4">{children}</div>
      )}
    </div>
  );
};

const AdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="hidden md:flex md:flex-col w-64 bg-primary overflow-y-auto">
      <div className="p-4 border-b border-primary-dark">
        <Link to="/admin/dashboard" className="flex items-center">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-2">
            <span className="text-primary font-bold text-sm">BB</span>
          </div>
          <span className="text-white font-bold text-lg">Admin Portal</span>
        </Link>
      </div>

      <div className="flex-1 py-2">
        <SidebarLink
          to="/admin/dashboard"
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          active={currentPath === "/admin/dashboard"}
        />

        <SidebarGroup
          icon={<Bus size={18} />}
          label="Fleet Management"
          defaultOpen={
            currentPath.includes("/admin/vehicles") ||
            currentPath.includes("/admin/drivers")
          }
        >
          <SidebarLink
            to="/admin/vehicles"
            icon={<Bus size={16} />}
            label="Vehicles"
            active={currentPath.includes("/admin/vehicles")}
          />
          <SidebarLink
            to="/admin/drivers"
            icon={<User size={16} />}
            label="Drivers"
            active={currentPath.includes("/admin/drivers")}
          />
        </SidebarGroup>

        <SidebarGroup
          icon={<Calendar size={18} />}
          label="Trip Management"
          defaultOpen={
            currentPath.includes("/admin/trips") ||
            currentPath.includes("/admin/routes")
          }
        >
          <SidebarLink
            to="/admin/trips"
            icon={<Calendar size={16} />}
            label="Trips"
            active={currentPath.includes("/admin/trips")}
          />
          <SidebarLink
            to="/admin/routes"
            icon={<House size={16} />}
            label="Routes"
            active={currentPath.includes("/admin/routes")}
          />
        </SidebarGroup>

        <SidebarLink
          to="/admin/bookings"
          icon={<Ticket size={18} />}
          label="Bookings"
          active={currentPath.includes("/admin/bookings")}
        />

        <SidebarGroup
          icon={<UserCog size={18} />}
          label="User Management"
          defaultOpen={
            currentPath.includes("/admin/users") ||
            currentPath.includes("/admin/roles")
          }
        >
          <SidebarLink
            to="/admin/users"
            icon={<Users size={16} />}
            label="Admin Users"
            active={currentPath.includes("/admin/users")}
          />
          <SidebarLink
            to="/admin/roles"
            icon={<UserCog size={16} />}
            label="Roles & Permissions"
            active={currentPath.includes("/admin/roles")}
          />
        </SidebarGroup>

        <SidebarLink
          to="/admin/reports"
          icon={<BarChart3 size={18} />}
          label="Reports"
          active={currentPath.includes("/admin/reports")}
        />

        <div className="mt-6 border-t border-primary-dark pt-6">
          <SidebarLink
            to="/admin/settings"
            icon={<Settings size={18} />}
            label="Settings"
            active={currentPath.includes("/admin/settings")}
          />
          <SidebarLink
            to="/admin/help"
            icon={<LifeBuoy size={18} />}
            label="Help & Support"
            active={currentPath.includes("/admin/help")}
          />
        </div>
      </div>

      <div className="p-4 border-t border-primary-dark">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={16} className="text-gray-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-gray-300">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
