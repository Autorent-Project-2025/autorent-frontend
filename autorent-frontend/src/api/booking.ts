import api from "./axios";

export async function getMyBookings() {
  const res = await api.get("/booking/my");
  return res.data;
}

export async function createBooking(carId: number, start: string, end: string) {
  const res = await api.post("/booking", {
    carId,
    startDate: start,
    endDate: end,
  });

  return res.data;
}
// cancelBooking logic for simplicity
export async function cancelBooking(bookingId: number) {
  const res = await api.delete(`/booking/${bookingId}`);
  return res.data;
}

// checking availablity
export async function getCarBookings(carId: number) {
  const res = await api.get(`/booking/car/${carId}`);
  return res.data;
}
