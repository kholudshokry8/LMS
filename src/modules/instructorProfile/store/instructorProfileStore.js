import { defineStore } from "pinia";
import { ref } from "vue";
import instructorProfileService from "../services/instructorProfileService";

export const useInstructorProfileStore = defineStore("instructorProfile", () => {

  const dashboard = ref(null);
  const selectedGroup = ref(null);
  const selectedSession = ref(null);
  const taskSubmissions = ref([]);
  const loading = ref(false);

  // Dashboard
  const fetchDashboard = async () => {
    loading.value = true;
    try {
      dashboard.value = await instructorProfileService.getDashboard();
    } finally {
      loading.value = false;
    }
  };

  // Group
  const fetchGroup = async (groupId) => {
    loading.value = true;
    try {
      selectedGroup.value = await instructorProfileService.getGroup(groupId);
    } finally {
      loading.value = false;
    }
  };

  // Task submissions
  const fetchTaskSubmissions = async (sessionId) => {
    loading.value = true;
    try {
      taskSubmissions.value =
        await instructorProfileService.getSessionTaskSubmissions(sessionId);
    } finally {
      loading.value = false;
    }
  };

  // Add Task
  const addTask = async (sessionId, data) => {
    return await instructorProfileService.addTask(sessionId, data);
  };

  // Evaluate Task
  const evaluateTask = async (payload) => {
    return instructorProfileService.evaluateTask(payload.taskId, {
      submission_id: payload.submission_id,
      score: payload.score,
      feedback: payload.feedback
    });
  };

  // Delete Task
  const deleteTask = async (taskId) => {
    return instructorProfileService.deleteTask(taskId);
  };

  return {
    dashboard,
    selectedGroup,
    selectedSession,
    taskSubmissions,
    loading,
    fetchDashboard,
    fetchGroup,
    fetchTaskSubmissions,
    addTask,
    evaluateTask,
    deleteTask
  };

});