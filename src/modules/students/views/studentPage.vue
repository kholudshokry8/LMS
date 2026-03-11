<template>
  <div class="container mt-5 pt-3">
    <!-- <h1 class="heading-custom">All Students</h1> -->

    <div class="header-and-button">
      <h2>Student List</h2>
      <!-- <router-link to="/students/form" class="btn btn-success custom-button-add btn-lg">
        <i class="bi bi-plus-circle-fill"></i> Create
      </router-link> -->
      <router-link
  to="/students/form"
  class="btn btn-success d-flex align-items-center gap-2"
>
  <i class="bi bi-plus-lg"></i>
  Create
</router-link>

    </div>

    <div v-if="loading" class="text-center text-primary">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p>Loading students…</p>
    </div>
    <div v-else-if="error" class="alert alert-danger text-center">
      <p>{{ error }}</p>
      <button @click="fetchStudents" class="btn btn-warning mt-2">Retry Loading</button>
    </div>
    
    <div v-else>
      <BaseTable 
        :columns="columns"
        :data="students"
        :actions="actions"
        @edit="handleEdit"
        @delete="handleDelete"
        @show="handleShow"
      />
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStudentsStore } from '../store/studentStore.js';
import { storeToRefs } from 'pinia';
import BaseTable from '@/components/base/BaseTable.vue'; 


const router = useRouter();

const studentsStore = useStudentsStore();


const { students, loading, error } = storeToRefs(studentsStore);
const { fetchStudents, deleteStudent } = studentsStore; 

const columns = ref(['id', 'name', 'phone', 'course']);

const actions = ref({
  show: true,
  edit: true,
  delete: true,
});

const loadStudents = async () => {
  await fetchStudents();
};


onMounted(() => {
  loadStudents();
});

const handleEdit = (student) => {
  router.push(`/students/form/${student.id}`);
};

const handleDelete = async (student) => {
  if (confirm(`Are you sure you want to delete student ${student.name}?`)) {
    await deleteStudent(student.id);
    await loadStudents();
  }
};

const handleShow = (student) => {
  router.push(`/students/${student.id}`);
};
</script>

<style scoped>
.container {
  max-width: 1200px; 
}

.heading-custom {
  color: #D65622;
  margin-bottom: 10px; 
  text-align: left;
  font-weight: bolder;
  font-size: 40px;
}

.header-and-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h2 {
  color: #D65622;
  margin: 0;
  text-align: left;
  font-weight: bolder;
  font-size: 35px;
}

.custom-button-add {
  background-color: #d6031f; 
  border-color: #d6031f;
  font-size: 18px;
  padding: 10px 25px;
  border-radius: 8px; 
  white-space: nowrap;
}

.loading-text {
  margin-top: 15px;
  font-size: 1.2rem;
  color: #D65622;
}

.error-message {
  margin-top: 20px;
  padding: 20px;
  font-size: 1.1rem;
  color: #721c24; 
  background-color: #f8d7da; 
  border-color: #f5c6cb;
  border-radius: 8px;
}
</style>