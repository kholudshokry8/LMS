<template>
  <div class="group-container" v-if="group">
    <!-- Header -->
    <h2 class="fw-bold text-center text-primary mb-2">🎓 {{ group.courseName }}</h2>
    <p class="text-center text-muted mb-4">📅 Start Date: {{ group.startDate || 'N/A' }}</p>

    <!-- Group Info -->
    <div class="group-info mb-4 pb-3 border-bottom">
      <div class="row mb-2 text-center">
        <div class="col-md-4"><strong>📘 Course:</strong> {{ group.courseName }}</div>
        <div class="col-md-4"><strong>👩‍🏫 Instructor:</strong> {{ group.instructor }}</div>
        <div class="col-md-4"><strong>🧮 Sessions:</strong> {{ group.totalSessions }}</div>
      </div>
      <div class="mt-2 text-center">
        <strong>📊 Attendance:</strong>
        <div class="progress mt-2 mx-auto" style="height: 12px; width: 50%; border-radius: 10px;">
          <div
            class="progress-bar progress-bar-striped progress-bar-animated bg-success"
            :style="{ width: attendancePercentage + '%' }"
          ></div>
        </div>
        <p class="text-muted small mt-1">
          {{ group.attendedSessions }} / {{ group.totalSessions }} Sessions ({{ attendancePercentage }}%)
        </p>
      </div>
    </div>

    <!-- Student Stats -->
    <div class="row text-center mb-4 pb-3 border-bottom">
      <div class="col-md-3 col-6" v-for="stat in studentStats" :key="stat.title">
        <div class="stat-card p-3 rounded shadow-sm">
          <div class="fs-3">{{ stat.icon }}</div>
          <h5 class="fw-bold mt-2">{{ stat.value }}</h5>
          <p class="text-muted small">{{ stat.title }}</p>
        </div>
      </div>
    </div>

    <!-- Sessions Table -->
    <div class="table-responsive" v-if="group.sessions && group.sessions.length">
      <table class="table table-bordered text-center align-middle">
        <thead style="background-color: #fff7d6;">
          <tr>
            <th>🎯 Name</th>
            <th>🕒 Date & Time</th>
            <th>✅ Attendance</th>
            <th>⏱️ Duration</th>
            <th>📌 Task</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="session in group.sessions" :key="session.session_name">
            <td>{{ session.session_name }}</td>
            <td>{{ session.date_time }}</td>
            <td>
              <span :class="session.attendance_status === 'Present' ? 'text-success' : 'text-danger'">
                {{ session.attendance_status === 'Present' ? '✅ Present' : '❌ Absent' }}
              </span>
            </td>
            <td>{{ session.duration }}</td>
            <td>
              
      <router-link
  :to="`/student/group/${group.id}/session/${session.id}/task`"
  class="btn btn-sm btn-warning rounded-pill"
>
  📌 Task {{session.id}}
</router-link>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-else class="text-center mt-5">
    <h4>⏳ Loading group details...</h4>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStudentStore } from "../store/studentStore";

const route = useRoute();
const studentStore = useStudentStore();
const groupId = parseInt(route.params.groupId);

const group = ref(null);

const attendancePercentage = computed(() => {
  return group.value && group.value.totalSessions
    ? ((group.value.attendedSessions / group.value.totalSessions) * 100).toFixed(0)
    : 0;
});

const studentStats = computed(() =>
  studentStore.studentStats.map((stat) => ({
    ...stat,
    icon:
      stat.title === "Submitted Tasks"
        ? "✅"
        : stat.title === "Enrolled Courses"
        ? "📘"
        : stat.title === "Task Grades"
        ? "📊"
        : "⏳",
  }))
);

onMounted(async () => {
  group.value = await studentStore.fetchGroupById(groupId);
});
</script>

<style scoped>
.group-container {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 2rem 1rem;
  background: #f0f9ff;
  font-family: 'Comic Neue', cursive, 'Segoe UI', sans-serif;
  border-radius: 20px;
}
.group-info strong {
  color: #444;
  font-size: 1.1rem;
}
.stat-card {
  background-color: #fff;
  border: 2px solid #dee2e6;
  border-radius: 16px;
  transition: all 0.3s ease;
}
.stat-card:hover {
  transform: scale(1.05);
  background-color: #e7f5ff;
}
</style>
