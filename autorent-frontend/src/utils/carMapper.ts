import type { Car } from "@/types/Car";
import type { CarPreview } from "@/types/Car";
import type { CarDetails } from "@/types/Car";

const DAY_HOURS = 20;

export function mapToCarPreview(car: Car): CarPreview {
  return {
    id: car.id,
    brand: car.brand,
    model: car.model,
    year: car.year,
    category: car.category,
    rating: car.rating,
    priceHour: car.priceHour,
    imageUrl: car.images?.[0],
  };
}

export function mapToCarDetails(car: Car): CarDetails {
  return {
    id: car.id,
    brand: car.brand,
    model: car.model,
    year: car.year,

    priceHour: car.priceHour,
    priceDay: car.priceHour * DAY_HOURS,

    rating: car.rating,
    description: car.description,

    images: car.images,
    features: car.features,
    specifications: car.specifications,
  };
}
