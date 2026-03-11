export default [
    {
      path: '/courses',
      name: 'CoursesPage',
      component: () => import('./views/CoursesPage.vue'),
      meta:{requiresAuth:true}

    },
    {
      path: "/courses/:id/edit",
      name: "EditCourse",
      component: () => import("./views/EditCourse.vue"),
    }
    
,    
    {
      path: '/courses/:id',
      name: 'CourseDetails',
      component: () => import('./views/CourseDetails.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/courses/create',
      name: 'CreateCourse',
      component: () => import('./views/CreateCourse.vue'),
      meta:{requiresAuth:true}

    },
    {
      path: "/courses/certificates",
      name: "Certificates",
      component: () => import("@/modules/courses/views/CertificatesPage.vue"),
    },
    {
      path: "/sessions",
      name: "SessionsView",
      component: () => import("@/modules/groups/views/SessionsView.vue"),
    }
    
    
    
  ];
  