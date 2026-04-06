<template>
  <div class="mt-2">
    <!-- Header -->
    <div
      class="d-flex flex-row justify-content-between align-items-center flex-wrap mb-3 gap-2"
    >
      <div class="title">
        <h1>Group List</h1>
      </div>

      <div class="d-flex gap-2 flex-wrap">
        <!-- Search -->
        <input
          v-model="search"
          type="text"
          class="form-control"
          placeholder="Search groups..."
          style="width: 250px"
        />

        <!-- Create Button -->
        <button type="button" class="btn btn-primary" @click="goToCreate">
          Create
        </button>
      </div>
    </div>

    <!-- Loading -->
    <BaseLoading v-if="store.loading" />

    <!-- Table -->
    <div v-else>
      <BaseTable
        :columns="['name', 'course', 'date', 'days', 'studentsCount', 'actions']"
        :data="paginatedGroups"
      >
        <!-- ✅ Actions -->
        <template #actions="{ row }">
          <button
            class="btn btn-sm btn-info me-1"
            @click="showGroup(row)"
          >
            <i class="bi bi-eye"></i>
          </button>

          <button
            class="btn btn-sm btn-primary me-1"
            @click="editGroup(row)"
          >
            <i class="bi bi-pencil"></i>
          </button>

          <button
            class="btn btn-sm btn-danger"
            @click="deleteGroup(row)"
          >
            <i class="bi bi-trash"></i>
          </button>
        </template>
      </BaseTable>

      <!-- Pagination -->
      <div
        class="d-flex justify-content-center align-items-center mt-4"
        v-if="totalPages > 1"
      >
        <button
          class="btn btn-outline-primary mx-1"
          :disabled="page === 1"
          @click="page--"
        >
          Prev
        </button>

        <span class="mx-2">
          Page {{ page }} of {{ totalPages }}
        </span>

        <button
          class="btn btn-outline-primary mx-1"
          :disabled="page === totalPages"
          @click="page++"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useGroupsStore } from "../store/GroupsStore";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseLoading from "@/components/base/BaseLoading.vue";

const router = useRouter();
const store = useGroupsStore();

// =====================
// State
// =====================
const search = ref("");
const page = ref(1);
const perPage = 20;

// =====================
// Navigation
// =====================
const showGroup = (group) => {
  router.push({ name: "GroupDetails", params: { id: group.id } });
};

const editGroup = (group) => {
  if (group.id) {
    router.push({ name: "EditGroup", params: { id: group.id } });
  } else {
    console.warn("Group ID not found");
  }
};

const deleteGroup = async (group) => {
  if (!confirm(`Are you sure you want to delete ${group.name}?`)) return;

  try {
    await store.deleteGroup(group.id);
    await store.fetchGroups(); // 🔥 تحديث البيانات بعد الحذف
  } catch (error) {
    console.error("Delete error:", error);
  }
};

const goToCreate = () => {
  router.push({ name: "CreateGroup" });
};

// =====================
// Computed
// =====================

// Search
const filteredGroups = computed(() => {
  if (!search.value) return store.Groups;

  return store.Groups.filter((group) =>
    group.name?.toLowerCase().includes(search.value.toLowerCase())
  );
});

// Total Pages
const totalPages = computed(() => {
  return Math.ceil(filteredGroups.value.length / perPage) || 1;
});

// Pagination
const paginatedGroups = computed(() => {
  const start = (page.value - 1) * perPage;
  return filteredGroups.value.slice(start, start + perPage);
});

// Reset page on search
watch(search, () => {
  page.value = 1;
});

// =====================
// Lifecycle
// =====================
onMounted(() => {
  store.fetchGroups();
});
</script>