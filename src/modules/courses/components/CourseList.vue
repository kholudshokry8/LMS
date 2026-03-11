<template>
  <div class="mt-2">
    <div v-if="store.successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      {{ store.successMessage }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    
    <div v-if="store.errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
      {{ store.errorMessage }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

    <div class="d-flex flex-row justify-content-between align-items-center flex-wrap">
      <h1>Course List</h1>
      <div class="buttons d-flex flex-row gap-2">
<RouterLink
  type="button"
  class="btn btn-success d-flex align-items-center gap-2"
  to="/courses/create"
>
  <i class="bi bi-plus-lg"></i>
  Create
</RouterLink>


      </div>
    </div>

    <BaseLoading v-if="store.loading" />

    <div v-else>
      <BaseTable
        :columns="['Title', 'Category', 'Language', 'Level', 'Duration', 'Price', 'Rating', 'Status']"
        :data="store.courses.map((course) => ({
          id: course.id,
          Title: course.title,
          Category: course.category?.name || 'N/A',
          Language: course.language,
          Level: course.level,
          Duration: course.duration,
          Price: `${course.price} USD`,
          Rating: course.rating,
          Status: course.status,
          'YouTube Video': `<a href='${course.youtube_video}' target='_blank'>Watch</a>`
        }))"
        :actions="{ show: true, edit: true, delete: true }"
        @show="showCourse"
        @edit="editCourse"
        @delete="deleteCourse"
        :userRole="currentUserRole"
        @adminCertificates="goToCourseCertificates"
        @goToSessions="goToSessionsPage"
        @goToAllSessions="goToAllSessionsPage"    
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useCoursesStore } from "../store/coursesStore";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseLoading from "@/components/base/BaseLoading.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useCoursesStore();

const goToAllSessionsPage = () => {
  router.push({ name: "SessionsView" });
};

const showCourse = (course) => {
  router.push({ name: "CourseDetails", params: { id: course.id } });
};

// const editCourse = (course) => {
//   console.log("Editing course:", course);
// };
const editCourse = (course) => {
  router.push({ name: "EditCourse", params: { id: course.id } });
};


const deleteCourse = (course) => {
  if (confirm(`Are you sure you want to delete ${course.title}?`)) {
    store.deleteCourse(course.id);
  }
};


onMounted(() => {
  store.fetchCourses();
});

</script>