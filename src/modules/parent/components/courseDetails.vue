<script setup>
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useParentStore } from "@/modules/parent/store/parentStore.js";

const store = useParentStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  store.fetchCourses();
});

const courseId = computed(() => Number(route.params.id));
const course = computed(() => store.courses.find((c) => c.id === courseId.value));

const goToBuyCourse = () => {
  router.push({ name: "BuyCourse", params: { id: course.value.id } });
};

</script>

<template>
  <div v-if="!course" class="text-center py-5">
    <h3 class="text-danger">Course Not Found</h3>
  </div>

  <div v-else class="container py-4">
    <div class="card p-4 shadow-sm">
      <img :src="course.image" :alt="course.name" class="course-image mb-3" />
      <h2>{{ course.name }}</h2>
      <p class="text-muted">Instructor: {{ course.instructor }}</p>
      <p class="fs-5">{{ course.description }}</p>

      <h4>Course Content</h4>
      <ul>
        <li v-for="(session, index) in course.content" :key="index">{{ session }}</li>
      </ul>

      <p><strong>Sessions:</strong> {{ course.sessions }}</p>
      <p><strong>Price:</strong> ${{ course.price }}</p>

      <button class="btn btn-success" @click="goToBuyCourse">Buy Course</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}
.card {
  text-align: center;
  border-radius: 12px;
}
.course-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
}
</style>
