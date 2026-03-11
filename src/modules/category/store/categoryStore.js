import { defineStore } from "pinia";
import { ref } from "vue";
import categoryService from "../services/categoryService";

export const useCategoryStore = defineStore("categories", () => {
  const categories = ref([]);
  const loading = ref(false);


  const fetchCategories = async () => {
    loading.value = true;
    try {
      const data = await categoryService.getCategories();
      categories.value = data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        icon: item.icon,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      loading.value = false;
    }
  };


  const fetchCategory = async (id) => {
    loading.value = true;
    try {
      const data = await categoryService.getCategoryById(id);
      return {
        id: data.id,
        name: data.name,
        image: data.image,
        icon: data.icon,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    } catch (error) {
      console.error("Error fetching category:", error);
    } finally {
      loading.value = false;
    }
  };

const addCategory = async (newCategory) => {
  try {
    const data = await categoryService.createCategory(newCategory);

    const category = {
      id: data.id,
      name: data.name,
      image: data.image,
      icon: data.icon,
      body: data.body,
      description: data.description,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    categories.value.push(category);
    return category;
  } catch (error) {
    console.error("❌ Error adding category:", error);
    console.log("📥 Server error response:", error.response?.data);
    throw error;
  }
};




const updateCategory = async (id, updatedFormData) => {
  try {
    await categoryService.updateCategory(id, updatedFormData);
    await fetchCategories(); // تحديث القائمة بعد التعديل
  } catch (error) {
    console.error("❌ Error updating category:", error);
    throw error;
  }
};





  const deleteCategory = async (id) => {
    try {
      await categoryService.deleteCategory(id);
      categories.value = categories.value.filter((c) => c.id !== id);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return {
    categories,
    loading,
    fetchCategories,
    fetchCategory,
    addCategory,
    updateCategory,
    deleteCategory,
  };
});