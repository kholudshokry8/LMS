<template>
  <div class="mt-2">
    <div v-if="store.successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      {{ store.successMessage }}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
    
    <div v-if="store.errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
      {{ store.errorMessage }}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>Course List</h1>
      <RouterLink to="/courses/create" class="btn btn-success d-flex align-items-center gap-2">
        <i class="bi bi-plus-lg"></i> Create
      </RouterLink>
    </div>

    <BaseLoading v-if="store.loading" />

    <div v-else>
      <BaseTable
        :columns="['Title','Category','Language','Level','Duration','Price','Rating','Status','actions']"
        :data="store.courses.map(course => ({
          id: course.id,
          Title: course.title,
          Category: course.category?.name || 'N/A',
          Language: course.language,
          Level: course.level,
          Duration: course.duration,
          Price: `${course.price} USD`,
          Rating: course.rating,
          Status: course.status,
        }))"
      >
        <template #actions="{ row }">
          <button class="btn btn-sm btn-info me-1" @click="viewCourse(row)">
            <i class="bi bi-eye"></i>
          </button>
          <button class="btn btn-sm btn-primary me-1" @click="editCourse(row)">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger" @click="deleteCourse(row)">
            <i class="bi bi-trash"></i>
          </button>
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCoursesStore } from "../store/coursesStore";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseLoading from "@/components/base/BaseLoading.vue";

const router = useRouter();
const store = useCoursesStore();

onMounted(() => store.fetchCourses());

const viewCourse = (row) => router.push({ name: "CourseDetails", params: { id: row.id } });
const editCourse = (row) => router.push({ name: "EditCourse", params: { id: row.id } });
const deleteCourse = async (row) => {
  if (confirm(`Are you sure you want to delete "${row.Title}"?`)) {
    await store.deleteCourse(row.id);
    await store.fetchCourses();
  }
};
</script>