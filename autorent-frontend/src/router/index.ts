import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import CarsView from "../views/CarsView.vue";
import MyBookingsView from "../views/MyBookingsView.vue";
import NotFoundView from "../views/NotFoundView.vue"; // 404
import CarDetailView from "@/views/CarDetailView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
    meta: { requiresAuth: false },
  },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  {
    path: "/cars",
    component: CarsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/bookings",
    component: MyBookingsView,
    meta: { requiresAuth: true },
  },
  {
    // ← ДОБАВИЛ
    path: "/:pathMatch(.*)*",
    component: NotFoundView,
  },
  {
    path: "/cars/:id",
    name: "CarDetail",
    component: CarDetailView,
    meta: { requiresAuth: false }, // currently without auth needed
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else {
    next();
  }
});
