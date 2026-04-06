<template>
  <div class="container mt-5 mb-5">
    <h2 class="mb-4 text-center text-primary">Edit Instructor</h2>
    <form @submit.prevent="saveChanges" class="edit-instructor">
      <div class="form-row">
        <div class="form-group">
          <label>Name:</label>
          <input type="text" v-model="localInstructor.name" required />
        </div>
        <div class="form-group">
          <label>Phone:</label>
          <input type="text" v-model="localInstructor.phone" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Email:</label>
          <input type="email" v-model="localInstructor.email" required />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" v-model="localInstructor.password" placeholder="Leave empty to keep current password" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Specialization:</label>
          <input type="text" v-model="localInstructor.specialization" />
        </div>
        <div class="form-group">
          <label>LinkedIn:</label>
          <input type="url" v-model="localInstructor.linkedin" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Profile Image:</label>
          <input type="file" @change="onImageChange" accept="image/*" />
          <div v-if="localInstructor.profile_image" class="mt-2">
            <img :src="getImageUrl(localInstructor.profile_image)" style="max-width:150px" />
          </div>
        </div>
        <!-- <div class="form-group">
          <label>Courses:</label>
          <select v-model="localInstructor.courses" multiple>
            <option v-for="course in allCourses" :key="course.id" :value="Number(course.id)">
              {{ course.title }}
            </option>
          </select>
        </div> -->
      </div>

      <div class="form-row">
        <div class="form-group" style="flex:1;">
          <label>Bio:</label>
          <textarea v-model="localInstructor.bio" rows="4"></textarea>
        </div>
      </div>

      <div class="buttons text-center mt-4">
        <button type="submit" class="btn-save">Save Changes</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useInstructorsStore } from "@/modules/instructors/store/instructorsStore";
import api from "@/axios";

const route = useRoute();
const router = useRouter();
const store = useInstructorsStore();

const localInstructor = ref({
  name: "",
  email: "",
  phone: "",
  password: "",
  specialization: "",
  linkedin: "",
  bio: "",
  profile_image: "",
  courses: [],
  id: null,
});

const allCourses = ref([]);
const selectedFile = ref(null);
const baseURL = "https://back.stemershub.com";

const getImageUrl = (path) => {
  if (!path) return "";
  return path instanceof File ? URL.createObjectURL(path) : baseURL + "/" + path.replace(/^\/+/, "");
};

const onImageChange = (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    selectedFile.value = file;
    localInstructor.value.profile_image = file;
  } else {
    alert("Please select a valid image file");
  }
};

const fetchInstructorData = async () => {
  await store.fetchInstructor(route.params.id);
  Object.assign(localInstructor.value, store.instructor);
};

const fetchCourses = async () => {
  try {
    const res = await api.get("/courses");
    allCourses.value = res.data.courses?.data || res.data;
  } catch (err) {
    console.error(err);
  }
};

const saveChanges = async () => {

  console.log("📚 Selected Courses:",
    localInstructor.value.courses
  );

  await store.updateInstructor(
    localInstructor.value
  );

  router.push("/instructors");
};
onMounted(() => {
  fetchInstructorData();
  fetchCourses();
});
</script>

<style scoped>
.edit-instructor {
  max-width: 900px;
  margin: auto;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
}

input, select, textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border:1px solid #ccc;
}

.btn-save {
  background: #d65622;
  color: #fff;
  padding: 12px 30px;
  border:none;
  border-radius:5px;
  cursor:pointer;
}
</style>