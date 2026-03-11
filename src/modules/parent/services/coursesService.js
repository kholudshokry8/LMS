// src/services/courseService.js
import api from '@/axios';

export default {
  async getCourses() {
    const response = await api.get('/courses');
    return response.data;
  },

  async getCourseById(id) {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  async createCourse(courseData) {
    const response = await api.post('/courses', courseData);
    return response.data;
  }
};
