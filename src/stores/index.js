import { defineStore } from "pinia";
import { useAuthStore } from "@/modules/auth/store/authStore";
import { useCoursesStore } from "@/modules/courses/store/coursesStore";
import { useInstructorsStore } from "@/modules/instructors/store/instructorsStore";
import { useTransactionStore } from "@/modules/transactions/store/TransactionStore";
import { useCategoryStore } from "@/modules/categories/store/categoryStore"; 
import { useStudentsStore } from "@/modules/students";

export const useMainStore = defineStore("main", {
  state: () => ({
    auth: useAuthStore(),
    courses: useCoursesStore(),
    instructors: useInstructorsStore(),
    transactions: useTransactionStore(),
  }),
});
