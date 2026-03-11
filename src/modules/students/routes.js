export default [
  {
    path: '/students',
    name: 'StudentsPage',
    component: () => import('./views/studentPage.vue'),

  },
  {
    path: '/students/:id',
    name: 'StudentDetails',
    component: () => import('./views/studentDetails.vue'),

  },
  {

    path: '/students/form/:id', 

    component: () => import('./views/studentForms.vue'),
    props: true 
  },
  {
    path: '/students/form', 
    name: 'StudentFormCreate', 
    component: () => import('./views/studentForms.vue'),

  }
];