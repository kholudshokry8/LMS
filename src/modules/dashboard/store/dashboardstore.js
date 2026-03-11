import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/axios"; // ✅ استبدال axios بـ api المجهز

export const useDashboardStore = defineStore("dashboard", () => {
  const totalCourses = ref(0);
  const totalStudents = ref(0);
  const totalGroups = ref(0);
  const totalInstructors = ref(0);
  const todaysSessions = ref(0);
  const totalSessions = ref(0);
  const totalEvaluations = ref(0);
  const certificatesIssued = ref(0);
  const monthlyAttendanceRate = ref([]);
  const newStudentsPerMonth = ref([]);

  const loading = ref(false);
  const error = ref("");

  const fetchDashboardStats = async () => {
    loading.value = true;
    error.value = "";

    try {
      const response = await api.get("/dashboard"); // ✅ فقط relative path

      const data = response.data;

      totalCourses.value = data.total_courses;
      totalStudents.value = data.total_students;
      totalGroups.value = data.total_groups;
      totalInstructors.value = data.total_instructors;
      todaysSessions.value = data.todays_sessions;
      totalSessions.value = data.total_sessions;
      totalEvaluations.value = data.total_evaluations;
      certificatesIssued.value = data.certificates_issued;
      monthlyAttendanceRate.value = data.monthly_attendance_rate || [];
      newStudentsPerMonth.value = data.new_students_per_month || [];

    } catch (err) {
      console.error("❌ Failed to fetch dashboard stats", err);
      error.value = err.response?.data?.message || "Error fetching dashboard data";
    } finally {
      loading.value = false;
    }
  };

  return {
    totalCourses,
    totalStudents,
    totalGroups,
    totalInstructors,
    todaysSessions,
    totalSessions,
    totalEvaluations,
    certificatesIssued,
    monthlyAttendanceRate,
    newStudentsPerMonth,
    loading,
    error,
    fetchDashboardStats,
  };
});
