<template>
  <div class="edit_cat d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div class="col-12 p-0">
      <h1 class="text-center mb-4">Edit Category</h1>
      <div class="row">
        <div class="col-12 p-3">
          <form class="bg-white p-4 rounded" @submit.prevent="updateCategory" enctype="multipart/form-data">
            <div class="row">
              <!-- Category Name -->
              <div class="col-md-6 mb-3">
                <label for="category_name" class="form-label">Category Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="category_name"
                  v-model="categoryName"
                  placeholder="Enter category name"
                  required
                />
              </div>

              <!-- Category Image -->
              <div class="col-md-6 mb-3">
                <label for="category_image" class="form-label">Category Image</label>
                <input
                  type="file"
                  class="form-control"
                  id="category_image"
                  @change="handleImage"
                  accept="image/*"
                />
              </div>

              <!-- Preview Image -->
              <div class="col-md-12 mb-3" v-if="imagePreview">
                <label class="form-label">Preview</label>
                <img
                  :src="imagePreview"
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

const categoryName = ref("");
const imageFile = ref(null);
const imagePreview = ref("");

// Load category data
onMounted(async () => {
  if (!store.categories.length) {
    await store.fetchCategories();
  }

  const category = store.categories.find(c => c.id == route.params.id);

  if (category) {
    categoryName.value = category.name;

    // عرض الصورة من السيرفر أو صورة افتراضية
    if (category.image && category.image !== "categories/") {
      imagePreview.value = category.image.startsWith("http")
        ? category.image
        : `https://back.stemershub.com/storage/${category.image}`;
    } else {
      imagePreview.value = '/default-category.png';
    }

  } else {
    alert("❌ Category not found");
    router.push({ name: "CategoriesPage" });
  }
});

// Handle image input
const handleImage = (e) => {
  const file = e.target.files[0];

  if (!file) {
    imageFile.value = null;
    return;
  }

  // تأكد من نوع الملف
  if (!file.type.startsWith("image/")) {
    alert("❌ Please select a valid image file (PNG, JPEG, etc.)");
    e.target.value = ""; // اعادة تعيين input
    imageFile.value = null;
    imagePreview.value = null;
    return;
  }

  imageFile.value = file;
  imagePreview.value = URL.createObjectURL(file);
};

// Update category
const updateCategory = async () => {
  if (!categoryName.value.trim()) {
    alert("❌ Category name cannot be empty.");
    return;
  }

  const formData = new FormData();
  formData.append("name", categoryName.value.trim());

  // ابعت الصورة فقط لو فيه ملف صحيح
  if (imageFile.value instanceof File) {
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
.edit_cat {
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