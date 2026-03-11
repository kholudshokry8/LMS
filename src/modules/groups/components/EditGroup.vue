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
          :value="group.days"
          class="form-control"
          disabled
        />
      </div>

      <button type="submit" class="btn btn-success">Save Changes</button>
    </form>

    <BaseLoading v-else />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/axios";
import BaseLoading from "@/components/base/BaseLoading.vue";

const route = useRoute();
const router = useRouter();

const group = ref(null);
const groupId = route.params.id;

onMounted(async () => {
  try {
    const response = await api.get(`/groups/${groupId}`);
    group.value = response.data;
  } catch (err) {
    console.error("Failed to load group:", err);
  }
});

const submitForm = async () => {
  try {
    await api.put(`/groups/${groupId}`, {
      name: group.value.name,
      max_students: group.value.max_students,
    });

    alert("Group updated successfully");
    router.push("/Groups");
  } catch (err) {
    console.error("Error updating group:", err);
    alert("Failed to update group");
  }
};
</script>
