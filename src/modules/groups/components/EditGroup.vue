<template>
  <div class="container py-4">
    <h2>Edit Group</h2>

    <form @submit.prevent="submitForm" v-if="group">
      <!-- Group Name -->
      <div class="mb-3">
        <label class="form-label">Group Name</label>
        <input v-model="group.name" class="form-control" required />
      </div>

      <!-- Max Students -->
      <div class="mb-3">
        <label class="form-label">Max Students</label>
        <input
          type="number"
          v-model="group.max_students"
          class="form-control"
          required
        />
      </div>

      <!-- Start Date (عرض فقط) -->
      <div class="mb-3">
        <label class="form-label">Start Date</label>
        <input
          type="text"
          :value="group.start_date"
          class="form-control"
          disabled
        />
      </div>

      <!-- End Date (عرض فقط) -->
      <div class="mb-3">
        <label class="form-label">End Date</label>
        <input
          type="text"
          :value="group.end_date"
          class="form-control"
          disabled
        />
      </div>

      <!-- Days (عرض فقط) -->
      <div class="mb-3">
        <label class="form-label">Days</label>
        <input
          type="text"
          :value="formattedDays"
          class="form-control"
          disabled
        />
      </div>

      <button type="submit" class="btn btn-success">
        Save Changes
      </button>
    </form>

    <BaseLoading v-else />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/axios";
import BaseLoading from "@/components/base/BaseLoading.vue";

const route = useRoute();
const router = useRouter();

const group = ref(null);
const groupId = route.params.id;

// =====================
// Load Data
// =====================
onMounted(async () => {
  try {
    const response = await api.get(`/groups/${groupId}`);
    group.value = response.data;
  } catch (err) {
    console.error("Failed to load group:", err);
  }
});

// =====================
// Computed
// =====================
const formattedDays = computed(() => {
  try {
    return group.value?.days
      ? JSON.parse(group.value.days).join(", ")
      : "Not Set";
  } catch {
    return "Not Set";
  }
});

// =====================
// Submit
// =====================
const submitForm = async () => {
  try {
    await api.put(`/groups/${groupId}`, {
      name: group.value.name,
      max_students: group.value.max_students,

      // 👇 required fields
      course_id: group.value.course_id,
      start_date: group.value.start_date,
      end_date: group.value.end_date,
      start_time: group.value.start_time,
      end_time: group.value.end_time,

      // 👇 تحويل days لـ array
      days: JSON.parse(group.value.days),
    });

    alert("Group updated successfully");
    router.push("/Groups");
  } catch (err) {
    console.error("Error updating group:", err);
    alert("Failed to update group");
  }
};
</script>