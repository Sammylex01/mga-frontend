import { useState } from 'react';
import { Bell, ChevronDown, LogOut, Menu, Search, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center md:w-64">
          <button
            className="md:hidden text-gray-500 p-1 rounded-md hover:bg-gray-100 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>

          <div className="ml-3 md:ml-0 relative w-full max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="form-input pl-10 py-2 w-full text-sm"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none"
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileMenuOpen(false);
              }}
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">3</span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="text-sm font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium">New booking received</p>
                    <p className="text-xs text-gray-500 mt-1">10 minutes ago</p>
                  </div>
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium">Trip PH-ABA-0-1 is departing soon</p>
                    <p className="text-xs text-gray-500 mt-1">30 minutes ago</p>
                  </div>
                  <div className="p-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium">New driver application received</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="p-2 border-t border-gray-200 text-center">
                  <button className="text-primary text-sm hover:underline">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
              onClick={() => {
                setIsProfileMenuOpen(!isProfileMenuOpen);
                setIsNotificationsOpen(false);
              }}
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
              <span className="hidden md:inline-block text-sm font-medium">Admin User</span>
              <ChevronDown size={16} className={`transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="p-3 border-b border-gray-200">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">admin@bigben.com</p>
                </div>
                <div className="py-1">
                  <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <User size={16} className="mr-2" />
                    Profile
                  </button>
                  <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings size={16} className="mr-2" />
                    Settings
                  </button>
                </div>
                <div className="py-1 border-t border-gray-200">
                  <button
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu - shown when menu button is clicked */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary text-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/admin/dashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-dark">Dashboard</a>
            <a href="/admin/vehicles" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-dark">Vehicles</a>
            <a href="/admin/drivers" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-dark">Drivers</a>
            <a href="/admin/trips" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-dark">Trips</a>
            <a href="/admin/bookings" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-dark">Bookings</a>
            <a href="/admin/staffs" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-dark">Staffs</a>
            <a href="/admin/users" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-dark">Users</a>
            <a href="/admin/roles" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-dark">Roles</a>
            <a href="/admin/reports" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-dark">Reports</a>
            <a href="/admin/settings" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-dark">Settings</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
