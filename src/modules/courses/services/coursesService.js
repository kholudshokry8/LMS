// 📁 src/services/courseService.js
import api from "@/axios"; // ✅ استخدم النسخة المجهزة من axios

const ENDPOINT = "/courses";

export default {
  async getCourses() {
    const response = await api.get(ENDPOINT);
    return response.data;
  },

  async getCourseById(id) {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async createCourse(courseData) {
    const response = await api.post(ENDPOINT, courseData);
    return response.data;
  },
  async updateCourse(id, courseData) {
    const response = await api.put(`${ENDPOINT}/${id}`, courseData);
    return response.data;
  },

  async deleteCourse(id) {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
  }
};
