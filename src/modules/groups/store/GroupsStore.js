import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/axios"; // axios المخصص اللي فيه baseURL + headers

export const useGroupsStore = defineStore("Groups", () => {
  const Groups = ref([]);
  const loading = ref(false);
  const Group = ref(null);
  const session = ref(null);

  const ENDPOINT = "/groups";
  const fetchGroups = async () => {
    loading.value = true;
    const response = await api.get(ENDPOINT);

    // Format the data
    Groups.value = response.data.map((group) => ({
      name: group.name,
      course: group.course?.title || "N/A",
      date: `${group.start_date?.split(" ")[0]} to ${
        group.end_date?.split(" ")[0]
      }`,
      studentsCount: group.students?.length || 0,
      days: group.days ? JSON.parse(group.days).join(", ") : "Not Set",
      original: group // احتياطي لو هتحتاجه في الـ edit/show
    }));

    loading.value = false;
  };
  const fetchGroupById = async (id) => {
    loading.value = true;

    try {
      const response = await api.get(`/groups/${id}`);
      Group.value = await response.data;
      loading.value = false;
    } catch (error) {
      console.error("Failed to fetch group:", error);
    } finally {
    }
  };
  const fetchSessionWithGroup = async (id) => {
    loading.value = true;
    try {
      const response = await api.get(`/sessions/${id}`); // لازم يكون عندك API endpoint زي دا
      session.value = response.data;
    } catch (error) {
      console.error("Error fetching session:", error);
    } finally {
      loading.value = false;
    }
  };

  const deleteGroup = async (id) => {
    try {
      await api.delete(`/groups/${id}`);
      console.log("Before delete:", Groups.value);
      Groups.value = Groups.value.filter((group) => group.original.id !== id);
      console.log("After delete:", Groups.value);
    } catch (error) {
      console.error("Failed to delete group:", error);
    }
  };
  return {
    Groups,
    session,
    loading,
    Group,
    fetchGroups,
    fetchGroupById,
    deleteGroup,
    fetchSessionWithGroup
  };
});
