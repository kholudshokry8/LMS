<script setup>
import { computed, onMounted } from "vue";
import { useDashboardStore } from "../store/dashboardstore";
import LineChart from "../components/LineChart.vue";
import BarChart from "../components/BarChart.vue";

const dashboard = useDashboardStore();

onMounted(() => {
  dashboard.fetchDashboardStats();
});

// Cards
const cards = computed(() => [
  { title: "Total Students", value: dashboard.totalStudents, icon: "bi bi-people-fill", bg: "bg-primary" },
  { title: "Total Instructors", value: dashboard.totalInstructors, icon: "bi bi-person-badge-fill", bg: "bg-success" },
  { title: "Total Courses", value: dashboard.totalCourses, icon: "bi bi-journal-bookmark-fill", bg: "bg-info" },
  { title: "Total Groups", value: dashboard.totalGroups, icon: "bi bi-people", bg: "bg-warning" },
  { title: "Today's Sessions", value: dashboard.todaysSessions, icon: "bi bi-calendar-day-fill", bg: "bg-danger" },
  { title: "Total Sessions", value: dashboard.totalSessions, icon: "bi bi-calendar3", bg: "bg-secondary" },
  { title: "Total Evaluations", value: dashboard.totalEvaluations, icon: "bi bi-bar-chart-line-fill", bg: "bg-dark" },
  { title: "Certificates Issued", value: dashboard.certificatesIssued, icon: "bi bi-award-fill", bg: "bg-primary" }
]);

// Charts (استخدام fallback [] لضمان عدم الكسر)
const attendanceChartData = computed(() => {
  const data = dashboard.monthlyAttendanceRate || [];
  if (!Array.isArray(data) || data.length === 0) return { labels: [], datasets: [] };

  return {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: "Attendance %",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderColor: "rgba(0, 123, 255, 1)",
        data: data.map(item => item.rate),
        fill: true,
        tension: 0.4
      }
    ]
  };
});

const studentsChartData = computed(() => {
  const data = dashboard.newStudentsPerMonth || [];
  if (!Array.isArray(data) || data.length === 0) return { labels: [], datasets: [] };

  return {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: "New Students",
        backgroundColor: "rgba(40, 167, 69, 0.6)",
        borderColor: "rgba(40, 167, 69, 1)",
        borderWidth: 1,
        data: data.map(item => item.count)
      }
    ]
  };
});


// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: { beginAtZero: true }
  },
  plugins: {
    tooltip: { enabled: true },
    legend: { display: true, position: "bottom" }
  },
  animation: {
    duration: 1000,
    easing: "easeOutQuart"
  }
};
</script>



<template>
  <div class="container mt-5">
    <div class="row g-4">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3"
        v-for="card in cards"
        :key="card.title"
      >
        <div class="card text-white h-100" :class="card.bg">
          <div class="card-body d-flex flex-column justify-content-center align-items-center">
            <i :class="card.icon" class="mb-2" style="font-size: 2rem;"></i>
            <h5 class="card-title">{{ card.title }}</h5>
            <p class="card-text fs-4">{{ card.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-md-6 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-center">Attendance Rate</h5>
            <div class="chart-container">
              <LineChart :chart-data="attendanceChartData" :chart-options="chartOptions" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-center">New Students per Month</h5>
            <div class="chart-container">
              <BarChart :chart-data="studentsChartData" :chart-options="chartOptions" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}
.chart-container {
  position: relative;
  height: 300px;
}
</style>
