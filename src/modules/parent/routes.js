export default [
    {
      path: '/parent/dashboard',
      name: 'parent/dashboard',
      component: () => import('./views/Parent.vue'),
      meta:{requiresAuth:true}

    },
    {
      path: '/parent/new-courses',
      name: 'new-courses',
      component: () => import('./views/newCourses.vue'),
      meta:{requiresAuth:true}

    },
    {
      path: '/child-profile/:id',
      name: 'ChildData',
      component: () => import('./views/ChildData.vue'),
      meta:{requiresAuth:true}

    },
    {
      path: "/buy-course/:id",
      name: "BuyCourse",
      component: () => import("@/modules/parent/views/BuyCourse.vue"),
    }
,    
    {
      path: '/course/:id',
      name: 'course',
      component: () => import('./views/courseDetails.vue'),
      meta:{requiresAuth:true}

    },
  ];
  