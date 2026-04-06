<template>
  <div class="mt-2">
    <div class="d-flex flex-row justify-content-between align-items-center flex-wrap">
      <div class="title">
        <h1>Instructor List</h1>
      </div>

      <div class="buttons d-flex flex-row gap-2">
        <button
          type="button"
          class="btn btn-success d-flex align-items-center gap-2"
          @click="goToCreateInstructor"
        >
          <i class="bi bi-plus-lg"></i>
          Create
        </button>
      </div>
    </div>

    <BaseLoading v-if="store.loading" />

    <div v-else>
      <!-- Alert -->
      <div v-if="alertMessage" class="alert" :class="`alert-${alertType}`">
        {{ alertMessage }}
      </div>

      <!-- Table -->
      <BaseTable
        :columns="['name', 'email', 'phone', 'specialization', 'linkedin', 'actions']"
        :data="preparedInstructors"
      >
        <!-- ✅ Actions Slot -->
        <template #actions="{ row }">
          <button
            class="btn btn-sm btn-info me-1"
            @click="viewInstructor(row)"
          >
            <i class="bi bi-eye"></i>
          </button>

          <button
            class="btn btn-sm btn-primary me-1"
            @click="editInstructor(row)"
          >
            <i class="bi bi-pencil"></i>
          </button>

          <button
            class="btn btn-sm btn-danger"
            @click="deleteInstructor(row)"
          >
            <i class="bi bi-trash"></i>
          </button>
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useInstructorsStore } from "../store/instructorsStore";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseLoading from "@/components/base/BaseLoading.vue";

const store = useInstructorsStore();
const router = useRouter();

const alertMessage = ref("");
const alertType = ref("success");
let alertTimeout = null;

const showAlert = (message, type = "success", duration = 3000) => {
  alertMessage.value = message;
  alertType.value = type;

  if (alertTimeout) clearTimeout(alertTimeout);
  alertTimeout = setTimeout(() => {
    alertMessage.value = "";
  }, duration);
};

// ✅ تجهيز البيانات للعرض
const preparedInstructors = computed(() => {
  return store.instructors.map((inst) => ({
    id: inst.id,
    name: inst.name,
    email: inst.email,
    phone: inst.phone,
    specialization: inst.instructor?.specialization || "N/A",
    linkedin: inst.instructor?.linkedin
      ? `<a href="${inst.instructor.linkedin}" target="_blank">LinkedIn</a>`
      : "N/A",
  }));
});

// ✅ Actions
const viewInstructor = (instructor) => {
  router.push(`/instructors/${instructor.id}`);
};

const editInstructor = (instructor) => {
  router.push(`/edit-instructor/${instructor.id}`);
};

const deleteInstructor = async (instructor) => {
  if (!confirm(`Are you sure you want to delete ${instructor.name}?`)) return;

  try {
    await store.deleteInstructor(instructor.id);
    await store.fetchInstructors();

    showAlert(
      `Instructor ${instructor.name} has been deleted successfully.`,
      "success"
    );
  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      if (status === 404) {
        showAlert(
          "❌ Instructor not found. It may have already been deleted.",
          "danger"
        );
      } else if (status === 403) {
        showAlert(
          "🚫 You are not authorized to delete this instructor.",
          "danger"
        );
      } else if (status === 422) {
        showAlert(
          `❗ Validation error: ${error.response.data?.message}`,
          "danger"
        );
      } else {
        showAlert(
          `⚠️ Server error: ${
            error.response.data?.message || "Unexpected error."
          }`,
          "danger"
        );
      }
    } else {
      showAlert("❌ Network error. Please try again.", "danger");
    }

    console.error("❌ Delete error:", error);
  }
};

const goToCreateInstructor = () => {
  router.push("/create-instructor");
};

// ✅ تحميل البيانات
onMounted(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
  } else {
    store.fetchInstructors();
  }
});
</script>