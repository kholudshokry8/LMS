import api from "@/plugins/axios";

export default {

  // Dashboard
  getDashboard() {
    return api.get("/instructorProfile").then(res => res.data);
  },

  // Group
  getGroup(groupId) {
    return api.get(`/instructorProfile/${groupId}`).then(res => res.data);
  },

  // Tasks
addTask(sessionId, task) {
  return api
    .post(`/instructorProfile/sessions/${sessionId}/tasks`, task)
    .then(res => res.data);
},

  getSessionTaskSubmissions(sessionId) {
    return api
      .get(`/instructorProfile/sessions/${sessionId}/tasks/submissions`)
      .then(res => res.data);
  },

  evaluateTask(taskId, data) {
    return api.post(`/instructorProfile/tasks/${taskId}/evaluate`, data);
  },

  deleteTask(taskId) {
    return api.delete(`/instructorProfile/tasks/${taskId}`);
  }

};