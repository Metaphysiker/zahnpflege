import { createMemoryHistory, createRouter } from "vue-router";
import HorsesOverviewView from "../views/HorsesOverviewView.vue";
const routes = [
  { path: "/", component: HorsesOverviewView },
  { path: "/horses-overview", component: HorsesOverviewView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
