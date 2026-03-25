<template>
  <div class="container py-4">

    <!-- Child Info -->
    <div class="mb-4 border-bottom pb-3">
      <h4 class="text-primary">
        <i class="bi bi-person-circle me-2"></i>
        Child Profile
      </h4>

      <h5 class="mt-3">{{ child?.name }}</h5>
      <p class="text-muted">{{ child?.email }}</p>
    </div>

    <!-- Groups -->
    <h5 class="text-primary mb-3">Groups</h5>

    <div v-if="loading" class="text-center">
      Loading...
    </div>

    <div v-else class="row">

      <div
       v-for="group in groups"
        :key="group.id"
        class="col-md-6 col-lg-4 mb-4"
      >
        <div class="card shadow-sm h-100">

          <div class="card-body">

            <p>
              <strong>Group:</strong>
              {{ group.name }}
            </p>

            <p>
              <strong>Course:</strong>
              {{ group.course }}
            </p>

            <p>
              <strong>Attendance:</strong>
              {{ group.attendance }}%
            </p>

            <p>
              <strong>Tasks:</strong>
              {{ group.tasks }}%
            </p>

            <router-link
              :to="`/parentProfile/${child.id}/${group.id}`"
              class="btn btn-outline-primary btn-sm"
            >
              <i class="bi bi-eye me-1"></i>
              View Details
            </router-link>

          </div>

        </div>
      </div>

    </div>

    <div v-if="!groups.length" class="text-center text-muted mt-4">
      No groups found for this child.
    </div>

  </div>
</template>
<script setup>
import { onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import { useParentStore } from "../store/parentStore"
import { storeToRefs } from "pinia"

const route = useRoute()
const store = useParentStore()

const { loading, child, groups } = storeToRefs(store)

onMounted(async () => {
  await store.fetchChildDetails(route.params.childId)
})

watch(
  () => route.params.childId,
  async (id) => {
    await store.fetchChildDetails(id)
  }
)
</script>