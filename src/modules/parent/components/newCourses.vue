<script setup>
import { onMounted, ref, computed } from "vue";
import { useParentStore } from "@/modules/parent/store/parentStore.js";
import { useRouter } from "vue-router";

const store = useParentStore();
const router = useRouter();

const filterCategory = ref("");
const filterPrice = ref("");
const filterName = ref(""); // 🔹 New filter for course name

onMounted(() => {
  store.fetchCourses();
});

const filteredCourses = computed(() => {
  return store.courses.filter(course => {
    return (
      (!filterCategory.value || course.category === filterCategory.value) &&
      (!filterPrice.value || course.price <= filterPrice.value) &&
      (!filterName.value || course.name.toLowerCase().includes(filterName.value.toLowerCase())) // 🔹 Name filter
    );
  });
});

const goToCourseDetails = (courseId) => {
  router.push(`/course/${courseId}`);
};
</script>

<template>
  <div class="container py-4">
    <h2 class="mb-3">Available Courses</h2>
    
    <div class="filters mb-4">
      <input v-model="filterName" type="text" class="form-control" placeholder="Search by name"> <!-- 🔹 Name search -->
      <!-- <select v-model="filterCategory" class="form-select">
        <option value="">All Categories</option>
        <option v-for="category in store.categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select> -->
      <input v-model.number="filterPrice" type="number" class="form-control" placeholder="Max Price">
    </div>
    
    <div class="row">
      <div v-for="course in filteredCourses" :key="course.id" class="col-md-4 mb-4">
        <div class="card p-3 shadow-sm" @click="goToCourseDetails(course.id)">
          <img :src="course.image" :alt="course.name" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">{{ course.name }}</h5>
            <p class="card-text text-muted">{{ course.instructor }}</p>
            <p class="card-text">${{ course.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
}
.filters {
  display: flex;
  gap: 1rem;
}
.card {
  cursor: pointer;
  transition: transform 0.2s;
}
.card:hover {
  transform: scale(1.05);
}
</style>
