export interface Trip {
  id: string;
  routeId: string;
  departureTime: string; // ISO string
  price: number; // in Naira
  availableSeats: number[] | undefined;
  vehicleType: "Toyota Sienna" | "Kia Carnival" | "Honda Odyssey";
}

// Generate sample trips for the next 7 days
export function generateTrips(): Trip[] {
  const trips: Trip[] = [];
  const routeIds = [
    "ph-aba",
    "aba-ph",
    "ph-owerri",
    "owerri-ph",
    "ph-uyo",
    "uyo-ph",
    "ph-calabar",
    "calabar-ph",
    "ph-enugu",
    "enugu-ph",
    "ph-omokwu",
    "omokwu-ph",
    "ph-ahoada",
    "ahoada-ph",
    "ph-yenagoa",
    "yenagoa-ph",
    "aba-owerri",
    "owerri-aba",
    "owerri-enugu",
    "enugu-owerri",
    "aba-enugu",
    "enugu-aba",
    "uyo-calabar",
    "calabar-uyo",
    "aba-uyo",
    "uyo-aba",
    "yenagoa-aba",
    "aba-yenagoa",
    "ahoada-aba",
    "aba-ahoada",
  ];
  const vehicleTypes: Array<
    "Toyota Sienna" | "Kia Carnival" | "Honda Odyssey"
  > = ["Toyota Sienna", "Kia Carnival", "Honda Odyssey"];

  const today = new Date();

  // For each route, create trips for the next 7 days
  routeIds.forEach((routeId) => {
    // Create trips at different times: 7am, 10am, 1pm, 4pm
    const departureTimes = [7, 10, 13, 16];

    for (let day = 0; day < 7; day++) {
      const date = new Date(today);
      date.setDate(today.getDate() + day);

      departureTimes.forEach((hour, idx) => {
        const departureDate = new Date(date);
        departureDate.setHours(hour, 0, 0, 0);

        // Set base price based on distance
        let basePrice = 0;
        if (
          routeId.includes("ph-calabar") ||
          routeId.includes("calabar-ph") ||
          routeId.includes("ph-enugu") ||
          routeId.includes("enugu-ph")
        ) {
          basePrice = 15000;
        } else if (
          routeId.includes("ph-uyo") ||
          routeId.includes("uyo-ph") ||
          routeId.includes("owerri-enugu") ||
          routeId.includes("enugu-owerri")
        ) {
          basePrice = 10000;
        } else if (
          routeId.includes("ph-owerri") ||
          routeId.includes("owerri-ph") ||
          routeId.includes("ph-yenagoa") ||
          routeId.includes("yenagoa-ph")
        ) {
          basePrice = 8000;
        } else {
          basePrice = 5000;
        }

        // Add some randomness to price
        const price = basePrice + Math.floor(Math.random() * 2000);

        // Generate random available seats (1-5, as there are 5 passenger seats)
        // For simplicity, we'll use numbers 1-5 to represent seats
        const totalSeats = 5;
        const availableSeats: number[] = [];

        // Randomly determine which seats are available
        for (let seat = 1; seat <= totalSeats; seat++) {
          if (Math.random() > 0.3) {
            // 70% chance seat is available
            availableSeats.push(seat);
          }
        }

        trips.push({
          id: `${routeId}-${day}-${idx}`,
          routeId,
          departureTime: departureDate.toISOString(),
          price,
          availableSeats,
          vehicleType:
            vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)],
        });
      });
    }
  });

  return trips;
}

// Simulated database of trips
export const trips = generateTrips();

// Function to search for trips
export function searchTrips(from: string, to: string, date: Date): Trip[] {
  const routeId = `${from}-${to}`;
  const searchDate = new Date(date);
  searchDate.setHours(0, 0, 0, 0);

  const nextDay = new Date(searchDate);
  nextDay.setDate(searchDate.getDate() + 1);

  return trips.filter((trip) => {
    const tripDate = new Date(trip.departureTime);
    return (
      trip.routeId === routeId &&
      tripDate >= searchDate &&
      tripDate < nextDay &&
      Array.isArray(trip.availableSeats) &&
      trip.availableSeats.length > 0
    );
  });
}
