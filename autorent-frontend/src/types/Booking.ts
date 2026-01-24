export interface BookingDraft {
  carId: number;
  carTitle: string;
  priceHour: number;
}

export interface Booking {
  id: number;
  carId: number;
  carTitle: string;
  dateFrom: string;
  dateTo: string;
  totalPrice: number;
  status: "active" | "completed" | "canceled";
}
