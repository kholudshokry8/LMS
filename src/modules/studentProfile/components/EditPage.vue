<template>
  <div class="edit-student-container">
    <h2>Edit Form</h2>

    <form @submit.prevent="saveChanges">
      <!-- Student Name (Editable) -->
      <div class="form-group">
        <label for="name">Student Name:</label>
        <input type="text" id="name" v-model="editableStudent.name" required />
      </div>

      <!-- Phone Number (Editable) -->
      <div class="form-group">
        <label for="phone">Phone Number:</label>
        <input type="text" id="phone" v-model="editableStudent.phone" required />
      </div>

      <!-- Read-Only Fields -->
      <div class="form-group">
        <label>Email:</label>
        <input type="text" v-model="student.email" readonly />
      </div>

      <div class="form-group">
        <label>Parent Phone:</label>
        <input type="text" v-model="student.parentPhone" readonly />
      </div>

      <div class="form-group">
        <label>Parent Email:</label>
        <input type="text" v-model="student.parentEmail" readonly />
      </div>

      <!-- Save Button -->
      <button type="submit" class="save-btn">Save Changes</button>
    </form>
  </div>
</template>

<script>
import { useStudentStore } from "../store/studentStore";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStudentStore();
    const router = useRouter();
    const editableStudent = ref({ name: "", phone: "" });

    onMounted(() => {
      if (store.student) {
        editableStudent.value.name = store.student.name;
        editableStudent.value.phone = store.student.phone;
      } else {
        store.fetchStudentData();
      }
    });

    const saveChanges = () => {
      store.updateStudent({
        name: editableStudent.value.name,
        phone: editableStudent.value.phone,
      });
      router.push("/student-details"); // Redirect after saving
    };

    return { student: store.student, editableStudent, saveChanges };
  }
};
</script>

<style scoped>
.edit-student-container {
  width: 90vw;
  max-width: 600px;
  margin: 5vh auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
}

h2 {
  color: #4e5566;
  margin-bottom: 1.5rem;
}

/* Form Styling */
form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

label {
  font-weight: bold;
  color: #4e5566;
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: #f9f9f9;
}

/* Read-only Fields */
input[readonly] {
  background: #f0f0f0;
  color: #8692a6;
}

/* Save Button */
.save-btn {
  margin-top: 1rem;
  background-color: #e75d24;
  color: #ffffff;
  padding: 0.8rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.3s;
}

.save-btn:hover {
  background-color: #d04e1c;
}

/* Responsive */
@media (max-width: 768px) {
  .edit-student-container {
    padding: 1.5rem;
  }
}
</style>
