
import api from './api';

const STUDENTS_ENDPOINT = 'students';

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
      throw error; // أعدي رمي الخطأ ليتم التعامل معه في الـ store
    }
  },
  
  async createStudent(newStudent) {
    try {
      const response = await api.post(STUDENTS_ENDPOINT, newStudent);
      return response?.data;
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
};

export default studentService;
