// import { useState, useEffect } from "react";
// import { getAllDrivers } from "../../services/queries";
// import { addDriverPayload, TDriver } from "../../lib/types";
// import { addDriver } from "../../services/mutations";
// import { useMutation, useQuery } from "react-query";
// import { Filter, MapPin, Phone, Plus, Search, X, Trash2 } from "lucide-react";
// import { toast } from "sonner";

// interface Driver {
//   id: string;
//   name: string;
//   licenseNumber: string;
//   phone: string;
//   address: string;
//   createdAt: string;
//   assignedVehicleId: string | null;
//   age: number;
//   state: string;
//   status: string | "Assigned" | "Un-Assigned" | "On-Leave" | "Deleted";
// }

// const Drivers = () => {
//   const { data: drivers, refetch: refetchDrivers } = useQuery({
//     queryKey: ["drivers"],
//     queryFn: getAllDrivers,
//   });

//   const { mutate: addDriverMutation } = useMutation({
//     mutationFn: (details: addDriverPayload) => addDriver(details),
//     onSuccess: () => {
//       refetchDrivers();
//       toast.success("Driver added successfully");
//     },
//     onError: (error: any) => {
//       toast.error(
//         error?.response?.data?.message || "An unexpected error occurred"
//       );
//     },
//   });


//   const [isAddDriverModalOpen, setIsAddDriverModalOpen] = useState(false);
//   const [isViewDriverModalOpen, setIsViewDriverModalOpen] = useState(false);
//   const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
//   const [newDriver, setNewDriver] = useState<
//     Omit<Driver, "id" | "createdAt" | "assignedVehicleId">
//   >({
//     name: "",
//     phone: "",
//     licenseNumber: "",
//     age: 0,
//     state: "",
//     address: "",
//     status: "Un-Assigned"
//   });

//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [filteredDrivers, setFilteredDrivers] = useState<TDriver[] | undefined>();


//   useEffect(() => {
//     if (!drivers?.drivers) return;

//     const filtered = drivers.drivers.filter((driver) => {
//       const matchesSearch =
//         driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         driver.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
//       return matchesSearch;
//     });

//     setFilteredDrivers(filtered);
//   }, [drivers, searchTerm]);

//   const handleAddDriver = async () => {
//     setIsSubmitting(true);

//     addDriverMutation({
//       name: newDriver.name,
//       phoneNumber: newDriver.phone,
//       licenseNumber: newDriver.licenseNumber,
//       age: newDriver.age,
//       state: newDriver.state,
//       address: newDriver.address
//     });
//   };



//   const handleStatusChange = (status: string) => {
//     if (!drivers?.drivers) return;

//     if (status === "All") {
//       setFilteredDrivers(drivers.drivers);
//     } else {
//       const filteredByStatus = drivers.drivers.filter(
//         (driver) => driver.status === status
//       );
//       setFilteredDrivers(filteredByStatus);
//     }
//   };


//   const handleDeleteDriver = (driverId: string) => {
//     if (window.confirm("Are you sure you want to delete this driver?")) {
//       console.log(`${driverId}`);
//     }
//   };

//   const getStatusBadgeClass = (status: string) => {
//     switch (status) {
//       case "available":
//         return "bg-green-100 text-green-800";
//       case "assigned":
//         return "bg-blue-100 text-blue-800";
//       case "on_leave":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const formatStatusLabel = (status: string) => {
//     return status.replace("_", " ");
//   };

//   return (
//     <div>
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
//           Drivers
//         </h1>
//         <button
//           className="btn-primary flex items-center"
//           onClick={() => setIsAddDriverModalOpen(true)}
//         >
//           <Plus size={16} className="mr-1" />
//           Add New Driver
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between">
//           <div className="flex mb-4 md:mb-0">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search size={16} className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 className="form-input pl-10 py-2 w-full md:w-80 text-sm"
//                 placeholder="Search drivers by name, license or phone"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex items-center">
//             <Filter size={16} className="text-gray-500 mr-2" />
//             <select
//               className="form-select py-2 text-sm"
//               value={statusFilter}
//               onChange={(e) => {
//                 setStatusFilter(e.target.value as any)
//                 handleStatusChange(e.target.value);
//               }}
//             >
//               <option value="All">All</option>
//               <option value="Assigned">Assigned</option>
//               <option value="Un-Assigned">Un-Assigned</option>
//               <option value="On-Leave">On-Leave</option>
//               <option value="Deleted">Deleted</option>
//             </select>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-50">
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   License
//                 </th>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Contact
//                 </th>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date Joined
//                 </th>
//                 <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredDrivers?.map((driver) => (
//                 <tr key={driver._id} className="hover:bg-gray-50">
//                   <td className="py-4 px-4 whitespace-nowrap">
//                     <button
//                       className="font-medium text-primary hover:underline text-left"
//                       onClick={() => {
//                         setSelectedDriver(driver as any);
//                         setIsViewDriverModalOpen(true);
//                       }}
//                     >
//                       {driver.name}
//                     </button>
//                   </td>
//                   <td className="py-4 px-4 whitespace-nowrap">
//                     {driver.licenseNumber}
//                   </td>
//                   <td className="py-4 px-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <Phone size={14} className="text-gray-400 mr-1" />
//                       {driver.phoneNumber}
//                     </div>
//                   </td>
//                   <td className="py-4 px-4 whitespace-nowrap">
//                     <div className="flex">
//                       <span
//                         className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeClass(
//                           driver.status
//                         )}`}
//                       >
//                         {formatStatusLabel(driver.status)}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="py-4 px-4 whitespace-nowrap">
//                     {new Date(driver.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="py-4 px-4 whitespace-nowrap text-center">
//                     <div className="flex justify-center space-x-2">
//                       <button
//                         className="text-red-500 hover:text-red-700"
//                         onClick={() => handleDeleteDriver(driver._id)}
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}

