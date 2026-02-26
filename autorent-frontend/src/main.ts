import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./app/router";
import VueApexCharts from "vue3-apexcharts";
import VueAxios from "vue-axios";
import axios from "axios";

import '@/app/assets/main.css'
import '@/app/assets/animations.css'


const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(VueApexCharts);
app.use(VueAxios, axios);

app.mount("#app");
