<template>
  <div class="container">
    <h1 class="title">Create Instructor</h1>

    <!-- ✅ Bootstrap Alert for general message -->
    <div v-if="globalError" class="alert alert-danger">{{ globalError }}</div>
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

    <form @submit.prevent="saveChanges" class="create-instructor">
      <!-- Name & Email -->
      <div class="form-row">
        <div class="form-group">
          <label>Name:</label>
          <input type="text" v-model="instructor.name" />
          <small class="text-danger" v-if="errors.name">{{ errors.name }}</small>
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" v-model="instructor.email" />
          <small class="text-danger" v-if="errors.email">{{ errors.email }}</small>
        </div>
      </div>

      <!-- Password & Phone -->
      <div class="form-row">
        <div class="form-group">
          <label>Password:</label>
          <input type="password" v-model="instructor.password" />
          <small class="text-danger" v-if="errors.password">{{ errors.password }}</small>
        </div>
        <div class="form-group">
          <label>Phone:</label>
          <input type="text" v-model="instructor.phone" />
          <small class="text-danger" v-if="errors.phone">{{ errors.phone }}</small>
        </div>
      </div>

      <!-- Specialization & LinkedIn -->
      <div class="form-row">
        <div class="form-group">
          <label>Specialization:</label>
          <input type="text" v-model="instructor.specialization" />
        </div>
        <div class="form-group">
          <label>LinkedIn:</label>
          <input type="url" v-model="instructor.linkedin" />
        </div>
      </div>

      <!-- Bio & Image -->
      <div class="form-row">
        <div class="form-group">
          <label>Bio:</label>
          <textarea v-model="instructor.bio" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label>Profile Image:</label>
          <input type="file" @change="handleImageUpload" accept="image/*" />
          <small class="text-danger" v-if="errors.profile_image">{{ errors.profile_image }}</small>
        </div>
      </div>

      <!-- Courses Dropdown -->
      <div class="form-row">
        <div class="form-group">
          <label for="courses">Select Courses:</label>
          <select
            id="courses"
            v-model="instructor.courses"
            multiple
            class="form-control"
            size="6"
          >
            <option v-for="course in courses" :key="course.id" :value="course.id">
              {{ course.title }}
            </option>
          </select>
          <small class="text-danger" v-if="errors.courses">{{ errors.courses }}</small>
        </div>
      </div>

      <div class="buttons">
        <button type="submit" class="btn-save">Save Changes</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { shallowReactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import api from "@/axios";
import { onMounted } from "vue";

const courses = ref([]);

const fetchCourses = async () => {
  try {
    const res = await api.get("/courses");
    courses.value = res.data;
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
  }
};

onMounted(() => {
  fetchCourses();
});

const router = useRouter();

const instructor = shallowReactive({
  name: "",
  email: "",
  password: "",
  phone: "",
  specialization: "",
  linkedin: "",
  bio: "",
  courses: [],
  profile_image: null,
});

const errors = ref({});
const globalError = ref("");
const successMessage = ref("");

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    instructor.profile_image = file;
    errors.value.profile_image = null;
  } else {
    errors.value.profile_image = "Please select a valid image file.";
    e.target.value = null;
  }
};

const saveChanges = async () => {
  errors.value = {};
  globalError.value = "";
  successMessage.value = "";

  instructor.courses = instructor.courses.map(id => Number(id));

  if (!instructor.name) errors.value.name = "Name is required.";
  if (!instructor.email) errors.value.email = "Email is required.";
  if (!instructor.password) errors.value.password = "Password is required.";
  if (!instructor.phone) errors.value.phone = "Phone is required.";
  if (!instructor.courses.length) errors.value.courses = "At least one valid course ID is required.";
  if (!(instructor.profile_image instanceof File)) errors.value.profile_image = "Please upload a valid profile image.";

  if (Object.keys(errors.value).length > 0) return;

  try {
    const formData = new FormData();
    formData.append("name", instructor.name);
    formData.append("email", instructor.email);
    formData.append("password", instructor.password);
    formData.append("phone", instructor.phone);
    formData.append("specialization", instructor.specialization);
    formData.append("bio", instructor.bio);
    formData.append("linkedin", instructor.linkedin);
    formData.append("profile_image", instructor.profile_image);
    // let i = 0

    instructor.courses.forEach(course => {
      formData.append(`courses[]`, course);
      // i++
    });
  //  const courses = [1,2]
    await api.post("/instructors", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    successMessage.value = "✅ Instructor created successfully!";
    setTimeout(() => {
      successMessage.value = "";
      router.push("/instructors");
    }, 3000);
  } catch (err) {
    const data = err.response?.data;
    if (data?.errors) {
      Object.entries(data.errors).forEach(([key, val]) => {
        errors.value[key] = val[0];
      });
    } else if (
      data?.message?.includes("Duplicate entry") &&
      data?.message?.includes("users_phone_unique")
    ) {
      errors.value.phone = "❌ This phone number is already taken.";
    } else if (
      data?.message?.includes("foreign key constraint fails") &&
      data?.message?.includes("course_instructors_instructor_id_foreign")
    ) {
      errors.value.courses = "❌ Invalid course ID or the course doesn't exist.";
    } else {
      globalError.value = data?.message || "❌ Failed to create instructor.";
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 80vw;
  background: #f8f9fa;
  padding: 20px;
}

.title {
  font-size: 48px;
  font-weight: bold;
  color: #d65622;
  margin-bottom: 30px;
  align-self: center;
}

.alert {
  font-size: 16px;
  margin-bottom: 20px;
}

.create-instructor {
  width: 90%;
  max-width: 1200px;
  padding: 20px;
}

.form-row {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
  text-align: left;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 18px;
}

input,
textarea,
select,
.dropdown-toggle {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.text-danger {
  font-size: 14px;
  color: red;
  margin-top: 5px;
  display: block;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.btn-save {
  background: #d65622;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
}

.form-group select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>