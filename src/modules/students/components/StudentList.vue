<template>
  <div class="student-list">
    <div class="header d-flex justify-content-between mb-3">
      <h1>Student List</h1>
    </div>

    <BaseLoading v-if="loading" />
    <div v-else-if="error" class="text-red-600">{{ error }}</div>

    <div v-else>
      <BaseTable :columns="['id','name','gender','phone','city','course','group','age','actions']" :data="students">
        <template #actions="{ row }">
          <button class="btn btn-sm btn-info me-1" @click="viewStudent(row)">
            <i class="bi bi-eye"></i>
          </button>
          <button class="btn btn-sm btn-primary me-1" @click="editStudent(row)">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger" @click="deleteStudent(row)">
            <i class="bi bi-trash"></i>
          </button>
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStudentsStore } from "../store/studentStore";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseLoading from "@/components/base/BaseLoading.vue";

const router = useRouter();
const store = useStudentsStore();
const { students, loading, error } = store;

onMounted(() => store.fetchStudents());

const viewStudent = (row) => router.push(`/students/${row.id}`);
const editStudent = (row) => router.push(`/students/form/${row.id}`);
const deleteStudent = async (row) => {
  if (confirm(`Are you sure you want to delete "${row.name}"?`)) {
    await store.deleteStudent(row.id);
    await store.fetchStudents();
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