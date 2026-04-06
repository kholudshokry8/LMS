<template>
  <div class="mt-2">
    <div v-if="alert.message" :class="['alert', `alert-${alert.type}`]" role="alert">
      {{ alert.message }}
    </div>

    <div class="d-flex flex-row justify-content-between align-items-center flex-wrap mb-3">
      <h1>Categories List</h1>
      <RouterLink
        to="/categories/create"
        class="btn btn-success d-flex align-items-center gap-2"
      >
        <i class="bi bi-plus-lg"></i> Create
      </RouterLink>
    </div>

    <BaseLoading v-if="store.loading" />

    <div v-else>
      <BaseTable :columns="['id','name','actions']" :data="store.categories">
        <template #actions="{ row }">
          <button class="btn btn-sm btn-primary me-1" @click="editCategory(row)">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger" @click="deleteCategory(row)">
            <i class="bi bi-trash"></i>
          </button>
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCategoryStore } from "../store/categoryStore";
import { useRouter } from "vue-router";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseLoading from "@/components/base/BaseLoading.vue";

const store = useCategoryStore();
const router = useRouter();
const alert = ref({ message: "", type: "" });

const editCategory = (row) => {
  router.push(`/categories/edit/${row.id}`);
};

const deleteCategory = async (row) => {
  if (confirm(`Are you sure you want to delete "${row.name}"?`)) {
    try {
      await store.deleteCategory(row.id);
      alert.value = { message: `✅ Category "${row.name}" deleted successfully!`, type: "success" };
      setTimeout(() => (alert.value = { message: "", type: "" }), 3000);
    } catch {
      alert.value = { message: "❌ Failed to delete category.", type: "danger" };
    }
  }
};

onMounted(() => store.fetchCategories());
</script>

<style scoped>
/* تنسيق عمود ID */
.category-table table td:nth-child(1),
.category-table table th:nth-child(1) {
  width: 60px;
  text-align: center;
  vertical-align: middle;
}

/* تنسيق عمود Name */
.category-table table td:nth-child(2),
.category-table table th:nth-child(2) {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  font-weight: 500;
}

/* تنسيق عمود Actions */
.category-table table td:nth-child(3),
.category-table table th:nth-child(3) {
  width: 140px;
  text-align: center;
  vertical-align: middle;
}

/* تنسيق أزرار الأكشن */
.category-table table td .btn {
  margin: 0 2px;
  padding: 4px 10px;
  font-size: 0.75rem;
}

</style>