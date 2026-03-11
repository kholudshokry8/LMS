<template>
<div v-if="alert.message" :class="['alert', `alert-${alert.type}`]" role="alert">
  {{ alert.message }}
</div>

  <div class="mt-2">
    <div class="d-flex flex-row justify-content-between align-items-center flex-wrap">
      <div class="title">
        <h1> Categories List</h1>
      </div>
      <div class="buttons">
              <RouterLink
  type="button"
  class="btn btn-success d-flex align-items-center gap-2"
  to="/categories/create"
>
  <i class="bi bi-plus-lg"></i>
  Create
</RouterLink>
      </div>
    </div>
    <BaseLoading v-if="store.loading" />
    <div v-else>
      <BaseTable
        :columns="['id','' ,'','name','']"
        :data="store.categories"
        :actions="{  edit: true, delete: true }"
        @edit="editCategory"
        @delete="deleteCategory"
        class="category-table"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted , ref} from "vue";
import { useRouter } from "vue-router";
import { useCategoryStore } from "../store/categoryStore";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseLoading from "@/components/base/BaseLoading.vue";
const alert = ref({ message: "", type: "" });
const router = useRouter();
const store = useCategoryStore();

const showCategory = (category) => {
  alert(`Showing category: ${category.name}`);
};

const editCategory = (category) => {
  router.push(`/categories/edit/${category.id}`);
};

const deleteCategory = async (category) => {
  if (confirm(`Are you sure you want to delete ${category.name}?`)) {
    try {
      await store.deleteCategory(category.id);
      alert.value = {
        message: `✅ Category "${category.name}" deleted successfully!`,
        type: "success",
      };

      // اختياري: إخفاء التنبيه بعد 3 ثواني
      setTimeout(() => {
        alert.value = { message: "", type: "" };
      }, 3000);
    } catch (error) {
      alert.value = {
        message: "❌ Failed to delete category.",
        type: "danger",
      };
    }
  }
};


onMounted(() => {
  store.fetchCategories();
});
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