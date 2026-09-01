import type { SalonLocation } from "./types";

export const locations: SalonLocation[] = [
  {
    id: "duke-street",
    name: "Duke Street",
    bookingOptions: [
      {
        label: "Book with Booksy",
        url: "https://vipsalondukestreet.booksy.com/a",
      },
      {
        label: "Book with Treatwell",
        url: "https://widget.treatwell.co.uk/place/vip-salon/",
      },
    ],
  },
  {
    id: "marbella",
    name: "Marbella",
    bookingOptions: [],
  },
  {
    id: "cumbernauld",
    name: "Cumbernauld",
    bookingOptions: [
      {
        label: "Book appointment",
        url: "https://widget.treatwell.co.uk/place/vip-salon-cumbernauld/",
      },
    ],
  },
  {
    id: "hillfoot-business-hub",
    name: "Hillfoot Business Hub",
    bookingOptions: [],
  },
  {
    id: "knightswood",
    name: "Knightswood",
    bookingOptions: [
      {
        label: "Book appointment",
        url: "https://widget.treatwell.co.uk/place/vip-aesthetics-lasering/?utm_medium=partner-ecosystem&utm_campaign=partner-instagram&utm_content=book-now",
      },
    ],
  },
  {
    id: "sword-street-head-spa",
    name: "Sword Street Head SPA",
    bookingOptions: [],
  },
];

export const business = {
  name: "VIP Salons",
  tagline: "Multi Award-Winning Salons",
  phone: "07477 535775",
  phoneUri: "tel:+447477535775",
  payment: "Klarna available",
} as const;
