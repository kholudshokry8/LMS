import api from "@/axios";

const ENDPOINT = "/courses";

const courseService = {
  async fetchCourses() {
    const response = await api.get(ENDPOINT);
    return response?.data || [];
  },

  async getCourseById(courseId) {
    const response = await api.get(`${ENDPOINT}/${courseId}`);
    return response?.data;
  },

  async fetchUpcomingGroups(courseId) {
    const response = await api.get(`${ENDPOINT}/${courseId}/upcoming-groups`);
    return response?.data || [];
  }
};

export default courseService;
