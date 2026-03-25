<template>
  <div class="profile-container container mt-5 mb-5">

    <!-- ✅ الشرط الصحيح -->
    <div v-if="instructor">

      <!-- Header Section -->
      <div
        class="d-flex flex-column flex-md-row align-items-center gap-4 mb-4 border-bottom pb-4"
      >

        <img
          :src="getImageUrl(instructor.instructor.profile_image)"
          @error="onImageError"
          class="profile-image"
          alt="Profile Image"
        />

        <div>

          <h2 class="fw-bold mb-1">
            {{ instructor.user.name }}
          </h2>

          <p class="text-muted mb-2">
            {{ specialization }}
          </p>

          <a
            v-if="instructor.instructor.linkedin"
            :href="instructor.instructor.linkedin"
            target="_blank"
            class="btn btn-outline-primary btn-sm"
          >
            LinkedIn
          </a>

        </div>

      </div>

      <!-- Contact Info -->

      <div class="row mb-4">

        <div class="col-md-6 mb-3">
          <strong>Email:</strong>

          <p class="mb-0">
            {{ instructor.user.email }}
          </p>
        </div>

        <div class="col-md-6 mb-3">
          <strong>Phone:</strong>

          <p class="mb-0">
            {{ instructor.user.phone }}
          </p>
        </div>

      </div>

      <!-- Bio -->

      <div class="mb-4">

        <h5 class="section-title">
          Bio
        </h5>

        <div class="bio-box">
          {{ bio }}
        </div>

      </div>

      <!-- Courses -->

      <div
        v-if="instructor.instructor.courses?.length > 0"
      >

        <h5 class="section-title">
          Courses
        </h5>

        <ul
          class="list-group list-group-flush mt-2"
        >

          <li
            class="list-group-item py-2"
            v-for="course in instructor.instructor.courses"
            :key="course.id"
          >

            {{ course.title }}

          </li>

        </ul>

      </div>

      <!-- لو مفيش كورسات -->

      <div
        v-else
        class="text-muted mt-3"
      >

        No courses assigned

      </div>

    </div>

    <!-- Loading -->

    <div
      v-else
      class="d-flex justify-content-center align-items-center mt-5"
    >

      <div
        class="spinner-border text-primary"
        role="status"
      >
      </div>

    </div>

  </div>
</template>

<script setup>

import {
  onMounted,
  ref,
  computed
} from "vue";

import {
  useRoute
} from "vue-router";

import instructorsService
  from "../services/instructorsService";

const route = useRoute();

const instructor = ref(null);

// ✅ Fetch instructor

const fetchInstructor = async () => {

  try {

    const res =
      await instructorsService.getById(
        route.params.id
      );

    console.log(
      "📦 Instructor Response:",
      res
    );

    instructor.value = {

      user: {

        name:
          res.instructor.name,

        email:
          res.instructor.email,

        phone:
          res.instructor.phone,

      },

      instructor: {

        specialization:
          res.instructor.instructor?.specialization || "",

        bio:
          res.instructor.instructor?.bio || "",

        linkedin:
          res.instructor.instructor?.linkedin || "",

        profile_image:
          res.instructor.instructor?.profile_image || "",

        // ✅ الكورسات الحقيقية فقط
        courses:
          res.instructor.courses ?? []

      }

    };

    console.log(
      "🎯 Instructor Courses:",
      instructor.value.instructor.courses
    );

  }

  catch (error) {

    console.error(
      "Error loading instructor profile:",
      error
    );

  }

};

onMounted(fetchInstructor);

// ✅ Image URL

const baseURL =
  "https://back.stemershub.com";

const getImageUrl = (image) => {

  if (!image) {

    return
      "https://via.placeholder.com/160?text=No+Image";

  }

  const fullUrl =
    baseURL + "/" + image;

  console.log(
    "🖼️ Image URL:",
    fullUrl
  );

  return fullUrl;

};

// fallback image

const onImageError = (e) => {

  e.target.src =
    "https://via.placeholder.com/160?text=No+Image";

};

// computed fields

const specialization = computed(() =>
  instructor.value?.instructor?.specialization ||
  "No specialization provided."
);

const bio = computed(() =>
  instructor.value?.instructor?.bio ||
  "No bio provided."
);

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