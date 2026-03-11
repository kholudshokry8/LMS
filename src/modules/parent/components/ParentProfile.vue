<template>
  <div class="dashboard-container">
    <!-- Loading Indicator -->
    <div v-if="loading" class="loading">Loading...</div>

    <!-- Statistics Section -->
    <div v-else>
      <div class="stats-grid">
        <div class="stat-card" v-for="(stat, index) in stats" :key="index">
          <h3>{{ stat.value }}</h3>
          <p>{{ stat.label }}</p>
        </div>
      </div>

      <!-- Children Cards -->
      <div class="children-grid">
        <div class="child-card" v-for="child in children" :key="child.id" @click="goToProfile(child.id)">
          <img :src="getImageUrl(child.image)" :alt="child.name" class="child-image" />
          <h4 class="child-name">{{ child.name }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStudentsStore} from "@/modules/students/store/studentStore.js";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

export default {
  setup() {
    const parentStore = useStudentsStore();
    const { stats, children, loading } = storeToRefs(parentStore);
    const { fetchParentData } = parentStore;
    const router = useRouter();

    onMounted(() => {
      fetchParentData();
    });

    const goToProfile = (childId) => {
      router.push(`/child-profile/${childId}`);
    };

    const getImageUrl = (imageName) => {
      return new URL(`../../../assets/parent/${imageName}`, import.meta.url).href;
    };

    return { stats, children, loading, goToProfile, getImageUrl };
  },
};
</script>

<style scoped>
/* Global Styling */
.dashboard-container {
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #F8FAFC, #E9EAF0);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #1D2026;
}

/* Loading Indicator */
.loading {
  font-size: 1.5rem;
  font-weight: bold;
  color: #E75D24;
  animation: fadeIn 1.2s infinite alternate;
}

/* Statistics Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  width: 100%;
  max-width: 900px;
}

.stat-card {
  background: white;
  padding: 2rem;
  text-align: center;
  border-radius: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  color: #1D2026;
  font-weight: bold;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.stat-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Children Grid */
.children-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1000px;
}

/* Child Cards */
.child-card {
  background: linear-gradient(135deg, #5A67D8, #7F9CF5);
  padding: 2rem;
  text-align: center;
  border-radius: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.child-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 10px 30px rgba(90, 103, 216, 0.3);
}

/* Child Image */
.child-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid white;
  margin-bottom: 1rem;
  transition: transform 0.3s ease-in-out;
}

.child-card:hover .child-image {
  transform: scale(1.1);
}

/* Child Name */
.child-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  text-transform: capitalize;
  letter-spacing: 1px;
}

/* Fade In Animation */
@keyframes fadeIn {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
</style>
