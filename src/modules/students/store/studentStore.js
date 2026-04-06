import { defineStore } from 'pinia';
import studentService from '../services/studentService';

export const useStudentsStore =
defineStore('student', {

state: () => ({

  students: [],
  loading: false,
  error: null,

  lastPage: 1

}),

actions: {

async fetchStudents(params = {}) {

  try {

    this.loading = true;
    this.error = null;

    const response =
      await studentService.getStudents(params);

    /* ✅ البيانات */

    const studentsData =
      response.data || [];

    /* ✅ pagination */

    this.lastPage =
      response.pagination?.last_page || 1;

    /* معالجة course */

    this.students =
      studentsData.map(student => {

        const courses =
          student.student_groups
          ?.map(
            g =>
              g.course?.title
          )
          .filter(Boolean);

        return {

          ...student,

          course:
            courses?.join(', ')
            || '—'

        };

      });

    this.loading = false;

    return response;

  }

  catch (error) {

    this.error =
      'Failed to fetch students.';

    this.loading = false;

    console.error(error);

  }

},

async deleteStudent(studentId) {

  await studentService.deleteStudent(studentId);

}

}

});