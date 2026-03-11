
import { defineStore } from 'pinia';
import studentService from '../services/studentService';

export const useStudentsStore = defineStore('student', { 
  state: () => ({
    students: [],
    loading: false,
    error: null,
    currentStudent: null, 
  }),
  actions: {
async fetchStudents() {
  try {
    this.loading = true;
    this.error = null;
    const response = await studentService.getStudents();

    // معالجة الطلاب لإضافة أسماء الكورسات في مفتاح course
    this.students = response.data.map((student) => {
      const courses = student.student_groups?.map(group => group.course?.title).filter(Boolean);
      return {
        ...student,
        course: courses?.join(', ') || '—'
      };
    });

    this.loading = false;
  } catch (error) {
    this.error = 'Failed to fetch students.';
    this.loading = false;
    console.error('Store - Error fetching students:', error);
  }
}
,
    
    
  async fetchStudentById(id) {
  try {
    this.loading = true;
    this.error = null;
 const response = await studentService.getStudentById(id);
const student = response.data;

    const courses = student.student_groups?.map(group => group.course?.title).filter(Boolean);
    const groups = student.student_groups?.map(group => ({
      id: group.id,
      Name: group.name,
      Price: group.course?.price || '—',
      Date: group.start_date?.split(' ')[0] || '—',
    })) || [];

    this.currentStudent = {
      ...student,
      course: courses?.join(', ') || '—',
      group: groups?.map(g => g.Name).join(', ') || '—',
      studentGroups: groups,
    };

    this.loading = false;
    return this.currentStudent;
  } catch (error) {
    this.error = `Failed to fetch student with ID ${id}.`;
    this.loading = false;
    console.error('Store - Error fetching student by ID:', error);
    return null;
  }
}
,
 async addStudent(studentData) {
  try {
    this.loading = true;
    this.error = null;

    const createdStudent = await studentService.createStudent(studentData);
    this.students.push(createdStudent);

    this.loading = false;
    return createdStudent; // ✅ ممكن تحتفظ به لو حبيت
  } catch (error) {
    this.error = 'Failed to add student.';
    this.loading = false;
    console.error('Store - Error adding student:', error);

    throw error; // ✅ أهم خطوة
  }
}


,


  async updateStudent(studentId, updatedData) {
  try {
    this.loading = true;
    this.error = null;

    const response = await studentService.updateStudent(studentId, updatedData);
    const updatedStudent = response?.data || response; // تأكدي من شكل الـ response

    const index = this.students.findIndex(s => s.id === studentId);
    if (index !== -1) {
      this.students[index] = { ...this.students[index], ...updatedStudent };
    }

    // ممكن تحدث currentStudent كمان لو أنتِ في صفحة التعديل
    this.currentStudent = { ...this.currentStudent, ...updatedStudent };

    this.loading = false;
    return updatedStudent;
  } catch (error) {
    this.error = 'Failed to update student.';
    this.loading = false;
    console.error('Store - Error updating student:', error);
    throw error;
  }
}
,

    async deleteStudent(studentId) {
      try {
        this.loading = true;
        this.error = null;
        await studentService.deleteStudent(studentId);
        this.students = this.students.filter(s => s.id !== studentId);
        this.loading = false;
      } catch (error) {
        this.error = 'Failed to delete student.';
        this.loading = false;
        console.error('Store - Error deleting student:', error);
      }
    },
  },

});