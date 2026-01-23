import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/pages/HomeView.vue";
import CarsView from "@/pages/CarsView.vue";
import BookingsView from "@/pages/BookingsView.vue";
import CarView from "@/pages/CarView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/cars", component: CarsView },
  { path: `/cars/:id`, name: "car", component: CarView },
  { path: "/bookings", component: BookingsView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
