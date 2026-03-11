<template>
  <div class="container mt-4">
    <!-- Instructor Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2>{{ instructor.name }}</h2>
        <p class="text-muted">{{ instructor.email }}</p>
      </div>
      <button class="btn btn-primary" @click="goToNextSession">
        <i class="bi bi-calendar-event me-1"></i> Next Session
      </button>
    </div>

    <!-- Groups Section -->
    <h4 class="mb-3 text-secondary">Instructor Groups</h4>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="group in instructorGroups" :key="group.id">
        <div class="p-3 shadow-sm rounded border h-100" @click="goToGroup(group.id)" style="cursor: pointer;">
          <h5 class="mb-1">{{ group.name }}</h5>
          <p class="text-muted small mb-1">{{ group.course }}</p>
          <p class="mb-1"><strong>Sessions:</strong> {{ group.attended }} / {{ group.total }}</p>
          <div class="progress" style="height: 6px;">
            <div class="progress-bar bg-success" :style="{ width: progress(group) + '%' }"></div>
          </div>
          <p class="small text-muted mt-1">Progress: {{ progress(group) }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

// Fake instructor data (ready for API)
const instructor = {
  id: 1,
  name: "Eng. Salma Youssef",
  email: "salma@academy.com",
};

// Fake groups data (can be replaced with API response)
const instructorGroups = [
  {
    id: 101,
    name: "Python Beginners A",
    course: "Python",
    attended: 6,
    total: 12,
  },
  {
    id: 102,
    name: "Python Advanced",
    course: "Python",
    attended: 4,
    total: 10,
  },
  {
    id: 103,
    name: "Robotics for Kids",
    course: "Robotics",
    attended: 5,
    total: 8,
  },
];

const goToGroup = (id) => {
  router.push(`/group/${id}`);
};

const goToNextSession = () => {
  // 👇 Logic to determine next session, now just redirect to sample page
  router.push(`/instructor/${instructor.id}/next-session`);
};

const progress = (group) =>
  group.total > 0 ? Math.round((group.attended / group.total) * 100) : 0;
</script>

<style scoped>
.progress {
  background-color: #e9ecef;
}
</style>
