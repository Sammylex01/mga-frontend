import { useMemo, useState } from "react";
import { Plus, Search, Trash2, X } from "lucide-react";
import { useQuery } from "react-query";
import { getAllAdmins } from "../../services/queries";
import { TUser } from "../../lib/types";



const AdminStafs = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["admins"],
    queryFn: getAllAdmins,
  });

  const admins: TUser[] = data?.users ?? [];

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredAdmins = useMemo(() => {
    return admins.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

      const matchesSearch =
        fullName.includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === "all" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [admins, searchTerm, roleFilter, statusFilter]);

  const formatDateTime = (date: string | null | undefined) =>
    date
      ? new Date(date).toLocaleString("en-NG", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      : "Never";

  const formatRoleLabel = (role: string) =>
    role
      .split("_")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");

  /* ---------------- RENDER ---------------- */
  if (isLoading) {
    return <p className="text-center py-10">Loading admins…</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Users</h1>
        <button
          className="btn-primary flex items-center"
          onClick={() => setIsAddUserModalOpen(true)}
        >
          <Plus size={16} className="mr-1" /> Add New User
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex flex-wrap gap-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            className="form-input pl-9"
            placeholder="Search name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="form-select"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="super_admin">Super Admin</option>
          <option value="operations_manager">Operations Manager</option>
          <option value="booking_agent">Booking Agent</option>
          <option value="fleet_manager">Fleet Manager</option>
        </select>

        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-900">Admin Details</th>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-900">Role</th>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-900">Status</th>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-900">Date Created</th>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {filteredAdmins.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                {/* 1. Name & Email */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                  </div>
                </td>

                {/* 2. Role */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {formatRoleLabel(user.role)}
                  </span>
                </td>

                {/* 3. Status */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${user.status === "active"
                      ? "bg-green-50 text-green-700 ring-green-600/20"
                      : "bg-red-50 text-red-700 ring-red-600/20"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* 4. Date */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDateTime(user.createdAt)}
                </td>

                {/* 5. Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button
                      className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                      title="Delete Admin"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredAdmins.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <p className="mt-2 text-sm">No admin users found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Admin Modal (keep yours, hook to API later) */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Add Admin</h2>
              <button onClick={() => setIsAddUserModalOpen(false)}>
                <X />
              </button>
            </div>
            {/* Form goes here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStafs;
