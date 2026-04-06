// src/services/courseService.js
import api from "@/axios";

export default {
  async getCourses() {
    try {
      const response = await api.get("/courses");

      // 👇 يدعم كل أشكال الـ API
      return response.data.data || response.data;

    } catch (error) {
      console.error("Failed to fetch courses", error);

      throw error.response?.data || error;
    }
  },

  async getCourseById(id) {
    try {
      const response = await api.get(`/courses/${id}`);

      return response.data.data || response.data;

    } catch (error) {
      console.error("Failed to fetch course", error);

      throw error.response?.data || error;
    }
  },

  async createCourse(courseData) {
    try {
      const response = await api.post("/courses", courseData);

      return response.data;

    } catch (error) {
      console.error("Failed to create course", error);

      throw error.response?.data || error;
    }
  }
};