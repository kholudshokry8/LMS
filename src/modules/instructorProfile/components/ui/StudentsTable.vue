<template>
  <div class="card mt-4">
    <div class="card-header bg-primary text-white">
      <h5 class="mb-0">Students - {{ session.session_title }}</h5>
    </div>

    <div class="card-body p-0">
      <div v-if="loading" class="text-center p-3">
        Loading students...
      </div>

      <table v-else class="table table-striped mb-0">
        <thead class="table-dark">
          <tr>
            <th>Name</th>
            <th>Task Submitted</th>
            <th>Attended</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.name }}</td>
            <td>
              <span v-if="student.task_submission">✅</span>
              <span v-else>❌</span>
            </td>
            <td>
              <span v-if="student.attended">✅</span>
              <span v-else>❌</span>
            </td>
            <td class="d-flex gap-2">
              <button
                class="btn btn-sm btn-primary"
                @click="$emit('viewTask', {
                  task: session.task,
                  submission: student.task_submission
                })"
                :disabled="!student.task_submission"
              >
                View Task
              </button>

              <!-- زرار Evaluate -->
              <button
                class="btn btn-sm btn-success"
                @click="openEvaluateModal(student)"
                :disabled="!student.task_submission || !session.task"
              >
                Evaluate
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <EvaluateModal ref="modalRef" @evaluated="fetchStudents" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useInstructorProfileStore } from "../../store/instructorProfileStore.js";
import EvaluateModal from "./EvaluateTaskModal.vue";

const props = defineProps({ session: Object });

const store = useInstructorProfileStore();
const students = ref([]);
const loading = ref(false);

const modalRef = ref(null);

// فتح المودال عند الضغط على زر Evaluate
const openEvaluateModal = (student) => {
  if (!student.task_submission) return alert("No submission to evaluate");

  modalRef.value.open({
    submission: student.task_submission,
    taskId: props.session.task?.id
  });
};

// جلب الطلاب وربطهم بالـ submissions
const fetchStudents = async () => {
  const groupId = store.selectedGroup?.data?.id;
  if (!groupId || !props.session?.id) return;

  loading.value = true;
  try {
    await store.fetchGroup(groupId);
    const group = store.selectedGroup?.data;

    await store.fetchTaskSubmissions(props.session.id);

    let submissions = [];
    if (store.taskSubmissions) {
      if (store.taskSubmissions.task && Array.isArray(store.taskSubmissions.task.submissions)) {
        submissions = store.taskSubmissions.task.submissions;
      } else if (Array.isArray(store.taskSubmissions)) {
        submissions = store.taskSubmissions;
      }
    }

    const sessionData = group.sessions?.find(s => s.id === props.session.id);

    students.value = (group.students || []).map(student => {
      const attendance = sessionData?.attendances?.find(
        a => Number(a.student_id) === Number(student.id)
      );
      const submission = submissions.find(
        sub => Number(sub.student_id) === Number(student.id)
      ) || null;

      return {
        ...student,
        task_submission: submission,
        attended: attendance ? attendance.attended : false
      };
    });

  } catch (err) {
    console.error("Failed to fetch students:", err);
    alert("Failed to fetch students");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchStudents);
watch(() => props.session, fetchStudents);
</script>