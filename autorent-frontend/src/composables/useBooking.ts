import { ref } from "vue";
import type { BookingDraft } from "@/types/Booking";

export const useBooking = () => {
  const draft = ref<BookingDraft | null>(null);

  const start = (booking: BookingDraft) => {
    draft.value = booking;
  };

  return { draft, start };
};