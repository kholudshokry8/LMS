// parentProfile/store/parentStore.js

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import * as api from '../services/parentService';

export const useParentStore = defineStore('parent', () => {
  // State
  const parent = ref(null);
  const children = ref([]);
  const child = ref(null);
  const groups = ref([]);
  const groupDetails = ref({});
  const sessions = ref([]);
  const feedbacks = ref([]);
  const loading = ref(true);

  // Computed
  const childrenCount = computed(() => children.value.length);

  // ----------------------------
  // ✅ Fetch parent profile & children
  // ----------------------------
  const fetchParentWithChildren = async () => {
    loading.value = true;
    try {
      const res = await api.getParentProfile();
      console.log("🔥 RAW Response:", res);

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

      console.log("✅ Processed Children:", children.value);
    } catch (e) {
      console.error("❌ Error fetching parent profile:", e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  // ----------------------------
  // ✅ Fetch child details & their groups
  // ----------------------------
  const fetchChildDetails = async (childId) => {
    loading.value = true;
    try {
      const res = await api.getChildDetails(childId);
      console.log("🔍 Full API Response:", res);

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
          startDate: group.start_date || "N/A",
          attendance: evaluation ? evaluation.attendance_percentage : 0,
          tasks: evaluation ? evaluation.average_task_grade : 0
        };
      });

      console.log("✅ Processed Groups:", groups.value);
    } catch (e) {
      console.error("❌ Error fetching child details:", {
        error: e,
        response: e.response?.data
      });
    } finally {
      loading.value = false;
    }
  };

  // ----------------------------
  // ✅ Fetch group details & feedbacks
  // ----------------------------
const fetchGroupDetails = async (childId, groupId) => {
  loading.value = true;
  try {
    const data =await api.getChildGroupDetails(childId, groupId); // ✅ Fix here

    console.log("🧾 Final loaded group data:", data);

    groupDetails.value = {
      name: data.group_name,
      course: data.course_title,
      instructor: data.instructor_name,
      attendance: data.final_evaluation?.attendance_percentage ?? 0,
      tasks: data.final_evaluation?.average_task_grade ?? 0
    };

    sessions.value = data.sessions || [];
    feedbacks.value = data.feedbacks || [];

    console.log("✅ Sessions inside store:", sessions.value);
  } catch (e) {
    console.error("❌ Error in fetchGroupDetails:", e);
  } finally {
    loading.value = false;
  }
};

  // ----------------------------
  // 🧮 Helpers
  // ----------------------------
  const calculateAge = (birthDate) => {
    try {
      if (!birthDate) return null;
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      return age;
    } catch (e) {
      console.error("❌ Error calculating age:", e);
      return null;
    }
  };

  const calculateAttendance = (sessions) => {
    if (!Array.isArray(sessions) || sessions.length === 0) return 0;
    const attended = sessions.filter(s => Array.isArray(s.attendances) && s.attendances.some(a => a.attended)).length;
    return ((attended / sessions.length) * 100).toFixed(0);
  };

  // ----------------------------
  // Return
  // ----------------------------
  return {
    // State
    parent,
    children,
    child,
    groups,
    groupDetails,
    feedbacks,
    sessions,
    loading,

    // Computed
    childrenCount,

    // Actions
    fetchParentWithChildren,
    fetchChildDetails,
    fetchGroupDetails,

    // Helpers
    calculateAge,
    calculateAttendance
  };
});
