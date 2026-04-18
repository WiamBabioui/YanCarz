import clio from "/clio.jpg";
import dacia from "/dacia.jpg";
import hyundai from "/Hyundai i10.jpg";
import tiguan from "/VW Tiguan R-Line.jpg";

export const CARS = [
  {
    id: 1,
    name: "Dacia Duster",
    img: dacia,
    agency: "YaanExpress",
    rating: 4.6,
    seats: 5,
    gearbox: "Manuelle",
    fuel: "Diesel",
    pricePerDay: 450,
  },
  {
    id: 2,
    name: "Renault Clio 5",
    img: clio,
    agency: "Budget Maroc",
    rating: 4.8,
    seats: 5,
    gearbox: "Manuelle",
    fuel: "Diesel",
    pricePerDay: 295,
  },
  {
    id: 3,
    name: "VW Tiguan R-Line",
    img: tiguan,
    agency: "Hertz Morocco",
    rating: 4.9,
    seats: 5,
    gearbox: "Auto",
    fuel: "Hybride",
    pricePerDay: 850,
  },
  {
    id: 4,
    name: "Hyundai i10",
    img: hyundai,
    agency: "Roc-a-Car",
    rating: 4.5,
    seats: 4,
    gearbox: "Manuelle",
    fuel: "Essence",
    pricePerDay: 250,
  },
];

export function getCarById(id) {
  return CARS.find((c) => String(c.id) === String(id));
}
