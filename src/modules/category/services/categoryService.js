// 📁 src/services/categoryService.js
import api from "@/axios"; // ✅ استيراد axios المجهز بقاعدة URL + التوكن تلقائي

const ENDPOINT = "/categories";

export default {
  async getCategories() {
    const response = await api.get(ENDPOINT);
    return response.data.categories.data;
  },

  async getCategoryById(id) {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return response.data;
  },

async createCategory(categoryData) {
  const response = await api.post("/categories", categoryData, {
    headers: {
      "Content-Type": "multipart/form-data", // ✅ ضروري جدًا
    },
  });
  return response.data;
}


,

async updateCategory(id, formData) {
  return await api.post(`/categories/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}



,

  async deleteCategory(id) {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
  },
};
