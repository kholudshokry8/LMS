<template>
  <div class="container py-5">
    <!-- Parent Profile Section -->
    <div v-if="parent" class="card shadow-sm mb-4">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div class="parent-avatar me-4">
            <i class="bi bi-person-badge"></i>
          </div>
          <div>
            <h3 class="fw-bold mb-1">{{ parent.name }}</h3>
            <p class="text-muted mb-1">
              <i class="bi bi-envelope me-2"></i>{{ parent.email }}
            </p>
            <p class="text-muted">
              <i class="bi bi-telephone me-2"></i>{{ parent.phone }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Children Section -->
    <h2 class="text-center fw-bold text-primary mb-4">My Children</h2>

    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading children data...</p>
    </div>

    <div v-else>
      <div v-if="hasChildren" class="row g-4">
        <div v-for="child in children" :key="child.id" class="col-md-4">
          <div class="card h-100 border-0 shadow-sm rounded-4 hover-effect">
            <div class="card-body text-center">
              <div class="child-avatar mx-auto mb-3">
                <i class="bi bi-person-circle"></i>
              </div>
              <h5 class="fw-bold">{{ child.name }}</h5>
              <div class="child-details">
               <p class="text-muted mb-1" v-if="child.age">
  <i class="bi bi-calendar me-1"></i> Age: {{ child.age }}
</p>
<p class="text-muted mb-1" v-if="child.course">
  <i class="bi bi-book me-1"></i> Course: {{ child.course }}
</p>
<p class="text-muted mb-3" v-if="child.attendance">
  <i class="bi bi-clipboard-check me-1"></i>
  Attendance: {{ child.attendance }}
</p>

              </div>
         <RouterLink
  :to="`/parentProfile/${child.id}`"
  class="btn btn-outline-primary btn-sm"
>
  <i class="bi bi-eye me-1"></i> View Details
</RouterLink>

            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-5">
        <div class="empty-state">
          <i class="bi bi-people display-5 text-muted mb-3"></i>
          <h5 class="text-muted">No children found</h5>
          <p class="text-muted small">Please contact support if this is unexpected</p>
          <button 
            @click="fetchData" 
            class="btn btn-sm btn-outline-secondary mt-2"
          >
            <i class="bi bi-arrow-repeat me-1"></i> Retry
          </button>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useParentStore } from '../store/parentStore';
import { RouterLink } from 'vue-router';

const store = useParentStore();
const { fetchChildDetails, fetchParentWithChildren } = store;

const parent = computed(() => store.parent);
const children = computed(() => store.children);
const loading = computed(() => store.loading);

const hasChildren = computed(() => children.value.length > 0);

onMounted(() => {
  
  console.log("✅ ParentProfile.vue is mounted");

  console.log("👀 mounted: calling fetchParentWithChildren");
  fetchParentWithChildren().then(() => {
    console.log("✅ children after fetch:", children.value);
  });
});
</script>




<style scoped>
.parent-avatar {
  font-size: 3.5rem;
  color: #0d6efd;
}

.child-avatar {
  font-size: 3rem;
  color: #6c757d;
}

.hover-effect {
  transition: all 0.3s ease;
  cursor: pointer;
}

.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.empty-state {
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
}

.rounded-4 {
  border-radius: 1rem !important;
}

.child-details {
  min-height: 80px;
}
</style>