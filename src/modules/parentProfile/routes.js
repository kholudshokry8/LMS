// parentProfile/routes.js
export default [
  {
    path: "/parentProfile",
    component: () => import("./views/parentProfile.vue"),
  },
  {
    path: "/parentProfile/:childId",
    component: () => import("./views/childProfile.vue"),
  },
  {
    path: "/parentProfile/:childId/:groupId",
    component: () => import("./views/groupDetails.vue"),
  }
];
