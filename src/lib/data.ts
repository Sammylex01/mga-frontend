import { ESeatAvaliabilty } from "./enum";

export const TerminalsData = [
  {
    state: "Rivers State",
    city: "Ahoada",
  },
  {
    state: "Rivers State",
    city: "Port Harcourt",
  },
  {
    state: "Rivers State",
    city: "Omokwu",
  },
  {
    state: "Bayelsa State",
    city: "Yenagoa",
  },
  {
    state: "Abia State",
    city: "Aba",
  },
  {
    state: "Imo State",
    city: "Owerri",
  },
  {
    state: "Akwa Ibom",
    city: "Uyo",
  },
  {
    state: "Cross Rivers",
    city: "Calabar",
  },
  {
    state: "Enugu State",
    city: "Enugu",
  },
];

export const AdultsData = [1, 2, 3, 4, 5];

export const SeatsLabelData = [
  {
    name: "Selected Seat",
    color: "green",
  },
  {
    name: "Available Seat",
    color: "blue",
  },
  {
    name: "Booked Seat",
    color: "gray",
  },
];

export const AvailableSeatData = [
  {
    number: 1,
    availability: ESeatAvaliabilty.AVAILABLE,
  },
  {
    number: 2,
    availability: ESeatAvaliabilty.AVAILABLE,
  },
  {
    number: 3,
    availability: ESeatAvaliabilty.AVAILABLE,
  },
  {
    number: 4,
    availability: ESeatAvaliabilty.BOOKED,
  },
  {
    number: 5,
    availability: ESeatAvaliabilty.AVAILABLE,
  },
];
