import api from "./axios";
import type { Car, CarDetails } from "../types/Car";

// Функция для преобразования PascalCase → camelCase
function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
      result[camelKey] = toCamelCase(obj[key]);
      return result;
    }, {} as any);
  }
  return obj;
}

// Получить список всех машин
export async function getCars(): Promise<Car[]> {
  const res = await api.get("/cars");
  return toCamelCase(res.data);
}

// Получить детали машины по ID (с комментариями)
export async function getCarDetails(id: number): Promise<CarDetails> {
  const res = await api.get(`/cars/${id}`);
  console.log("Raw backend response:", res.data);
  const transformed = toCamelCase(res.data);
  console.log("Transformed to camelCase:", transformed);
  return transformed;
}

// Создать комментарий к машине
export async function createCarComment(
  carId: number,
  content: string,
  rating: number
) {
  // ✅ Правильный endpoint согласно вашему бэкенду
  const res = await api.post("/car-comments", {
    carId, // ✅ carId в теле запроса (не в URL!)
    content,
    rating,
  });
  return toCamelCase(res.data);
}

// Обновить комментарий
export async function updateCarComment(
  commentId: number,
  content: string,
  rating: number
) {
  const res = await api.put(`/car-comments/${commentId}`, {
    content,
    rating,
  });
  return toCamelCase(res.data);
}

// Удалить комментарий
export async function deleteCarComment(commentId: number) {
  const res = await api.delete(`/car-comments/${commentId}`);
  return res.data;
}
