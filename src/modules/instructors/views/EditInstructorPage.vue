
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import instructorsService from "../services/instructorsService";
import EditInstructorForm from "../components/EditInstructorForm.vue";

const route = useRoute();
const router = useRouter();

const editedInstructor = ref(null);

const fetchInstructor = async () => {
  try {
    const response = await instructorsService.getById(route.params.id);
    editedInstructor.value = response.instructor;
  } catch (err) {
    console.error("Error fetching instructor:", err);
    alert("Instructor not found");
    router.push("/instructors");
  }
};

onMounted(fetchInstructor);

const saveChanges = () => {
  router.push("/instructors");
};


const cancelEdit = () => {
  router.push("/instructors");
};
</script>

<template>
  <div class="instructor-container" v-if="editedInstructor">
    <EditInstructorForm
      :instructor="editedInstructor"
      @save="saveChanges"
      @cancel="cancelEdit"
    />
  </div>
</template>
