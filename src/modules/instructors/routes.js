export default [
  {
    path: "/instructors",
    name: "InstructorsPage",
    component: () => import("./views/AllInstructors.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/instructor-profile",
    name: "InstructorProfile",
    component: () => import("./views/InstructorProfile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/instructors/:id",
    name: "InstructorDetails",
    component: () => import("./views/InstructorDetails.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/edit-instructor/:id",
    name: "EditInstructor",
    component: () => import("./views/EditInstructorPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/create-instructor", 
    name: "CreateInstructor",
    component: () => import("./views/CreateInstructorPage.vue"),
    meta: { requiresAuth: true },
  },
];
