// services/groupService.js
import api from "@/axios";

export default {
  async fetchGroups() {
    const res = await api.get("/groups");
    return res.data;
  },

  async fetchUpcomingGroupsByCourse(courseId) {
    const res = await api.get(`/courses/${courseId}/upcoming-groups`);
    return res.data;
  },

  async fetchUpcomingGroupsByLevel(levelId) {
    const res = await api.get(`/courses/levels/${levelId}/upcoming-groups`);
    return res.data;
  }
};
