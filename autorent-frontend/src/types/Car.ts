export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  priceHour: number | null;
  priceDay: number | null;
  imageUrl: string | null;
}
// for morph effect purposes
export interface CarDetails extends Car {
  description?: string;
  features?: string[];
  specifications?: {
    engine?: string;
    transmission?: string;
    fuelType?: string;
    seats?: number;
    doors?: number;
    color?: string;
    mileage?: number;
  };
  images?: string[];
  averageRating?: number;
  totalReviews?: number;
}
