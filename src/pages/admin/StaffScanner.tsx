import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { toast } from "sonner";
import { BASE_URL } from "../../services/apiInstance";


const StaffScanner = () => {
  const [scanResult, setScanResult] = useState<any>(null);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0 // Ensures the camera view remains square
      },
      false
    );

    scanner.render(onScanSuccess, onScanFailure);

    async function onScanSuccess(decodedText: string) {
      try {
        // 1. Immediately stop the camera to save battery and prevent double-trigger
        await scanner.clear();

        // 2. Parse the data
        const data = JSON.parse(decodedText);
        setScanResult(data);

        // 3. Perform the network request
        await handleVerifyBooking(data.code);
      } catch (err) {
        // Only toast if the QR was actually read but the DATA was bad
        setError("Invalid QR Code: Format not recognized");
        toast.error("Invalid QR Code Format");

        // If it failed, we might want to restart the scanner automatically
        // scanner.render(onScanSuccess, onScanFailure); 
      }


    }

    function onScanFailure(error: any) {
      console.log(error);
    }

    return () => {
      // Cleanup scanner on component unmount
      scanner.clear().catch(e => console.error("Failed to clear scanner", e));
    };
  }, []);

  const handleVerifyBooking = async (code: string) => {
    setIsLoading(true);
    setError("");
    try {

      const response = await axios.get(`${BASE_URL}/verifyBooking?code=${code}`);

      if (response.data.status) {
        setBookingDetails(response.data.booking);
        toast.success("Passenger Checked In Successfully");
      } else {
        toast.success(response.data.message);
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Verification failed";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const resetScanner = () => {
    // Reloading is safest to re-acquire camera permissions and re-init the DOM element
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">

        {/* Header - Changed to dynamic color based on status */}
        <div className={`p-8 text-white text-center transition-colors duration-500 ${error ? 'bg-red-500' : bookingDetails ? 'bg-green-600' : 'bg-primary'
          }`}>
          <h1 className="text-2xl font-black tracking-tight italic">BIG BEN EXPRESS</h1>
          <p className="text-sm opacity-90 font-medium uppercase tracking-widest mt-1">
            Terminal Check-in
          </p>
        </div>

        <div className="p-8">
          {/* Scanner Viewport */}
          {!scanResult && !error && (
            <div className="space-y-6">
              <div id="reader" className="overflow-hidden rounded-3xl border-0 bg-slate-100 shadow-inner"></div>
              <p className="text-center text-slate-400 text-sm animate-pulse">Position QR code within the frame</p>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center py-12">
              <div className="relative">
                <Loader2 className="animate-spin text-primary" size={50} />
                <div className="absolute inset-0 blur-lg bg-primary/20 animate-pulse"></div>
              </div>
              <p className="text-slate-500 font-bold mt-6">Processing Ticket...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-6 space-y-4 animate-in zoom-in duration-300">
              <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <XCircle className="text-red-500" size={48} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Scan Failed</h2>
                <p className="text-slate-500 px-4">{error}</p>
              </div>
              <button
                onClick={resetScanner}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all"
              >
                Try Another Ticket
              </button>
            </div>
          )}

          {/* Success Result View */}
          {bookingDetails && !isLoading && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600" size={48} />
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                    BOARDING AUTHORIZED
                  </span>
                  <h2 className="text-3xl font-black text-slate-800 mt-3">{bookingDetails.bookingCode}</h2>
                </div>

                <div className="bg-slate-50 rounded-[2rem] p-6 space-y-4 border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-xs font-bold uppercase">Passenger</span>
                    <span className="font-extrabold text-slate-800">{bookingDetails.passengerName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-xs font-bold uppercase">Route</span>
                    <span className="font-extrabold text-slate-800">{bookingDetails.travelingFrom} → {bookingDetails.destination}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-xs font-bold uppercase">Seats</span>
                    <div className="flex gap-1">
                      {bookingDetails.seatNumbers.map((s: number) => (
                        <span key={s} className="bg-primary text-white px-2 py-1 rounded-lg text-xs font-bold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={resetScanner}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl"
                >
                  <RefreshCw size={18} />
                  Next Passenger
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffScanner;