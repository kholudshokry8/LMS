<template>
  <div class="container mt-5 pt-3">
    <div v-if="loading" class="text-center text-primary">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p>Loading student details...</p>
    </div>

    <div v-else-if="currentStudent">
      <h2 class="profile-heading">Student Profile</h2>

      <div class="row mb-5 align-items-center">
        <div class="col-md-4 text-center">
          <div class="student-avatar">
<img
  :src="currentStudent.image || '/unknown-profile.png'"
  alt="Student Profile"
  class="img-fluid rounded-circle"
  style="width: 100%; height: 100%; object-fit: cover;"
/>

</div>

          <!-- <div class="student-avatar">
            <i class="bi bi-person-circle"></i>
          </div> -->
          <h3 class="student-name mt-3">{{ currentStudent.name }}</h3>
        </div>

        <div class="col-md-8">
          <div class="student-info-grid">
            <div class="info-item"><strong>Email:</strong> {{ currentStudent.email }}</div>
            <div class="info-item"><strong>Phone:</strong> {{ currentStudent.phone }}</div>
            <div class="info-item"><strong>Status:</strong> {{ currentStudent.status }}</div>
            <div class="info-item"><strong>Role:</strong> {{ currentStudent.role }}</div>
            <div class="info-item"><strong>Parent Name:</strong> {{ currentStudent.parent.name }}</div>
            <div class="info-item"><strong>Parent Phone:</strong> {{ currentStudent.parent.phone }}</div>
            <!-- <div class="info-item" v-if="currentStudent.parent_id"><strong>Parent ID:</strong> {{ currentStudent.parent_id }}</div> -->
          </div>
        </div>
      </div>

      <div class="student-groups mt-5">
        <h4 class="text-primary mb-3">Student Groups</h4>
        <table class="table table-hover table-bordered">
          <thead class="table-light">
            <tr>
              <th>#</th>
              <th>Group Name</th>
              <th>Course</th>
              <th>Instructor</th>
              <th>Price</th>
              <th>Start Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(group, index) in studentGroups" :key="group.id">
              <td>{{ index + 1 }}</td>
              <td>{{ group.name }}</td>
              <td>{{ group.course?.title || '—' }}</td>
              <td>{{ group.instructor?.name || '—' }}</td>
              <td>{{ group.course?.price || '—' }}</td>
              <td>{{ group.start_date?.split(' ')[0] || '—' }}</td>
            </tr>
            <tr v-if="studentGroups.length === 0">
              <td colspan="6" class="text-center">No groups assigned.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="text-center mt-4">
        <router-link to="/students" class="btn btn-outline-secondary btn-lg">Back to List</router-link>
      </div>
    </div>

    <div v-else class="alert alert-warning text-center">
      <p>Student not found.</p>
      <router-link to="/students" class="btn btn-secondary btn-lg mt-3">Back to List</router-link>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStudentsStore } from "../store/studentStore";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const studentStore = useStudentsStore();
    const route = useRoute();
    const studentId = route.params.id;

    const { currentStudent, loading } = storeToRefs(studentStore);

    const studentGroups = computed(() => {
      return currentStudent.value?.student_groups || [];
    });

    onMounted(() => {
      studentStore.fetchStudentById(studentId);
    });

    return {
      currentStudent,
      loading,
      studentGroups,
    };
  },
};
</script>

<style scoped>
.profile-heading {
  text-align: center;
  color: #2c3e50;
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 40px;
}

.student-avatar {
  font-size: 120px;
  color: #D65622;
  background-color: #f8f9fa;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: 5px solid #D65622;
}

.student-name {
  color: #333;
  font-weight: 600;
}

.student-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  font-size: 18px;
  color: #444;
}

.student-info-grid strong {
  color: #D65622;
}

.student-groups h4 {
  font-weight: bold;
}

.table th,
.table td {
  vertical-align: middle;
}
</style>
