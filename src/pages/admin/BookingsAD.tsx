import { useState, useEffect } from "react";
import {
    Calendar,
    Clock,
    Filter,
    Search
} from "lucide-react";
import { getAllBookings } from "../../services/queries";
import { useQuery } from "react-query";
import { TBooking } from "../../lib/types";
import { BookingDetailsModal } from "./components/bookingModal";


const BookingsAD = () => {
    const { data: bookings, refetch: refetchBookings } = useQuery({
        queryKey: ["bookings"],
        queryFn: () => getAllBookings(),
    });

    console.log(refetchBookings)


    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<
        "all" | "scheduled" | "in_progress" | "completed" | "cancelled" | "fulfilled"
    >("all");
    // const [dateFilter, setDateFilter] = useState("");
    const [filteredBookings, setFilteredBookings] = useState<TBooking[] | undefined>();
    const [selectedBooking, setSelectedBooking] = useState<TBooking | null>(null);
    const [isViewBookingModalOpen, setIsViewBookingModalOpen] = useState(false);


    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatTripDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-NG", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case "scheduled":
                return "bg-blue-100 text-blue-800";
            case "in_progress":
                return "bg-yellow-100 text-yellow-800";
            case "completed":
                return "bg-green-100 text-green-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formatStatusLabel = (status: string) => {
        return status.replace("_", " ");
    };

    useEffect(() => {
        if (!bookings) return;
        const filteredBookings = bookings?.bookings.filter((booking) => {
            const matchesSearch =
                booking._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.passengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.email.toLowerCase().includes(searchTerm.toLowerCase())
            booking.travelingFrom.toLowerCase().includes(searchTerm.toLowerCase());

            // const matchesStatus =
            //     statusFilter === "all" || booking.status === statusFilter;

            // const matchesDate =
            //     !dateFilter ||
            //     new Date(booking.travelDate).toISOString().split("T")[0] === dateFilter;

            return matchesSearch;
        });

        setFilteredBookings(filteredBookings);

    }, [searchTerm, bookings])


    useEffect(() => {
        if (!bookings) return;
        const filteredBookings = bookings?.bookings.filter((booking) => {


            const matchesStatus =
                statusFilter === "all" || booking.status === statusFilter;



            return matchesStatus;
        });

        setFilteredBookings(filteredBookings);

    }, [statusFilter, bookings])




    return (
        <div>


            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justif
        y-between gap-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="form-input pl-10 py-2 w-full md:w-64 text-sm"
                            placeholder="Search booking"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap gap-3">


                        <div className="flex items-center">
                            <Filter size={16} className="text-gray-500 mr-2" />
                            <select
                                className="form-select py-2 text-sm"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as any)}
                            >
                                <option value="all">All Status</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="in_progress">In Progress</option>
                                <option value="fulfilled">Fulfilled</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">

                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Passenger
                                </th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Passenger Phone
                                </th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Passenger Email
                                </th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Travel Date
                                </th>
                                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount Paid
                                </th>
                                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Other Travelers
                                </th>
                                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredBookings?.map((booking) => {
                                return (
                                    <tr key={booking._id} className="hover:bg-gray-50">

                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {booking.passengerName}
                                                </span>
                                                {/* <span className="text-sm text-gray-500">
                          {formatDuration(trip.duration)}
                        </span> */}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {booking.phoneNumber}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {booking.email}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <div className="flex items-center">
                                                    <Calendar size={14} className="text-gray-400 mr-1" />
                                                    <span>{formatTripDate(booking.travelDate)}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                                    <Clock size={14} className="text-gray-400 mr-1" />
                                                    <span>{(booking.travelTime)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <div className="flex items-center">
                                                    {/* <Bus size={14} className="text-gray-400 mr-1" /> */}
                                                    <span>{formatCurrency(booking.amountPaid)}</span>
                                                </div>
                                                <span className="text-sm text-gray-500 mt-1">
                                                    {booking.seatNumbers.length} seat(s)
                                                </span>
                                            </div>
                                        </td>
                                        {/* <td className="py-4 px-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <div className="flex items-center">
                                                    <span>{booking.additionalPassengerNames?.join(", ")}</span>
                                                </div>
                                                <span className="text-sm text-gray-500 mt-1">
                                                    {booking.seatNumbers?.join(", ")}
                                                </span>
                                            </div>
                                        </td> */}

                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <div className="flex items-center">
                                                    <span>{booking.additionalPassengerNames?.join(", ")}</span>
                                                </div>
                                                <span className="text-sm text-gray-500 mt-1">
                                                    {booking.seatNumbers?.join(", ")}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeClass(
                                                    booking.status
                                                )}`}
                                            >
                                                {formatStatusLabel(booking.status)}
                                            </span>
                                        </td>

                                        <td className="py-4 px-4 whitespace-nowrap text-center">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    className="text-primary hover:text-primary-dark"
                                                    onClick={() => {
                                                        setIsViewBookingModalOpen(true);
                                                        setSelectedBooking(booking)

                                                    }}
                                                >
                                                    View
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}

                            {filteredBookings?.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-gray-500">
                                        No bookings found matching your criteria
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


            {/* Edit Booking Modal */}
            <BookingDetailsModal
                booking={selectedBooking}
                isOpen={isViewBookingModalOpen}
                onClose={() => {
                    setIsViewBookingModalOpen(false);
                    setSelectedBooking(null);
                }}
            />




        </div>
    );
};

export default BookingsAD;
