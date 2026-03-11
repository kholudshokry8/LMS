<template>
  <div class="container py-5">
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else>
      <h3 class="mb-4">{{ child?.name }}'s Groups</h3>

      <table class="table table-bordered" v-if="groups.length > 0">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th>Group</th>
            <th>Course</th>
            <th>Start Date</th>
            <th>Attendance %</th>
            <th>Tasks %</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(group, index) in groups" :key="group.id">
            <td>{{ index + 1 }}</td>
            <td>{{ group.name }}</td>
            <td>{{ group.course }}</td>
            <td>{{ group.startDate }}</td>
            <td>{{ group.attendance }}</td>
            <td>{{ group.tasks }}</td>
            <td>
              <router-link
                :to="`/parentProfile/${child.id}/${group.id}`"
                class="btn btn-sm btn-outline-info"
              >
                Details
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="text-center text-muted mt-4">
        No groups found for this child.
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useParentStore } from "../store/parentStore";
import { storeToRefs } from "pinia";

const store = useParentStore();
const route = useRoute();

// ✅ make reactive references
const { loading, child, groups, groupDetails } = storeToRefs(store);

// ✅ Fetch data on mount
onMounted(async () => {
  console.log("📦 Loading child details:", route.params.childId);
  await store.fetchChildDetails(route.params.childId);
});

// ✅ Refetch if childId changes
watch(
  () => route.params.childId,
  async (newId) => {
    console.log("📦 Watching route param:", newId);
    await store.fetchChildDetails(newId);
  }
);
</script>
