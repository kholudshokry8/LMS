<template>
  <div class="student-list">
    <div class="header">
      <h1>Student List</h1>
      <!-- <router-link to="/students/form" class="btn btn-danger"><h4>Create</h4></router-link> -->
    </div>

    <BaseLoading v-if="loading" />

    <div v-else-if="error" class="text-red-600">{{ error }}</div>

    <div v-else>
      <BaseTable
        :columns="columns"
        :data="students"
        :key="students.length"
        :actions="{ show: true, edit: true, delete: true }"
        @edit="editStudent"

        @delete="deleteStudentHandler"

      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseLoading from '../../../components/base/BaseLoading.vue';
import { useStudentsStore } from '../store/studentStore'; 
const router = useRouter();
const store = useStudentsStore();

const { students, loading, error, fetchStudents, deleteStudent } = store;

const columns = ['id', 'name', 'gender', 'phone', 'city', 'course','group', 'age']; 



onMounted(() => {

  store.fetchStudents();

});

const editStudent = (student) => {
  router.push(`/students/form/${student.id}`);
};

const deleteStudentHandler = async (row) => {
  const confirmed = confirm(`Are you sure you want to delete ${row.name}?`);
  if (confirmed) {

    await store.deleteStudent(student.id);

  }
};
</script>

<style scoped>
.student-list {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  margin: 0;
}

.btn {
  display: inline-block;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-danger {
  background-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
}

.text-red-600 {
  color: #dc2626;
  margin-top: 10px;
}
</style>