export default [
  {
    path: '/Groups',
    name: 'GroupsPage',
    component: () => import('./views/GroupsPage.vue'),
    meta:{requiresAuth:true}

  },
  {
    path: '/Groups/:id',
    name: 'GroupDetails',
    component: () => import('./views/GroupDetails.vue'),
    meta:{requiresAuth:true}

  },
  {
    path: '/Groups/Create',
    name: 'CreateGroup',
    component: () => import('../groups/components/CreateGroup.vue'),
    meta:{requiresAuth:true}

  },
  {
    path: '/Groups/Edit/:id',
    name: 'EditGroup',
    component: () => import('../groups/components/EditGroup.vue'),
    meta:{requiresAuth:true}

  },
  {
    path: '/Groups/sessions/:id',
    name: 'SessionsGroup',
    component: () => import('../groups/views/SessionsGroup.vue'),
    meta:{requiresAuth:true}

  },

  ];
  