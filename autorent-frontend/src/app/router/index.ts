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
import PartnerCarsView from "@/modules/partner/pages/CarsView.vue";
import RequestsView from "@/modules/partner/pages/RequestsView.vue";
import FinanceView from "@/modules/partner/pages/FinanceView.vue";
import SettingsView from "@/modules/partner/pages/SettingsView.vue";
import ProfileView from "@/modules/partner/pages/ProfileView.vue";

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
  {
    path: "/partner-cars",
    name: "partner-cars",
    component: PartnerCarsView,
    meta: { layout: "partner" },
  },
  {
    path: "/partner-requests",
    name: "partner-requests",
    component: RequestsView,
    meta: { layout: "partner" },
  },
  {
    path: "/partner-finance",
    name: "partner-finance",
    component: FinanceView,
    meta: { layout: "partner" },
  },
  {
    path: "/partner-settings",
    name: "partner-settings",
    component: SettingsView,
    meta: { layout: "partner" },
  },
  {
    path: "/partner-profile",
    name: "partner-profile",
    component: ProfileView,
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
