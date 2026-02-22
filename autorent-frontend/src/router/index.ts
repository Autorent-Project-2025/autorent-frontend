import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/pages/HomeView.vue";
import CarsView from "@/pages/CarsView.vue";
import BookingsView from "@/pages/BookingsView.vue";
import CarView from "@/pages/CarView.vue";
import AuthView from "@/pages/AuthView.vue";  
import LoginForm from "@/components/modals/LoginForm.vue";
import RegisterRoleSelect from "@/components/modals/RegisterRoleSelect.vue";
import RegisterClientForm from "@/components/modals/RegisterClientForm.vue";
import RegisterPartnerForm from "@/components/modals/RegisterPartnerForm.vue";

const routes = [
  { path: "/", component: HomeView },
  {
    path: "/auth",
    component: AuthView,
    meta: { layout: "auth"},
    children: [
      { path: "login", name: "login", component: LoginForm },
      { path: "register", name: "register", component: RegisterRoleSelect },
      {
        path: "register/client",
        name: "register-client",
        component: RegisterClientForm,
      },
      {
        path: "register/partner",
        name: "register-partner",
        component: RegisterPartnerForm,
      },
    ],
  },
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
