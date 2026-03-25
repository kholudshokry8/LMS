import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import * as api from '../services/parentService';

export const useParentStore = defineStore('parent', () => {
  const parent = ref(null);
  const children = ref([]);
  const child = ref(null);
  const groups = ref([]);
  const groupDetails = ref({});
  const sessions = ref([]);
  const feedbacks = ref([]);
  const loading = ref(true);

  const childrenCount = computed(() => children.value.length);

  const fetchParentWithChildren = async () => {
    loading.value = true;
    try {
      const res = await api.getParentProfile();
      const parentData = res.data.data;
      const rawChildren = parentData.children || [];

      const processedChildren = rawChildren.map(child => {
        const firstGroup = child.student_groups?.[0];
        return {
          ...child,
          age: calculateAge(child.birth_date),
          course: firstGroup?.course?.title || "No Course",
          attendance: calculateAttendance(firstGroup?.sessions || [])
        };
      });

      parent.value = parentData;
      children.value = processedChildren;

    } catch (e) {
      console.error("❌ Error fetching parent profile:", e);
    } finally {
      loading.value = false;
    }
  };

  const fetchChildDetails = async (childId) => {
    loading.value = true;
    try {
      const res = await api.getChildDetails(childId);
      const childData = res.data.data;
      const evaluations = res.data.final_evaluation || [];

      child.value = {
        id: childData.id,
        name: childData.name,
        email: childData.email
      };

      groups.value = (childData.student_groups || []).map(group => {
        const evaluation = evaluations.find(e => e.group_id === group.id);
        return {
          id: group.id,
          name: group.name,
          course: group.course?.title || "No Course",
          startDate: group.start_date,
          attendance: evaluation?.attendance_percentage ?? 0,
          tasks: calculateTaskSubmission(group.sessions)
        };
      });

    } catch (e) {
      console.error("❌ Error fetching child details:", e);
    } finally {
      loading.value = false;
    }
  };

  const fetchGroupDetails = async (childId, groupId) => {
    loading.value = true;
    try {
      const data = await api.getChildGroupDetails(childId, groupId);

      groupDetails.value = {
        name: data.group_name,
        course: data.course_title,
        instructor: data.instructor_name,
        attendance: data.final_evaluation?.attendance_percentage ?? 0,
        tasks: calculateTaskPercentage(data.sessions)
      };

      sessions.value = data.sessions || [];
      feedbacks.value = data.sessions
        .filter(s => s.evaluation && s.evaluation.comment)
        .map(s => s.evaluation);

    } catch (e) {
      console.error("❌ Error in fetchGroupDetails:", e);
    } finally {
      loading.value = false;
    }
  };

  // Helpers
  const calculateAge = (birthDate) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const calculateAttendance = (sessions) => {
    if (!Array.isArray(sessions) || sessions.length === 0) return 0;
    const attended = sessions.filter(s => Array.isArray(s.attendances) && s.attendances.some(a => a.attended)).length;
    return ((attended / sessions.length) * 100).toFixed(0);
  };

  const calculateTaskSubmission = (sessions) => {
    if (!Array.isArray(sessions) || sessions.length === 0) return 0;
    const submitted = sessions.filter(s => s.task?.submitted).length;
    return Math.round((submitted / sessions.length) * 100);
  };

  const calculateTaskPercentage = (sessions) => {
    const tasks = sessions.filter(s => s.task !== null);
    if (!tasks.length) return 0;
    const submitted = tasks.filter(t => t.task.submitted).length;
    return Math.round((submitted / tasks.length) * 100);
  };

  return {
    parent,
    children,
    child,
    groups,
    groupDetails,
    sessions,
    feedbacks,
    loading,
    childrenCount,
    fetchParentWithChildren,
    fetchChildDetails,
    fetchGroupDetails,
    calculateAge,
    calculateAttendance,
    calculateTaskSubmission,
    calculateTaskPercentage
  };
});