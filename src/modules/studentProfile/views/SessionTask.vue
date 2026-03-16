<template>
  <div class="task-container" v-if="task">
    <div class="card shadow-lg p-4 bg-white rounded">
      <h2 class="fw-bold text-primary mb-3">📝 Task: {{ task.title }}</h2>

      <p class="text-muted mb-2">
        <strong>🗓️ Due Date:</strong> {{ task.due_date || 'N/A' }}
      </p>

      <p class="mb-4">
        <strong>📄 Description:</strong>
        {{ task.description || 'No description provided.' }}
      </p>

      <!-- لو الطالب مسلم التاسك -->
      <div v-if="task.submission">
        <p class="alert alert-success">✅ You already submitted this task.</p>

        <p>
          <strong>📊 Grade:</strong>
          {{ task.submission.grade || 'Pending' }}
        </p>

        <p v-if="task.submission.instructor_note">
          <strong>💬 Instructor Note:</strong>
          {{ task.submission.instructor_note }}
        </p>
      </div>

      <!-- لو الطالب لم يسلم -->
      <div v-else>
        <button class="btn btn-fun" @click="showModal = true">
          🚀 Submit My Answer
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content fun-modal p-4">

          <div class="modal-header">
            <h5 class="modal-title">✍️ Submit Your Answer</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>

          <!-- Alert -->
          <div v-if="alertMessage" :class="`alert alert-${alertType}`">
            {{ alertMessage }}
          </div>

          <div class="modal-body">

            <div class="mb-3">
              <label class="form-label">📌 Title:</label>
              <input
                v-model="solutionTitle"
                type="text"
                class="form-control fun-input"
                placeholder="Write a title for your answer"
              />
            </div>

            <div class="mb-3">
              <label class="form-label">📝 Your Answer:</label>
              <textarea
                v-model="solutionText"
                class="form-control fun-textarea"
                rows="4"
                placeholder="Write your awesome solution here ✨"
              ></textarea>
            </div>

          </div>

          <div class="modal-footer d-flex justify-content-between">
            <button class="btn btn-fun-submit" @click="submitSolution">
              ✅ Send
            </button>

            <button class="btn btn-secondary" @click="closeModal">
              ❌ Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>

<!-- Loading -->
<div v-if="loading" class="text-center mt-5">
  <h4>⏳ Loading task details...</h4>
</div>

<!-- No Task -->
<div v-else-if="!task" class="text-center mt-5">
  <div class="alert alert-info">
    📌 No task has been assigned for this session yet.
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { submitTask, getSessionTask } from "../services/studentService";

const route = useRoute();
const sessionId = route.params.sessionId;

const task = ref(null);
const showModal = ref(false);
const solutionTitle = ref("");
const solutionText = ref("");
const loading = ref(true);

const alertMessage = ref("");
const alertType = ref("success");

const showAlert = (message, type = "success") => {
  alertMessage.value = message;
  alertType.value = type;

  setTimeout(() => {
    alertMessage.value = "";
  }, 4000);
};

onMounted(async () => {
  try {
    const response = await getSessionTask(sessionId);
    task.value = response.data.data;
  } catch (error) {
    console.error("❌ Error loading task:", error);
  } finally {
    loading.value = false;
  }
});

const closeModal = () => {
  showModal.value = false;
  solutionTitle.value = "";
  solutionText.value = "";
  alertMessage.value = "";
};

const submitSolution = async () => {

  if (!solutionTitle.value || !solutionText.value) {
    showAlert("❗ Please fill in both title and answer.", "warning");
    return;
  }

  try {

    await submitTask(task.value.id, {
      title: solutionTitle.value,
      answer: solutionText.value
    });

    showAlert("🎉 Task submitted successfully!", "success");

    closeModal();

    // تحديث الحالة بعد التسليم
    task.value.submission = {
      answer: solutionText.value,
      grade: null,
      instructor_note: null
    };

  } catch (error) {

    const errMsg =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong.";

    if ([401, 403].includes(error.response?.status)) {
      showAlert("🔐 Session expired. Please login again.", "danger");
    } else {
      showAlert("❌ " + errMsg, "danger");
    }

    console.error("❌ Error submitting task:", error);
  }
};
</script>

<style scoped>
.task-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Comic Neue', cursive, sans-serif;
}

.btn-fun {
  background-color: #00b894;
  color: white;
  font-weight: bold;
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  transition: all 0.3s;
}

.btn-fun:hover {
  background-color: #019174;
}

.modal {
  background: rgba(0,0,0,0.5);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.fun-modal {
  background-color: #fdfcfa;
  border-radius: 16px;
  border: 2px solid #00cec9;
  font-family: 'Comic Neue', cursive;
  animation: fadeIn 0.3s ease-in-out;
}

.fun-input,
.fun-textarea {
  border: 2px dashed #74b9ff;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
}

.btn-fun-submit {
  background-color: #6c5ce7;
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 10px;
  font-weight: bold;
}

.btn-fun-submit:hover {
  background-color: #4834d4;
}

@keyframes fadeIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>