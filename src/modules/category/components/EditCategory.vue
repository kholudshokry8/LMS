<template>
  <div class="edit_cat d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div class="col-12 p-0">
      <h1 class="text-center mb-4">Edit Category</h1>
      <div class="row">
        <div class="col-12 p-3">
          <form class="bg-white p-4 rounded" @submit.prevent="updateCourse" enctype="multipart/form-data">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="course_name" class="form-label">Course Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="course_name"
                  v-model="courseName"
                  placeholder="Enter course name"
                  required
                />
              </div>

              <!-- ✅ حقل اختيار صورة جديدة -->
              <div class="col-md-6 mb-3">
                <label for="course_image" class="form-label">Course Image</label>
                <input
                  type="file"
                  class="form-control"
                  id="course_image"
                  @change="handleImage"
                  accept="image/*"
                />
              </div>

              <!-- ✅ معاينة الصورة الجديدة أو الحالية -->
              <div class="col-md-12 mb-3" v-if="imagePreview || currentImage">
                <label class="form-label">Preview</label>
                <img
                  :src="imagePreview || currentImageUrl"
                  alt="Preview"
                  class="img-thumbnail"
                  style="max-width: 200px;"
                />
              </div>

              <div class="col-12">
                <button type="submit" class="btn btn-primary w-100">Save Changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCategoryStore } from "../store/categoryStore";

const router = useRouter();
const route = useRoute();
const store = useCategoryStore();

const courseName = ref("");
const imageFile = ref(null);
const imagePreview = ref("");

onMounted(() => {
  const course = store.categories.find((c) => c.id == route.params.id);
  if (course) {
    courseName.value = course.name;
    imagePreview.value = import.meta.env.VITE_API_URL + "/" + course.image;
  } else {
    alert("❌ Category not found");
    router.push({ name: "CategoriesPage" });
  }
});

const handleImage = (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    imageFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const updateCourse = async () => {
  const formData = new FormData();
  formData.append("name", courseName.value);
  formData.append("body", courseDetails.value || "");
  // احذف السطر ده:
  // formData.append("_method", "PUT");
  if (imageFile.value) {
    formData.append("image", imageFile.value);
  }

  try {
    await store.updateCategory(route.params.id, formData);
    alert("✅ Category updated successfully!");
    router.push({ name: "CategoriesPage" });
  } catch (err) {
    console.error("❌ Error updating category:", err);
    alert("❌ Failed to update category");
  }
};

</script>


<style scoped>
.edit_cat{
  overflow: hidden;
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
