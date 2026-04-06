// services/studentService.js

import api from '@/axios';

const STUDENTS_ENDPOINT = '/students';

const studentService = {

  async getStudents(params = {}) {

    try {

      const response =
        await api.get(
          STUDENTS_ENDPOINT,
          {
            params: params
          }
        );

      return response.data;

    }

    catch (error) {

      console.error(
        'Error fetching students:',
        error
      );

      throw error;

    }

  }

};

export default studentService;