//               {filteredDrivers?.length === 0 && (
//                 <tr>
//                   <td colSpan={6} className="py-8 text-center text-gray-500">
//                     No drivers found matching your criteria
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Add Driver Modal */}
//       {isAddDriverModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Add New Driver</h2>
//               <button
//                 className="text-gray-400 hover:text-gray-600"
//                 onClick={() => setIsAddDriverModalOpen(false)}
//                 disabled={isSubmitting}
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleAddDriver();
//               }}
//             >
//               <div className="mb-4">
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   className="form-input w-full"
//                   placeholder="e.g. John Doe"
//                   value={newDriver.name}
//                   onChange={(e) =>
//                     setNewDriver({ ...newDriver, name: e.target.value })
//                   }
//                   disabled={isSubmitting}
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="licenseNumber"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Driver's License Number
//                 </label>
//                 <input
//                   type="text"
//                   id="licenseNumber"
//                   className="form-input w-full"
//                   placeholder="e.g. DL12345678"
//                   value={newDriver.licenseNumber}
//                   onChange={(e) =>
//                     setNewDriver({
//                       ...newDriver,
//                       licenseNumber: e.target.value,
//                     })
//                   }
//                   disabled={isSubmitting}
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="phone"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   className="form-input w-full"
//                   placeholder="e.g. +234 801 234 5678"
//                   value={newDriver.phone}
//                   onChange={(e) =>
//                     setNewDriver({ ...newDriver, phone: e.target.value })
//                   }
//                   disabled={isSubmitting}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="age"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Age
//                 </label>
//                 <input
//                   type="number"
//                   id="age"
//                   className="form-input w-full"
//                   placeholder="e.g. 20"
//                   value={newDriver.age}
//                   onChange={(e) =>
//                     setNewDriver({ ...newDriver, age: Number(e.target.value) })
//                   }
//                   disabled={isSubmitting}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="state"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   State
//                 </label>
//                 <input
//                   type="text"
//                   id="state"
//                   className="form-input w-full"
//                   placeholder="e.g. Rivers"
//                   value={newDriver.state}
//                   onChange={(e) =>
//                     setNewDriver({ ...newDriver, state: e.target.value })
//                   }
//                   disabled={isSubmitting}
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="address"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Address
//                 </label>
//                 <textarea
//                   id="address"
//                   className="form-textarea w-full"
//                   rows={3}
//                   placeholder="Enter driver's address"
//                   value={newDriver.address}
//                   onChange={(e) =>
//                     setNewDriver({ ...newDriver, address: e.target.value })
//                   }
//                   disabled={isSubmitting}
//                   required
//                 ></textarea>
//               </div>

//               {/* <div className="mb-4">
//                 <label
//                   htmlFor="status"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Status
//                 </label>
//                 <select
//                   id="status"
//                   className="form-select w-full"
//                   value={newDriver.status}
//                   onChange={(e) =>
//                     setNewDriver({
//                       ...newDriver,
//                       status: e.target.value as
//                         | "available"
//                         | "assigned"
//                         | "on_leave",
//                     })
//                   }
//                   disabled={isSubmitting}
//                   required
//                 >
//                   <option value="available">Available</option>
//                   <option value="assigned">Assigned</option>
//                   <option value="on_leave">On Leave</option>
//                 </select>
//               </div> */}

//               <div className="flex justify-end space-x-3 mt-6">
//                 <button
//                   type="button"
//                   className="btn-outline"
//                   onClick={() => setIsAddDriverModalOpen(false)}
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn-primary"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Adding Driver..." : "Add Driver"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* View Driver Modal */}
//       {isViewDriverModalOpen && selectedDriver && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Driver Details</h2>
//               <button
//                 className="text-gray-400 hover:text-gray-600"
//                 onClick={() => setIsViewDriverModalOpen(false)}
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="border-b border-gray-200 pb-4 mb-4">
//               <div className="flex items-center">
//                 <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
//                   <span className="text-xl font-bold text-primary">
//                     {selectedDriver.name.charAt(0)}
//                   </span>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-medium">{selectedDriver.name}</h3>
//                   <span
//                     className={`inline-flex rounded-full px-2 text-xs font-semibold ${getStatusBadgeClass(
//                       selectedDriver.status
//                     )}`}
//                   >
//                     {formatStatusLabel(selectedDriver.status)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <p className="text-sm text-gray-500">License Number</p>
//                 <p className="font-medium">{selectedDriver.licenseNumber}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">State</p>
//                 <p className="font-medium flex items-center">

//                   {selectedDriver.state}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">Address</p>
//                 <p className="font-medium flex items-start">
//                   <MapPin size={14} className="text-gray-400 mr-1 mt-1" />
//                   {selectedDriver.address}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">Date Joined</p>
//                 <p className="font-medium">
//                   {new Date(selectedDriver.createdAt).toLocaleDateString()}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">Assigned Vehicle</p>
//                 <p className="font-medium">
//                   {selectedDriver.assignedVehicleId
//                     ? `Vehicle ID: ${selectedDriver.assignedVehicleId}`
//                     : "Not assigned to any vehicle"}
//                 </p>
//               </div>
//             </div>

//             <div className="flex justify-end mt-6">
//               <button
//                 type="button"
//                 className="btn-outline"
//                 onClick={() => setIsViewDriverModalOpen(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Drivers;
