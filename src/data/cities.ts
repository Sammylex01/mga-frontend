export interface City {
  id: string;
  name: string;
  state?: string;
}

export const cities: City[] = [
  { id: "Port Harcourt", name: "Port Harcourt" },
  { id: "Onitsha", name: "Onitsha" },
  { id: "Owerri", name: "Owerri" }

];

export interface Route {
  id: string;
  from: string;
  to: string;
  distance: number; // in km
  duration: number; // in minutes
}

export const routes: Route[] = [
  { id: "ph-aba", from: "port harcourt", to: "aba", distance: 60, duration: 60 },
  { id: "aba-ph", from: "aba", to: "port harcourt", distance: 60, duration: 60 },
  { id: "ph-owerri", from: "port harcourt", to: "owerri", distance: 100, duration: 90 },
  { id: "owerri-ph", from: "owerri", to: "port harcourt", distance: 100, duration: 90 },
  { id: "ph-onitsha", from: "port harcourt", to: "onitsha", distance: 150, duration: 120 },
  { id: "onitsha-ph", from: "onitsha", to: "port harcourt", distance: 150, duration: 120 },
  { id: "ph-uyo", from: "port harcourt", to: "uyo", distance: 180, duration: 150 },
  { id: "uyo-ph", from: "uyo", to: "port harcourt", distance: 180, duration: 150 },
  { id: "ph-calabar", from: "port harcourt", to: "calabar", distance: 220, duration: 180 },
  { id: "calabar-ph", from: "calabar", to: "port harcourt", distance: 220, duration: 180 },
  { id: "ph-enugu", from: "port harcourt", to: "enugu", distance: 260, duration: 210 },
  { id: "enugu-ph", from: "enugu", to: "port harcourt", distance: 260, duration: 210 },
  { id: "ph-omokwu", from: "port harcourt", to: "omokwu", distance: 45, duration: 40 },
  { id: "omokwu-ph", from: "omokwu", to: "port harcourt", distance: 45, duration: 40 },
  { id: "ph-ahoada", from: "port harcourt", to: "ahoada", distance: 70, duration: 60 },
  { id: "ahoada-ph", from: "ahoada", to: "port harcourt", distance: 70, duration: 60 },
  { id: "ph-yenagoa", from: "port harcourt", to: "yenagoa", distance: 120, duration: 100 },
  { id: "yenagoa-ph", from: "yenagoa", to: "port harcourt", distance: 120, duration: 100 },
  { id: "aba-owerri", from: "aba", to: "owerri", distance: 60, duration: 50 },
  { id: "owerri-aba", from: "owerri", to: "aba", distance: 60, duration: 50 },
  {
    id: "owerri-enugu",
    from: "owerri",
    to: "enugu",
    distance: 140,
    duration: 120,
  },
  {
    id: "enugu-owerri",
    from: "enugu",
    to: "owerri",
    distance: 140,
    duration: 120,
  },
  { id: "aba-enugu", from: "aba", to: "enugu", distance: 150, duration: 130 },
  { id: "enugu-aba", from: "enugu", to: "aba", distance: 150, duration: 130 },
  { id: "uyo-calabar", from: "uyo", to: "calabar", distance: 80, duration: 70 },
  { id: "calabar-uyo", from: "calabar", to: "uyo", distance: 80, duration: 70 },
  { id: "aba-uyo", from: "aba", to: "uyo", distance: 120, duration: 110 },
  { id: "uyo-aba", from: "uyo", to: "aba", distance: 120, duration: 110 },
  {
    id: "yenagoa-aba",
    from: "yenagoa",
    to: "aba",
    distance: 140,
    duration: 120,
  },
  {
    id: "aba-yenagoa",
    from: "aba",
    to: "yenagoa",
    distance: 140,
    duration: 120,
  },
  { id: "ahoada-aba", from: "ahoada", to: "aba", distance: 90, duration: 80 },
  { id: "aba-ahoada", from: "aba", to: "ahoada", distance: 90, duration: 80 },
];
