export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  priceHour: number;
  category: string;
  rating: number;
  description: string;

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
  priceHour: number;
  rating: number;
}

export interface CarDetails {
  id: number;
  brand: string;
  model: string;
  year?: number;
  
  priceHour: number;
  priceDay: number;
  
  rating: number;
  description: string;
  
  images?: string[];
  features?: string[];
  specifications?: CarSpecifications;
}

export interface CarSpecifications {
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
