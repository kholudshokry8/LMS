export default [

    {
      path: '/studentProfile',
      name: 'StudentProfile',
      component: () => import('./views/StudentProfile.vue'),
      meta:{requiresAuth:true}

    },
    {
      path: '/edit-student',
      name: 'edit-student',
      component: () => import('./views/EditStudent.vue'),
      meta:{requiresAuth:true}

    },
    {
  path: '/student/group/:groupId',
  name: 'StudentGroupDetails',
  component: () => import('./views/Group.vue'),
      meta:{requiresAuth:true} // عدل المسار حسب مكان الملف
}

  ,
    {
  path: '/student/group/:groupId/session/:sessionId/task',
  name: 'TaskDetails',
   component: () => import("./views/SessionTask.vue")
}

    
  ];
  