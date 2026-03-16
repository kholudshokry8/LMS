<template>
  <div class="modal fade" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Evaluate Task</h5>
        </div>

        <div class="modal-body">
          <p class="mb-2"><strong>Student Answer:</strong></p>
          <p class="border p-2 mb-3">{{ submission?.answer }}</p>

          <input
            type="number"
            class="form-control mb-2"
            v-model="score"
            placeholder="Score"
          />

          <textarea
            class="form-control"
            v-model="feedback"
            placeholder="Feedback"
          />
        </div>

        <div class="modal-footer">
          <button class="btn btn-primary" @click="submit">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from "vue";
import { useInstructorProfileStore } from "../../store/instructorProfileStore";

const store = useInstructorProfileStore();
const modal = ref(null);
const submission = ref(null);
const taskId = ref(null);
const score = ref("");
const feedback = ref("");

const open = (data) => {
  if (!data || !data.submission) return console.error("Invalid data", data);

  submission.value = data.submission;
  taskId.value = data.taskId;

  score.value = "";
  feedback.value = "";

  new bootstrap.Modal(modal.value).show();
};

const submit = async () => {
  if (!score.value) return alert("Please enter a score");
  if (!submission.value) return alert("Submission not loaded");

  try {
await store.evaluateTask({
  taskId: taskId.value,
  student_id: submission.value.student_id,
  score: Number(score.value),
instructor_note: feedback.value
});

// بعد التقييم حدث الجدول مباشرة:
alert("Evaluation submitted successfully");
    const modalInstance = bootstrap.Modal.getInstance(modal.value);
    if (modalInstance) modalInstance.hide();

    alert("Evaluation submitted successfully");

    // تحديث الجدول بعد التقييم
  } catch (err) {
    console.error(err);
    alert("Evaluation failed: " + err.message);
  }
};

defineExpose({ open });
</script>