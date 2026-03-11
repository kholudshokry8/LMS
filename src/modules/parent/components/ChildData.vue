<script setup>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useParentStore } from "@/modules/parent/store/parentStore.js";

const store = useParentStore();
const route = useRoute();

onMounted(() => {
  store.fetchParentData();
});

const childId = computed(() => Number(route.params.id));
const child = computed(() => store.children.find(c => c.id === childId.value));

const getImageUrl = (imageName) => {
  return new URL(`../../../assets/parent/${imageName}`, import.meta.url).href;
};
</script>

<template>
  <div v-if="store.loading" class="text-center py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else-if="child" class="container py-4">
    <!-- Child Info -->
    <div class="card p-4 mb-4 shadow-sm">
      <div class="d-flex align-items-center">
        <img :src="getImageUrl(child.image)" :alt="child.name" class="rounded-circle me-3" style="width: 80px; height: 80px;">
        <div>
          <h3 class="mb-1">{{ child.name }}</h3>
          <p class="text-muted mb-0">Age: {{ child.age }}</p>
          <p class="text-muted mb-0">Enrolled Courses: {{ child.enrolledCourses }}</p>
          <p class="text-muted mb-0">Last Rating: {{ child.lastRating }}%</p>
        </div>
      </div>
    </div>

    <!-- Certificates -->
    <div class="card p-3 mb-4 shadow-sm">
      <h4 class="mb-3">Certificates</h4>
      <ul class="list-group">
        <li v-for="certificate in child.certificates" :key="certificate.id" class="list-group-item">
          {{ certificate.name }}
        </li>
      </ul>
    </div>

    <!-- Attendance -->
    <div class="card p-3 mb-4 shadow-sm">
      <h4 class="mb-3">Attendance</h4>
      <p class="fs-5">{{ child.attendance }}%</p>
    </div>

    <!-- Grades -->
    <div class="card p-3 mb-4 shadow-sm">
      <h4 class="mb-3">Grades</h4>
      <table class="table table-bordered table-hover">
        <thead class="table-light">
          <tr>
            <th>Course</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="grade in child.grades" :key="grade.course">
            <td>{{ grade.course }}</td>
            <td>{{ grade.score }}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Projects -->
    <div class="card p-3 mb-4 shadow-sm">
      <h4 class="mb-3">Projects</h4>
      <ul class="list-group">
        <li v-for="project in child.projects" :key="project.id" class="list-group-item">
          <strong>{{ project.title }}</strong>
          <p class="mb-0 text-muted">{{ project.description }}</p>
        </li>
      </ul>
    </div>
  </div>

  <div v-else class="text-center py-5">
    <h3 class="text-danger">Child Not Found</h3>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
}
.card {
  border-radius: 12px;
}
.list-group-item {
  border: none;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 5px;
}
</style>
