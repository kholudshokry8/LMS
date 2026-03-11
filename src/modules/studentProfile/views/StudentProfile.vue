<template>
<div v-if="alertMessage" class="alert alert-dismissible fade show mt-3" :class="'alert-' + alertType" role="alert">
  {{ alertMessage }}
</div>
  <div class="student-profile" v-if="!loading">
    <!-- تنبيه Bootstrap -->

    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
      <h2 class="fw-bold text-primary mb-0">👩‍🎓 Student Profile</h2>
      <!-- زر الجلسة القادمة -->
<button class="btn next-session-btn" @click="goToNextSession">
  <i class="bi bi-calendar-event me-2"></i>
  🚀 Next Session
</button>




    </div>

    <!-- Stats -->
    <div class="row g-4 justify-content-center mb-5">
      <div class="col-md-3 col-sm-6" v-for="stat in studentStats" :key="stat.title">
        <div class="stat-card text-center">
          <div class="icon-wrapper mb-3">
            <i :class="stat.icon"></i>
          </div>
          <h4 class="fw-bold mb-1">{{ stat.value }}</h4>
          <p class="text-muted mb-0">{{ stat.title }}</p>
        </div>
      </div>
    </div>

    <!-- Student Info -->
    <div class="row align-items-center mb-5">
      <div class="col-md-4 text-center">
        <img
          :src="student.image || 'https://via.placeholder.com/300x300.png?text=Student+Image'"
          alt="Student Image"
          class="img-fluid rounded-circle shadow-sm mb-3 student-image"
        />
        <h5 class="fw-bold mt-3">{{ student.name }}</h5>
        <p class="text-muted">{{ student.language || 'English' }} Speaker</p>
      </div>
      <div class="col-md-8">
        <div class="info-box">
          <div class="row mb-2">
            <div class="col-sm-6"><strong>📧 Email:</strong> {{ student.email }}</div>
            <div class="col-sm-6"><strong>📞 Phone:</strong> {{ student.phone }}</div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-6"><strong>🎂 Age:</strong> {{ student.age || 'N/A' }}</div>
            <div class="col-sm-6"><strong>🧠 Bio:</strong> {{ student.bio || 'N/A' }}</div>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-5 rainbow-divider" />

    <!-- Groups -->
    <GroupCards :groups="groups" />
  </div>

  <div v-else class="text-center my-5">
    <h4>⏳ Loading student data...</h4>
  </div>
</template>

<script setup>
import { onMounted  , ref} from "vue";
import { storeToRefs } from "pinia";
import { useStudentStore } from "../store/studentStore";
import GroupCards from "../components/GroupDetails.vue";
import { getNextSession } from '../services/studentService';

const studentStore = useStudentStore();
const { student, studentStats, groups, loading } = storeToRefs(studentStore);
const alertMessage = ref('');
const alertType = ref('');

function showAlert(message, type = 'warning') {
  alertMessage.value = message;
  alertType.value = type;
  setTimeout(() => (alertMessage.value = ''), 3000);
}

const goToNextSession = async () => {
  try {
    const res = await getNextSession();
    const session = res.data?.data;

    if (!session) {
      showAlert("🚫 No upcoming sessions found.", "warning");
    } else {
      router.push({ name: 'GroupSessions', params: { groupId: session.group_id } });
    }
  } catch (err) {
    console.error("❌ Error fetching next session", err);
    showAlert("❌ Failed to load next session.", "danger");
  }
};

onMounted(() => {
  studentStore.fetchStudentData();
});
</script>

<style scoped>
.student-profile {
  background-color: #fffdf5;
  padding: 2rem 1rem;
  border-radius: 20px;
  font-family: 'Comic Neue', cursive, 'Segoe UI', sans-serif;
  max-width: 1100px;
  margin: auto;
}

.next-session-btn {
  background-color: #e18922;
  color: #fff;
  font-weight: bold;
  border-radius: 30px;
  padding: 0.6rem 1.5rem;
  transition: background 0.3s;
}
.next-session-btn:hover {
  background-color: #cf771c;
}

.stat-card {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 16px;
  border: 2px solid #ffd966;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.stat-card:hover {
  transform: scale(1.05);
}

.icon-wrapper {
  background-color: #f0f8ff;
  color: #e18922;
  width: 60px;
  height: 60px;
  font-size: 1.8rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border: 2px dashed #e18922;
}

.student-image {
  border: 5px solid #ffd966;
  width: 220px;
  height: 220px;
  object-fit: cover;
}

.info-box {
  background: #fff;
  padding: 1.5rem;
  border-radius: 16px;
  border: 2px solid #eaeaea;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  font-size: 1rem;
}

.rainbow-divider {
  height: 5px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(to right, #ff9a9e, #fad0c4, #fad0c4, #fbc2eb, #a18cd1);
}
</style>
