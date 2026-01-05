export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  priceHour: number | null;
  priceDay: number | null;
  imageUrl: string | null;
  rating: number | null;
  description: string | null;
}

export interface CarDetails extends Car {
  comments: CarComment[];
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
