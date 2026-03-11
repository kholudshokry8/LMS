// services/studentService.js
import api from '@/axios';

const STUDENTS_ENDPOINT = '/students';

const studentService = {
  async getStudents() {
    try {
      const response = await api.get(STUDENTS_ENDPOINT);
      return response?.data || [];
    } catch (error) {
      console.error('Error fetching students:', error);
      return [];
    }
  },

  async getStudentById(id) {
    try {
      const response = await api.get(`${STUDENTS_ENDPOINT}/${id}`);
      return response?.data;
    } catch (error) {
      console.error(`Error fetching student with ID ${id}:`, error);
      throw error;
    }
  },

  async createStudent(newStudent) {
    try {
      const response = await api.post(STUDENTS_ENDPOINT, newStudent);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  },

  async updateStudent(studentId, updatedStudentData) {
    try {
      const response = await api.put(`${STUDENTS_ENDPOINT}/${studentId}`, updatedStudentData);
      return response?.data;
    } catch (error) {
      console.error(`Error updating student with ID ${studentId}:`, error);
      throw error;
    }
  },

  async deleteStudent(studentId) {
    try {
      const response = await api.delete(`${STUDENTS_ENDPOINT}/${studentId}`);
      return response?.data;
    } catch (error) {
      console.error(`Error deleting student with ID ${studentId}:`, error);
      throw error;
    }
  },

  async getTotalPayment(studentId) {
    try {
      const response = await api.get(`${STUDENTS_ENDPOINT}/${studentId}/total-payment`);
      return response?.data?.total || 0;
    } catch (error) {
      console.error(`Error fetching total payment for student ${studentId}:`, error);
      return 0;
    }
  }
};

export default studentService;
