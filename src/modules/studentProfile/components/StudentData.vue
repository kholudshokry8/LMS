<template>
  <div class="student-section">
    <!-- Edit Button -->
    <button class="edit-btn" @click="goToEditPage">
      <i class="bi bi-pencil-square"></i>
    </button>

    <!-- Student Info -->
    <div class="student-info" v-if="store.student">
      <h2>{{ store.student.name }}</h2>
      <p><strong>Email:</strong> {{ store.student.email }}</p>
      <p><strong>Phone:</strong> {{ store.student.phone }}</p>
      <p><strong>Parent Phone:</strong> {{ store.student.parentPhone }}</p>
      <p><strong>Parent Email:</strong> {{ store.student.parentEmail }}</p>
    </div>

    <p v-else>Loading student data...</p>
  </div>
</template>

<script>
import { useStudentStore } from "../store/studentStore";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStudentStore();
    const router = useRouter();

    onMounted(() => {
      store.fetchStudentData();
    });

    const goToEditPage = () => {
      router.push("/edit-student");
    };

    return { store, goToEditPage };
  }
};
</script>

<style scoped>
.student-section {
  width: 100%;
  /* max-width: 800px; */
  margin: 5vh auto;
  padding: 3rem;
  background-color: #f9f9f9;
  border: 2px solid #ccc;
  border-radius: 1rem;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Edit Button */
.edit-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.edit-btn:hover {
  transform: scale(1.2);
  color: #e75d24;
}

/* Student Info */
.student-info h2 {
  font-size: 2rem;
  color: #4e5566;
}

.student-info p {
  font-size: 1.2rem;
  margin: 0.5rem 0;
  color: #333;
}

/* Responsive */
@media (max-width: 768px) {
  .student-section {
    padding: 2rem;
  }

  .student-info h2 {
    font-size: 1.8rem;
  }

  .student-info p {
    font-size: 1rem;
  }
}
</style>
