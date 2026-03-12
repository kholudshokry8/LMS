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



  // Add Task
  const addTask = async (sessionId, data) => {
    return await instructorProfileService.addTask(sessionId, data);
  };

  // Evaluate Task
const evaluateTask = async (payload) => {
  const updatedSubmission = await instructorProfileService.evaluateTask(
    payload.taskId,
    {
      student_id: payload.student_id,
      grade: Number(payload.score),
      feedback: payload.feedback
    }
  );

  // تحديث الـ submission في الـ store مباشرة لو موجود
  const index = taskSubmissions.value?.task?.submissions?.findIndex(
    s => s.id === payload.student_id
  );
  if (index !== -1) {
    taskSubmissions.value.task.submissions[index] = updatedSubmission;
  }

  return updatedSubmission;
};
  // Delete Task
  const deleteTask = async (taskId) => {
    return instructorProfileService.deleteTask(taskId);
  };
// Update attendance
const updateAttendance = async (sessionId, studentId) => {
  return instructorProfileService.updateAttendance(sessionId, studentId);
};
const fetchTaskSubmissions = async (sessionId) => {
  loading.value = true;

  try {

    const res =
      await instructorProfileService.getSessionTaskSubmissions(sessionId);

    taskSubmissions.value = res;

    return res;

  } finally {

    loading.value = false;

  }
};
  return {
  updateAttendance
,
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