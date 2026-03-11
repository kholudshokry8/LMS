import { createRouter, createWebHistory } from "vue-router";
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import courseRoutes from "../modules/courses/routes";
import studentProfileRoutes from "../modules/studentProfile/routes";
import instrucrorRoutes from "../modules/instructors/routes";
import transactionRouters from "../modules/transactions/routes";
import studentRoutes from "../modules/students/routes";
// import parentRoutes from "../modules/parent/routes";
import dashboardRoutes from "../modules/dashboard/routes";

import Login from "@/modules/auth/views/Login.vue";
import studentForms from "@/modules/students/views/studentForms.vue";

import groupsroutes from "../modules/groups/routes";
import { useAuthStore } from "@/modules/auth/store/authStore";
import categoryRoutes from "../modules/category/routes";
import parentProfileRoutes from '@/modules/parentProfile/routes';
import instructorProfileRoutes from '@/modules/instructorProfile/routes';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: SidebarLayout,
      children: [
        ...courseRoutes,
        // ...parentRoutes,
        ...parentProfileRoutes,
        ...studentRoutes,
        ...groupsroutes,
        ...instrucrorRoutes,
        ...transactionRouters,
        ...studentProfileRoutes,
        ...categoryRoutes,
        ...dashboardRoutes,
       ...instructorProfileRoutes
       
      
      ],
      meta: { requiresAuth: true }
    },
    { path: "/login", component: Login, meta: { requiresAuth: false } },
   
  ]
});
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const user = authStore.user;

  if (to.meta.requiresAuth && !isAuthenticated && user == null) {
    next("/login");
  } else {
    next();
  }
});
export default router;
