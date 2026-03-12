<template>
  <div class="container mt-4">

    <h2 class="mb-4">Instructor Dashboard</h2>

    <StatsCards :dashboard="dashboard"/>

    <GroupsTable
      :groups="dashboard?.data"
      @selectGroup="selectGroup"
    />

    <SessionsTable
      v-if="selectedGroup"
      :group="selectedGroup.data"
      @viewStudents="openStudents"
      @viewTask="openTask"
      @deleteTask="deleteTask"
      @addTask="openAddTask"
    />

    <StudentsTable
      v-if="selectedSession"
      :session="selectedSession"
      @viewTask="openTask"
      @evaluate="openEvaluate"
    />

    <TaskDetailsModal
      ref="taskModal"
      :groupId="selectedGroup?.data?.id"
    />

    <EvaluateTaskModal
      ref="evaluateModal"
    />

  </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useInstructorProfileStore } from "../store/instructorProfileStore.js";

import StatsCards from "../components/ui/StatsCards.vue";
import GroupsTable from "../components/ui/GroupsTable.vue";
import SessionsTable from "../components/ui/SessionsTable.vue";
import StudentsTable from "../components/ui/StudentsTable.vue";
import TaskDetailsModal from "../components/ui/TaskDetailsModal.vue";
import EvaluateTaskModal from "../components/ui/EvaluateTaskModal.vue";

const store = useInstructorProfileStore();

const dashboard = computed(() => store.dashboard);
const selectedGroup = computed(() => store.selectedGroup);
const selectedSession = ref(null);

const taskModal = ref(null);
const evaluateModal = ref(null);

onMounted(() => {
  store.fetchDashboard();
});

const selectGroup = async (id) => {
  await store.fetchGroup(id);
};

const openStudents = (session) => {
  selectedSession.value = session;
};

const openTask = (data) => {

  if (!data) {
    alert("Student has not submitted this task yet");
    return;
  }

  const task = data.task;
  const submission = data.submission;

  taskModal.value.open({
    title: task?.title || "No title",
    description: task?.description || "No description",
    due_date: task?.due_date || "",
    submitted_at: submission?.submitted_at || "",
    answer: submission?.answer || ""
  });

};

const openEvaluate = (data) => {
  if (!data || !data.submission || !data.taskId) {
    alert("No task or submission found to evaluate");
    return;
  }
  evaluateModal.value.open(data);
};
const openAddTask = (session) => {
  taskModal.value.openAdd(session);
};

const deleteTask = async (taskId) => {

  try {

    const res = await store.deleteTask(taskId);

    alert(res.message || "Task deleted successfully");

    await store.fetchGroup(selectedGroup.value.data.id);

  } catch (err) {

    console.error(err);

    alert("Failed to delete task");

  }

};
</script>