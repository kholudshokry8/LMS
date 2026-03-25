// src/services/instructorService.js
import api from '@/axios';

export default {
  // جلب جميع المحاضرين
  async getAll() {
    const response = await api.get("/instructors");
    return response.data.instructors.data;
  },

  // جلب محاضر واحد
 async getById(id) {
    const response = await api.get(`/instructors/${id}`);
    return response.data;
  },

  async create(data) {
    // هنا الـ 'data' هتكون الـ object اللي فيه الـ Base64 string للصورة
    // axios هيظبط الـ Content-Type لـ application/json تلقائيًا
    const response = await api.post("/instructors", data);
    return response.data;
  },

  // تحديث بيانات محاضر
// instructorsService.js

async update(id, data) {
  const response = await api.post(
    `/instructors/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return response.data;
},

  // حذف محاضر
async delete(id) {
  try {
    const response = await api.delete(`/instructors/${id}`);
    return response.data;
  } catch (error) {
    // 🔥 نرمي الخطأ عشان الصفحة تقدر تمسكه
    throw error;
  }
}

};
