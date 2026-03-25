// src/store/coursesStore.js
import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/axios"; // استخدم النسخة المجهزة من axios

export const useCoursesStore = defineStore("courses", () => {
  const courses = ref([]);
  const course = ref({});
  const categories = ref([]);
  const loading = ref(false);
  const errorMessage = ref("");
  const successMessage = ref("");
  const router = useRouter();

  // =========================
  // Get all courses
  // =========================
  const fetchCourses = async () => {
    loading.value = true;
    errorMessage.value = "";
    try {
      const response = await api.get("/courses");
      courses.value = response.data.data || response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      errorMessage.value =
        error.response?.data?.message || "Failed to fetch courses.";
    } finally {
      loading.value = false;
    }
  };

  // =========================
  // Get single course
  // =========================
  const fetchCourse = async (id) => {
    loading.value = true;
    errorMessage.value = "";
    try {
      const response = await api.get(`/courses/${id}`);
      course.value = response.data.data || response.data;
    } catch (error) {
      console.error("Error fetching course:", error);
      errorMessage.value =
        error.response?.data?.message || "Failed to fetch course details.";
    } finally {
      loading.value = false;
    }
  };

  // =========================
  // Create course
  // =========================
  const createCourse = async (courseData) => {
    loading.value = true;
    try {
      const response = await api.post("/courses", courseData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      courses.value.push(response.data.data || response.data);
      router.push("/courses");
    } catch (error) {
      console.error("Error creating course:", error);
      errorMessage.value =
        error.response?.data?.message || "Failed to create course.";
    } finally {
      loading.value = false;
    }
  };

  // =========================
  // Update course
  // =========================
  const updateCourse = async (id, courseData) => {
    loading.value = true;
    try {
      courseData.append("_method", "PUT");
      const response = await api.post(`/courses/${id}`, courseData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updatedCourse = response.data.data || response.data;
      const index = courses.value.findIndex((c) => c.id === id);
      if (index !== -1) courses.value[index] = updatedCourse;
      router.push("/courses");
    } catch (error) {
      console.error("Error updating course:", error);
      errorMessage.value =
        error.response?.data?.message || "Failed to update course.";
    } finally {
      loading.value = false;
    }
  };

  // =========================
  // Delete course
  // =========================
  const deleteCourse = async (id) => {
    loading.value = true;
    errorMessage.value = "";
    successMessage.value = "";
    try {
      await api.delete(`/courses/${id}`);
      courses.value = courses.value.filter((c) => c.id !== id);
      successMessage.value = "Course deleted successfully ✅";
      setTimeout(() => (successMessage.value = ""), 3000);
    } catch (error) {
      console.error("Error deleting course:", error);
      errorMessage.value =
        error.response?.data?.message || "Failed to delete course ❌";
    } finally {
      loading.value = false;
    }
  };

  // =========================
  // Get all categories
  // =========================
  const fetchCategories = async () => {
    loading.value = true;
    errorMessage.value = "";
    try {
      const response = await api.get("/categories"); // افترض أن لديك endpoint /categories
      categories.value = response.data.data || response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      errorMessage.value =
        error.response?.data?.message || "Failed to fetch categories.";
    } finally {
      loading.value = false;
    }
  };

  // =========================
  // Mounted
  // =========================
  onMounted(() => {
    fetchCourses();
    fetchCategories();
  });

  return {
    courses,
    course,
    categories,
    loading,
    errorMessage,
    successMessage,
    fetchCourses,
    fetchCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    fetchCategories,
  };
});