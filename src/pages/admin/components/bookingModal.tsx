
import { TBooking } from "../../../lib/types";

const Detail = ({ label, value }: { label: string; value: any }) => (
    <div>
        <p className="text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
    </div>
);

const formatTripDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-NG", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

type BookingModalProps = {
    booking: TBooking | null;
    isOpen: boolean;
    onClose: () => void;
};

export const BookingDetailsModal = ({
    booking,
    isOpen,
    onClose,
}: BookingModalProps) => {
    if (!isOpen || !booking) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            {/* Modal container */}
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[85vh] flex flex-col relative">

                {/* Header (fixed) */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold">Booking Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 text-lg"
                    >
                        ✕
                    </button>
                </div>

                {/* Scrollable content */}
                <div className="p-6 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <Detail label="Passenger Name" value={booking.passengerName} />
                        <Detail label="Next of Kin" value={booking.nextOfKin} />
                        <Detail label="Email" value={booking.email} />
                        <Detail label="Phone" value={booking.phoneNumber} />
                        <Detail label="From" value={booking.travelingFrom} />
                        <Detail label="To" value={booking.destination} />
                        <Detail label="Travel Date" value={formatTripDate(booking.travelDate)} />
                        <Detail label="Travel Time" value={booking.travelTime} />
                        <Detail label="Return Date" value={formatTripDate(booking.returnDate) || "N/A"} />
                        <Detail label="Booking Code" value={booking.bookingCode} />
                        <Detail label="Amount Paid" value={`₦${booking.amountPaid}`} />
                        <Detail label="Status" value={booking.status} />
                        <Detail
                            label="Confirmed"
                            value={booking.isConfirmed ? "Yes" : "No"}
                        />
                    </div>

                    {/* Vehicle */}
                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">Vehicle</h3>
                        <p>{booking.vehicle?.name}</p>
                    </div>

                    {/* Seats */}
                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">Seat Numbers</h3>
                        <div className="flex flex-wrap gap-2">
                            {booking.seatNumbers.map((seat) => (
                                <span
                                    key={seat}
                                    className="px-3 py-1 bg-gray-100 rounded text-sm"
                                >
                                    {seat}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Additional Passengers */}
                    {booking.additionalPassengerNames?.length > 0 && (
                        <div className="mt-6">
                            <h3 className="font-semibold mb-2">Additional Passengers</h3>
                            <ul className="list-disc list-inside text-sm">
                                {booking.additionalPassengerNames.map((name, index) => (
                                    <li key={index}>{name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Footer (fixed) */}
                <div className="p-4 border-t flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

