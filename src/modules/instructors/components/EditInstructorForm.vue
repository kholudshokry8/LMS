<template>
  <div class="container">
    <h1 class="title">Edit Instructor</h1>
    <form @submit.prevent="saveChanges" class="edit-instructor">
      <!-- الاسم و التليفون -->
      <div class="form-row">
        <div class="form-group">
          <label>Name:</label>
          <input type="text" v-model="instructor.name" required />
        </div>

        <div class="form-group">
          <label>Phone:</label>
          <input type="text" v-model="instructor.phone" required />
        </div>
      </div>

      <!-- الإيميل والباسورد -->
      <div class="form-row">
        <div class="form-group">
          <label>Email:</label>
          <input type="email" v-model="instructor.email" required />
        </div>

        <div class="form-group">
          <label>Password:</label>
          <input type="password" v-model="instructor.password" />
        </div>
      </div>

      <!-- التخصص و لينكدإن -->
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

      <!-- صورة الملف و الكورسات -->
      <div class="form-row">
        <div class="form-group">
          <label>Profile Image:</label>
          <input type="file" @change="onImageChange" accept="image/*" />
          <div v-if="instructor.profile_image" class="mt-2">
            <img :src="instructor.profile_image" alt="Profile" style="max-width: 150px;" />
          </div>
        </div>

        <div class="form-group">
          <label>Courses:</label>
          
        <select v-model="instructor.courses" multiple class="form-select">
<option v-for="course in allCourses" :key="course.id" :value="Number(course.id)">
  {{ course.title }}
</option>

</select>

        </div>
      </div>

      <!-- السيرة الذاتية -->
      <div class="form-row">
        <div class="form-group" style="flex: 1;">
          <label>Bio:</label>
          <textarea
            v-model="instructor.bio"
            rows="4"
            style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 5px; font-size: 16px;"
          ></textarea>
        </div>
      </div>

      <!-- زر الحفظ -->
      <div class="buttons">
        <button type="submit" class="btn-save">Save Changes</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "@/axios";

const route = useRoute();
const router = useRouter();

const instructor = reactive({
  name: "",
  phone: "",
  email: "",
  password: "",
  specialization: "",
  linkedin: "",
  bio: "",
  profile_image: "",
  courses: [],
  id: null,
});

// const allCourses = ref([]);
const selectedFile = ref(null);
const errorMessage = ref("");
const allCourses = ref([]); // علشان نحط فيه الكورسات من الـ API
onMounted(async () => {
  const id = route.params.id;

  try {
    // جلب بيانات المحاضر
    const response = await api.get(`/instructors/${id}`);
    const data = response.data.instructor;

    instructor.name = data.name;
    instructor.phone = data.phone;
    instructor.email = data.email;
    instructor.id = data.id;
    instructor.specialization = data.instructor?.specialization || '';
    instructor.bio = data.instructor?.bio || '';
    instructor.linkedin = data.instructor?.linkedin || '';
    instructor.profile_image = data.instructor?.profile_image || '';
    instructor.courses = data.courses?.map(c => Number(c.id)) || [];
    // instructor.courses = data.courses?.map(c => c.id) || [];
console.log("✅ Selected Course IDs:", instructor.courses); // ⬅ لازم تكون [1, 3, 5] مش ["1", "3"]


    // ✅ جلب الكورسات من الرابط المطلوب
    const coursesRes = await api.get("https://stemers-backend.coodex-academy.com/api/courses");
    allCourses.value = coursesRes.data || [];
console.log("✅ All Courses:", allCourses.value);
console.log("📌 Selected Course IDs:", instructor.courses);
console.log("👨‍🏫 Instructor full data:", response.data);

  } catch (error) {
    console.error(error);
    errorMessage.value = "حدث خطأ أثناء تحميل البيانات.";
  }
});



const onImageChange = (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    selectedFile.value = file;
  } else {
    alert("من فضلك اختاري صورة بصيغة صحيحة (jpg, png)");
    selectedFile.value = null;
  }
};

const saveChanges = async () => {
  try {
    const formData = new FormData();

    for (const key in instructor) {
      if (key !== "courses" && key !== "profile_image") {
        if (key === "password" && !instructor.password) continue;
        formData.append(key, instructor[key]);
      }
    }

    // إضافة الكورسات كـ array
    instructor.courses.forEach(id => {
      formData.append("courses[]", id);
    });

    if (selectedFile.value) {
      formData.append("profile_image", selectedFile.value);
    }

    await api.post(`/instructors/${instructor.id}?_method=PUT`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("تم تحديث بيانات المحاضر بنجاح.");
  } catch (error) {
    console.error("Failed to update instructor:", error.response?.data || error.message);
    alert("فشل في تحديث بيانات المحاضر.");
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
  border-radius: 10px;
}

.title {
  font-size: 36px;
  font-weight: bold;
  color: #d65622;
  margin-bottom: 30px;
  align-self: center;
}

.edit-instructor {
  width: 100%;
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
  color: #d65622;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.btn-save {
  background: #d65622;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}
</style>
