<template>
  <div class="container py-4">
    <h3 class="mb-4 text-primary fw-bold">Create New Group</h3>

    <form @submit.prevent="submitForm" class="row g-4">
      <!-- Group Name -->
      <div class="col-md-6">
        <label class="form-label">Group Name</label>
        <input v-model="form.name" type="text" class="form-control" required />
      </div>

      <!-- Course -->
      <div class="col-md-6">
        <label class="form-label">Course</label>
        <select
          v-model="form.course_id"
          class="form-select"
          required
          @change="fetchLevels"
        >
          <option disabled value="">Select Course</option>
          <option v-for="course in courses" :key="course.id" :value="course.id">
            {{ course.title }}
          </option>
        </select>
      </div>

      <!-- Course Level -->
      <div class="col-md-6">
        <label class="form-label">Course Level</label>
        <select v-model="form.course_level_id" class="form-select" required>
          <option disabled value="">Select Level</option>
          <option v-for="level in levels" :key="level.id" :value="level.id">
            {{ level.name }}
          </option>
        </select>
      </div>

      <!-- Instructor -->
      <div class="col-md-6">
        <label class="form-label">Instructor</label>
        <select v-model="form.instructor_id" class="form-select" required>
          <option disabled value="">Select Instructor</option>
          <option
            v-for="instructor in instructors"
            :key="instructor.id"
            :value="instructor.id"
          >
            {{ instructor.name }}
          </option>
        </select>
      </div>

      <!-- Start & End Dates -->
      <div class="col-md-6">
        <label class="form-label">Start Date</label>
        <input
          v-model="form.start_date"
          type="datetime-local"
          class="form-control"
          required
        />
      </div>

      <div class="col-md-6">
        <label class="form-label">End Date</label>
        <input
          v-model="form.end_date"
          type="datetime-local"
          class="form-control"
          required
        />
      </div>

      <!-- Start & End Times -->
      <div class="col-md-6">
        <label class="form-label">Start Time</label>
        <input
          v-model="form.start_time"
          type="time"
          class="form-control"
          required
        />
      </div>

      <div class="col-md-6">
        <label class="form-label">End Time</label>
        <input
          v-model="form.end_time"
          type="time"
          class="form-control"
          required
        />
      </div>

      <!-- Max Students -->
      <div class="col-md-6">
        <label class="form-label">Max Students</label>
        <input
          v-model="form.max_students"
          type="number"
          class="form-control"
          required
        />
      </div>

      <!-- Days -->
      <div class="col-md-12">
        <label class="form-label d-block">Select Days</label>
        <div
          class="form-check form-check-inline"
          v-for="day in daysOptions"
          :key="day"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :value="day"
            v-model="form.days"
            :id="`day-${day}`"
          />
          <label class="form-check-label" :for="`day-${day}`">{{ day }}</label>
        </div>
      </div>

      <!-- Submit -->
      <div class="col-12 mt-3">
        <button type="submit" class="btn btn-primary w-100 py-2">
          <i class="bi bi-plus-circle"></i> Create Group
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/axios";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  name: "",
  course_id: "",
  instructor_id: "",
  course_level_id: "",
  start_date: "",
  end_date: "",
  start_time: "",
  end_time: "",
  days: [],
  max_students: ""
});

const daysOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const courses = ref([]);
const levels = ref([]);
const instructors = ref([]);

const fetchCourses = async () => {
  const res = await api.get("/courses");
  courses.value = res.data;
};

const fetchLevels = async () => {
  form.value.course_level_id = ""; // reset level
  if (!form.value.course_id) return;

  const res = await api.get(`/courses/${form.value.course_id}/levels`);
  levels.value = res.data;
};

const fetchInstructors = async () => {
  const res = await api.get("/instructors");
  instructors.value = res.data.instructors.data;
  console.log();
};

onMounted(() => {
  fetchCourses();
  fetchInstructors();
});

const submitForm = async () => {
  try {
    const payload = {
      ...form.value,
      days: form.value.days
    };

    await api.post("/groups", payload);
    alert("Group created successfully!");
    // router.push({ name: "GroupsList" });
  } catch (err) {
    console.log(err.response.status);
    
    if (err.response.status === 409 ) {
      window.location.href = err.response.data.redirect_url;
    }
    alert("Something went wrong.");
  }
};
</script>

<style scoped>
label {
  font-weight: 500;
}
h3 {
  border-bottom: 2px solid #c65020;
  padding-bottom: 0.5rem;
}
</style>
