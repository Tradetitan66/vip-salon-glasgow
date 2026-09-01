export type BookingOption = {
  label: string;
  url: string;
};

export type SalonLocation = {
  id: string;
  name: string;
  shortDescription?: string;
  image?: string;
  bookingOptions: BookingOption[];
};
