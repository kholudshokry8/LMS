<template>
  <div class="container mt-5 pt-3">

    <!-- Header -->
    <div class="header-and-button">
      <h2>Student List</h2>

      <router-link
        to="/students/form"
        class="btn btn-success d-flex align-items-center gap-2"
      >
        <i class="bi bi-plus-lg"></i>
        Create
      </router-link>
    </div>

    <!-- 🔍 Search -->
    <div class="row mb-3">
      <div class="col-md-4">

        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Search student by name or phone..."
        />

      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center text-primary">

      <div class="spinner-border"></div>

      <p>Loading students…</p>

    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="alert alert-danger text-center"
    >

      <p>{{ error }}</p>

      <button
        @click="loadStudents"
        class="btn btn-warning mt-2"
      >
        Retry Loading
      </button>

    </div>

    <!-- Table -->
    <div v-else>

      <BaseTable 
        :columns="columns"
        :data="students"
        :actions="actions"
        @edit="handleEdit"
        @delete="handleDelete"
        @show="handleShow"
      />

      <!-- 📄 Pagination -->
      <nav
        v-if="totalPages > 1"
        class="d-flex justify-content-center mt-4"
      >

        <ul class="pagination">

          <!-- Previous -->

          <li
            class="page-item"
            :class="{ disabled: currentPage === 1 }"
          >

            <button
              class="page-link"
              @click="changePage(currentPage - 1)"
            >
              Previous
            </button>

          </li>

          <!-- Page Numbers -->

          <li
            v-for="page in visiblePages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
          >

            <button
              class="page-link"
              @click="changePage(page)"
            >
              {{ page }}
            </button>

          </li>

          <!-- Next -->

          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >

            <button
              class="page-link"
              @click="changePage(currentPage + 1)"
            >
              Next
            </button>

          </li>

        </ul>

      </nav>

    </div>

  </div>
</template>

<script setup>

import {
  onMounted,
  ref,
  computed,
  watch
} from 'vue';

import { useRouter } from 'vue-router';

import {
  useStudentsStore
} from '../store/studentStore.js';

import { storeToRefs } from 'pinia';

import BaseTable from '@/components/base/BaseTable.vue'; 

const router = useRouter();

const studentsStore = useStudentsStore();

const {
  students,
  loading,
  error
} = storeToRefs(studentsStore);

const {
  fetchStudents,
  deleteStudent
} = studentsStore;

/* Table */

const columns = ref([
  'id',
  'name',
  'phone',
  'course'
]);

const actions = ref({
  show: true,
  edit: true,
  delete: true,
});

/* 🔍 Search */

const searchQuery = ref('');

/* 📄 Pagination */

const currentPage = ref(1);

const perPage = 20;

const totalPages = ref(1);

/* Load Students */

const loadStudents = async () => {

const params = {

  page: currentPage.value,

  per_page: perPage,

  query: searchQuery.value

};

  const response =
    await fetchStudents(params);

  /* ✅ هنا التعديل الحقيقي */

  if (response?.pagination) {

    totalPages.value =
      response.pagination.last_page;

  }

};

/* 🔍 Debounced Search */

let timeout = null;

watch(searchQuery, () => {

  clearTimeout(timeout);

  timeout = setTimeout(() => {

    currentPage.value = 1;

    loadStudents();

  }, 500);

});

/* 📄 Smart Pagination */

const visiblePages = computed(() => {

  const pages = [];

  let start =
    Math.max(
      currentPage.value - 2,
      1
    );

  let end =
    Math.min(
      start + 4,
      totalPages.value
    );

  for (
    let i = start;
    i <= end;
    i++
  ) {

    pages.push(i);

  }

  return pages;

});

/* Change Page */

const changePage = async (page) => {

  if (
    page < 1 ||
    page > totalPages.value
  ) return;

  currentPage.value = page;

  await loadStudents();

};

/* Actions */

const handleEdit = (student) => {

  router.push(
    `/students/form/${student.id}`
  );

};

const handleDelete = async (student) => {

  if (
    confirm(
      `Are you sure you want to delete student ${student.name}?`
    )
  ) {

    await deleteStudent(student.id);

    await loadStudents();

  }

};

const handleShow = (student) => {

  router.push(
    `/students/${student.id}`
  );

};

/* Mounted */

onMounted(() => {

  loadStudents();

});

</script>

<style scoped>

.container {
  max-width: 1200px; 
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

  font-weight: bolder;

  font-size: 35px;

}

/* Pagination */

.pagination .page-link {

  cursor: pointer;

}

.pagination .active .page-link {

  background-color: #D65622;

  border-color: #D65622;

}

</style>