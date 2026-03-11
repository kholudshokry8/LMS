export default [
  {
    path: "/Transactions",
    name: "TransactionsPage",
    component: () => import("./views/TransactionPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/Transactions/:id",
    name: "TransactionDetails",
    component: () => import("./views/TransactionDetails.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/edit-transaction/:id",
    name: "EditTransaction",
    component: () => import("./views/EditTransactionPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/create-transaction",
    name: "CreateTransaction",
    component: () => import("./views/CreateTransactionPage.vue"),
    meta: { requiresAuth: true },
  },
];
