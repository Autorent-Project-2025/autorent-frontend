export interface Car {
  id: number;
  brand: string;
  model: string;
  priceHour: number | null;
  category: string;
  rating: number | null;
  description: string | null;

  images?: string[];
  features?: string[];
  specifications?: CarSpecifications;
}

export interface CarPreview {
  id: number;
  brand: string;
  model: string;  
  year?: number;
  category: string;
  imageUrl?: string;
  priceHour: number | null;
  rating: number | null;
}

export interface CarDetails {
  id: number;
  brand: string;
  model: string;
  
  priceHour: number | null;
  priceDay: number | null;
  
  rating: number | null;
  description: string | null;
  
  images?: string[];
  features?: string[];
  specifications?: CarSpecifications;
}

export interface CarSpecifications {
  year?: number;
  bodyType?: string;
  engine?: string;
  transmission?: string;
  fuelType?: string;
  seats?: number;
  doors?: number;
  color?: string;
  mileage?: number;
}

export interface CarComment {
  id: number;
  userId: number;
  userName: string;
  carId: number;
  content: string;
  rating: number;
  created_On: string; // После camelCase преобразования будет created_On
}

// Для создания комментария
export interface CreateCommentDto {
  carId: number;
  content: string;
  rating: number;
}
