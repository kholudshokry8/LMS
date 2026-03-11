<template>
  <div class="profile-container container mt-5 mb-5">
    <div v-if="instructor?.user && instructor?.instructor">
      <!-- Header Section -->
      <div class="d-flex flex-column flex-md-row align-items-center gap-4 mb-4 border-bottom pb-4">
        <img
          :src="getImageUrl(instructor.instructor.profile_image)"
          @error="onImageError"
          class="profile-image"
          alt="Profile Image"
        />
        <div>
          <h2 class="fw-bold mb-1">{{ instructor.user.name }}</h2>
          <p class="text-muted mb-2">{{ specialization }}</p>
          <a
            v-if="instructor.instructor.linkedin"
            :href="instructor.instructor.linkedin"
            target="_blank"
            class="btn btn-outline-primary btn-sm"
          >
            <i class="bi bi-linkedin me-1"></i> LinkedIn
          </a>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="row mb-4">
        <div class="col-md-6 mb-3">
          <i class="bi bi-envelope me-2"></i><strong>Email:</strong>
          <p class="mb-0">{{ instructor.user.email }}</p>
        </div>
        <div class="col-md-6 mb-3">
          <i class="bi bi-phone me-2"></i><strong>Phone:</strong>
          <p class="mb-0">{{ instructor.user.phone }}</p>
        </div>
      </div>

      <!-- Bio -->
      <div class="mb-4">
        <h5 class="section-title">
          <i class="bi bi-info-circle me-2"></i> Bio
        </h5>
        <div class="bio-box">
          {{ bio }}
        </div>
      </div>

      <!-- Courses -->
<!-- Courses -->
<div v-if="instructor.instructor.courses?.length">
  <h5 class="section-title">
    <i class="bi bi-journal-bookmark me-2"></i> Courses
  </h5>
  <ul class="list-group list-group-flush mt-2">
    <li
      class="list-group-item py-2"
      v-for="course in instructor.instructor.courses"
      :key="course.id"
    >
      {{ course.title }}
    </li>
  </ul>
</div>


   
    </div>

    <!-- Loading Spinner -->
    <div v-else class="d-flex justify-content-center align-items-center mt-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import instructorsService from "../services/instructorsService";

const route = useRoute();
const instructor = ref(null);

// Fetch instructor details from API
const fetchInstructor = async () => {
  try {
    const res = await instructorsService.getById(route.params.id);

    instructor.value = {
      user: {
        name: res.instructor.name,
        email: res.instructor.email,
        phone: res.instructor.phone,
      },
      instructor: {
        specialization: res.instructor.instructor?.specialization || "",
        bio: res.instructor.instructor?.bio || "",
        linkedin: res.instructor.instructor?.linkedin || "",
        profile_image: res.instructor.instructor?.profile_image || "",
        // ✅ هنا ندمج الكورسات من المستوى الأعلى
        courses: res.instructor.courses || [],
      },
    };
  } catch (error) {
    console.error("Error loading instructor profile:", error);
  }
};


onMounted(fetchInstructor);

// ⬇️ Handle image URL properly
const getImageUrl = (image) => {
  return image
    ? `https://stemers-backend.coodex-academy.com/${image.replace(/^\/+/, '')}`
    : 'https://via.placeholder.com/160?text=No+Image';
};

// ⬇️ Fallback if image fails
const onImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/160?text=No+Image';
};

// Computed fields
const specialization = computed(() => instructor.value?.instructor?.specialization || "No specialization provided.");
const bio = computed(() => instructor.value?.instructor?.bio || "No bio provided.");
</script>

<style scoped>
.profile-container {
  max-width: 900px;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 0.5rem;
}

.profile-image {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #d65622;
  background-color: #f0f0f0;
}

.section-title {
  color: #d65622;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.bio-box {
  background-color: #f9f9f9;
  border-left: 4px solid #d65622;
  padding: 1rem;
  border-radius: 0.5rem;
  font-style: italic;
  white-space: pre-line;
}

.list-group-item {
  background-color: transparent;
  border: none;
  padding-left: 0;
}
</style>
