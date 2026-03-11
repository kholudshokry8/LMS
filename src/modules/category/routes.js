export default [
  {
    path: '/categories',
    name: 'CategoriesPage',
    component: () => import('./views/CategoryPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/categories/create',
    name: 'CreateCategory',
    component: () => import('./components/CreateCategory.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/categories/edit/:id',
    name: 'EditCategory',
    component: () => import('./components/EditCategory.vue'),
    meta: { requiresAuth: true },
    props: true, // لتمرير id كخاصية للمكون
  },
];