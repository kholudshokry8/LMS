<template>
<div v-if="alert.message" :class="['alert', `alert-${alert.type}`]" role="alert">
  {{ alert.message }}
</div>

  <div class="category d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div class="col-12 p-0">
      <h1 class="text-center mb-4">Create Category</h1>
      <div class="row">
        <div class="col-12 p-3">
          <form class="bg-white p-4 rounded" @submit.prevent="createCourse" enctype="multipart/form-data">
            <div class="row">
              <div class="col-md-12 mb-3">
                <label for="course_name" class="form-label">Course Name</label>
                <input type="text" class="form-control" id="course_name" v-model="courseName" placeholder="Enter course name" required />
              </div>

              <!-- ✅ حقل رفع الصورة -->
              <div class="col-md-12 mb-3">
                <label for="course_image" class="form-label">Course Image</label>
                <input type="file" class="form-control" id="course_image" @change="handleImage" accept="image/*" />
              </div>

              <!-- ✅ عرض الصورة لو تم اختيارها -->
              <div class="col-md-12 mb-3" v-if="imagePreview">
                <label class="form-label d-block">Preview</label>
                <img :src="imagePreview" alt="Preview" class="img-thumbnail" style="max-width: 200px;" />
              </div>

              <div class="col-4 m-auto">
                <button type="submit" class="btn btn-primary w-100">Create</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCategoryStore } from "../store/categoryStore";

const router = useRouter();
const store = useCategoryStore();

const courseName = ref("");
const imageFile = ref(null);
const imagePreview = ref(null);
const alert = ref({ message: "", type: "" });


// ✅ التعامل مع رفع الصورة
const handleImage = (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    imageFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  } else {
    alert("❌ Please select a valid image file.");
    imageFile.value = null;
    imagePreview.value = null;
  }
};


const createCourse = async () => {
  alert.value = { message: "", type: "" };

  try {
    const formData = new FormData();
    formData.append("name", courseName.value);
    if (imageFile.value) {
      formData.append("image", imageFile.value);
    }

    const result = await store.addCategory(formData);

    // ✅ نجاح سواء كان فيه ID أو لأ
    alert.value = {
      message: `✅ Category "${courseName.value}" created successfully!`,
      type: "success",
    };

    setTimeout(() => {
      router.push({ name: "CategoriesPage" });
    }, 1500);
  } catch (error) {
    const serverMsg =
      error.response?.data?.errors?.name?.[0] ||
      error.response?.data?.message ||
      "❌ Unexpected error occurred while creating category.";

    alert.value = {
      message: serverMsg,
      type: "danger",
    };

    console.error("❌ Error creating category:", error);
  }
};






</script>

<style scoped>
.category{
  overflow-x: hidden;
}
h1,
label {
  color: #c6501f;
  font-weight: 700;
}

button {
  background-color: #c6501f;
  color: white;
}

button:hover {
  background-color: #a84319;
}

.form-control,
.form-select {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
}

.bg-white {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>