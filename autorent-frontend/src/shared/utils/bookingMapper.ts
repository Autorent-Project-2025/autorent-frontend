import type { CarPreview, CarDetails } from "@/shared/types/Car";
import type { BookingDraft } from "@/shared/types/Booking";

export const mapCarToBookingDraft = (
  car: CarPreview | CarDetails,
): BookingDraft => ({
  carId: car.id,
  carTitle: `${car.brand} ${car.model} ${car.year}`,
  priceHour: car.priceHour,
});
