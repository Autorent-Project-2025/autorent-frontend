import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/shared/pages/HomeView.vue";
import CarsView from "@/modules/client/pages/CarsView.vue";
import BookingsView from "@/modules/client/pages/BookingsView.vue";
import CarView from "@/modules/client/pages/CarView.vue";
import AuthView from "@/modules/auth/pages/AuthView.vue";
import LoginForm from "@/modules/auth/components/LoginForm.vue";
import RegisterRoleSelect from "@/modules/auth/components/RegisterRoleSelect.vue";
import RegisterClientForm from "@/modules/auth/components/RegisterClientForm.vue";
import RegisterPartnerForm from "@/modules/auth/components/RegisterPartnerForm.vue";
import PartnerView from "@/modules/partner/pages/PartnerView.vue";

const routes = [
  { path: "/", component: HomeView },
  {
    path: "/auth",
    component: AuthView,
    meta: { layout: "auth" },
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
  {
    path: "/partner",
    component: PartnerView,
    meta: { layout: "partner" },
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
