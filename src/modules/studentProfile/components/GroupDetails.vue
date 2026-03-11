<template>
  <div class="container mt-5">
    <h4 class="mb-4 text-secondary">Groups</h4>
    <div class="row">
      <div
        v-for="group in groups"
        :key="group.id"
        class="col-lg-4 col-md-6 col-sm-12"
      >
        <div class="group-card" @click="goToGroupDetails(group.id)">
          <div class="card-header d-flex justify-content-between align-items-center mb-2">
            <h5 class="group-name mb-0">{{ group.name }}</h5>
            <span class="badge bg-primary">{{ group.courseName }}</span>
          </div>
          <p class="text-muted mb-1">
            <i class="bi bi-person-circle me-2"></i>
            Instructor: {{ group.instructor }}
          </p>
          <p class="mb-2">
            <strong>Sessions:</strong> {{ group.attendedSessions }} / {{ group.totalSessions }}
          </p>
          <div class="progress" style="height: 8px;">
            <div
              class="progress-bar bg-success"
              role="progressbar"
              :style="{ width: attendancePercentage(group) + '%' }"
            ></div>
          </div>
          <p class="mt-2 small text-muted">
            Progress: {{ attendancePercentage(group) }}%
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { defineProps } from "vue";

const props = defineProps({
  groups: {
    type: Array,
    required: true
  }
});

const router = useRouter();

const goToGroupDetails = (groupID) => {
  router.push(`/student/group/${groupID}`);
};

const attendancePercentage = (group) => {
  return group.totalSessions > 0
    ? Math.round((group.attendedSessions / group.totalSessions) * 100)
    : 0;
};
</script>

<style scoped>
.group-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s;
  cursor: pointer;
}
.group-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
.group-name {
  font-size: 1.3rem;
  color: #2c3e50;
}
</style>
