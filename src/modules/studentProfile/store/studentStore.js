import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/axios"; // ✅ استخدم axios المخصص

export const useStudentStore = defineStore("student", () => {
  const student = ref({});
  const studentStats = ref([]);
  const groups = ref([]);
  const loading = ref(false);
  const sessionTask = ref(null);

  const fetchStudentData = async () => {
    loading.value = true;
    try {
      const response = await api.get("/studentProfile");
      const data = response.data.data;

      student.value = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        image: data.image,
        age: data.age ?? "N/A",
        bio: data.bio ?? "N/A",
        language: "English",
      };

      studentStats.value = [
        {
          title: "Submitted Tasks",
          value: data.submitted_tasks,
          icon: "bi bi-check2-circle",
          color: "#dbeafe",
        },
        {
          title: "Enrolled Courses",
          value: `${data.enrolled_courses}%`,
          icon: "bi bi-journal-bookmark-fill",
          color: "#d1e7dd",
        },
        {
          title: "Task Grades",
          value: data.task_grades,
          icon: "bi bi-bar-chart-line",
          color: "#fff3cd",
        },
        {
          title: "Pending Tasks",
          value: data.pending_tasks,
          icon: "bi bi-hourglass-split",
          color: "#f8d7da",
        },
      ];

      groups.value = data.groups.map((group, index) => ({
        
        id: group.group_id,
        name: group.group_name,
        course: group.course_name,
        instructor: group.instructor_name,
        attendedSessions: group.sessions_attended,
        totalSessions: group.total_sessions,
        progress: group.progress,
        startDate: group.start_date ?? "N/A",
        sessions: group.sessions ?? [],
        color: "#0d6efd",
      }));
    } catch (error) {
      console.error("❌ Error fetching student data", error);
    } finally {
      loading.value = false;
    }
  };

  const fetchGroupById = async (groupId) => {
    try {
      const response = await api.get(`/studentProfile/getGroupDetails/${groupId}`);
      const data = response.data.data;

      const existingIndex = groups.value.findIndex((g) => g.id === groupId);

      const formattedGroup = {
        id: groupId,
        name: data.name || "",
        courseName: data.course_name,
        instructor: data.instructor_name,
        totalSessions: data.total_sessions,
        attendedSessions: data.attendance_progress?.attended || 0,
        sessions: (data.sessions || []).map((session, i) => ({
          ...session,
          id: session.id || session.session_id || (session.task?.session_id ?? i + 1),
        })),
        finalEvaluation: data.final_evaluation || null,
        startDate: data.start_date || "",
      };

      if (existingIndex !== -1) {
        groups.value[existingIndex] = formattedGroup;
      } else {
        groups.value.push(formattedGroup);
      }

      return formattedGroup;
    } catch (err) {
      console.error("❌ Error fetching group:", err?.response?.data || err);
      return null;
    }
  };

  const fetchSessionTask = async (sessionId) => {
    try {
      const response = await api.get(`/studentProfile/sessions/${sessionId}/task`);
      sessionTask.value = response.data.data;
    } catch (error) {
      console.error("❌ Error fetching session task:", error);
      sessionTask.value = null;
    }
  };

  const getGroupById = (id) => {
    return groups.value.find((group) => group.id === id) || null;
  };
const submitSolution = async () => {
  if (!solutionTitle.value || !solutionText.value) {
    alert("❗ Please fill in both title and answer.");
    return;
  }

  try {
    await api.post(`/studentProfile/tasks/${task.value.id}/submit`, {
      solution_title: solutionTitle.value,
      solution_text: solutionText.value
    });

   showAlert("🎉 Task submitted successfully!", "success");
    closeModal();
    task.value.submitted = true;
  } catch (error) {
    const err = error.response?.data || error.message;
    console.error("❌ Error submitting task:", err);
    showAlert("❌ " + err, "danger");
  }
};


  return {
    student,
    studentStats,
    groups,
    loading,
    sessionTask,
    fetchStudentData,
    fetchGroupById,
    fetchSessionTask,
    getGroupById,
    submitSolution
  };
});
