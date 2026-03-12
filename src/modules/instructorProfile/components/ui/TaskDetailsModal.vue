<template>
  <div class="modal fade" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5>{{ isAddMode ? "Add Task" : "Task Details" }}</h5>
          <button type="button" class="btn-close" @click="close"></button>
        </div>

        <div class="modal-body">

          <!-- Add Task -->
          <div v-if="isAddMode">

            <div class="mb-3">
              <label class="form-label">Title</label>
              <input v-model="taskForm.title" type="text" class="form-control" />
            </div>

            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea v-model="taskForm.description" class="form-control"></textarea>
            </div>

            <div class="mb-3">
              <label class="form-label">Due Date</label>
              <input v-model="taskForm.due_date" type="date" class="form-control" />
            </div>

          </div>

          <!-- View Task -->
          <div v-else>

            <p><b>Title:</b> {{ task?.title }}</p>

            <p><b>Description:</b> {{ task?.description }}</p>

            <p><b>Due Date:</b> {{ task?.due_date }}</p>

            <p v-if="task?.submitted_at">
              <b>Submitted At:</b> {{ task.submitted_at }}
            </p>

            <p v-if="task?.answer">
              <b>Student Answer:</b> {{ task.answer }}
            </p>

          </div>

        </div>

        <div class="modal-footer">

          <button
            v-if="isAddMode"
            class="btn btn-success"
            @click="submitTask"
          >
            Add Task
          </button>

          <button class="btn btn-secondary" @click="close">
            Close
          </button>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useInstructorProfileStore } from "../../store/instructorProfileStore.js";

const store = useInstructorProfileStore();

const selectedGroup = computed(() => store.selectedGroup);

const modal = ref(null);
const task = ref(null);
const currentSession = ref(null);
const isAddMode = ref(false);

const taskForm = ref({
  title: "",
  description: "",
  due_date: "",
  session_id: null,
});

const open = (t) => {

  isAddMode.value = false;

  task.value = t;

  const modalInstance = new window.bootstrap.Modal(modal.value);

  modalInstance.show();

};

const openAdd = (session) => {

  isAddMode.value = true;

  currentSession.value = session;

  taskForm.value = {
    title: "",
    description: "",
    due_date: "",
    session_id: session.id
  };

  const modalInstance = new window.bootstrap.Modal(modal.value);

  modalInstance.show();

};

const close = () => {

  const modalInstance = window.bootstrap.Modal.getInstance(modal.value);

  if (modalInstance) modalInstance.hide();

};

const submitTask = async () => {

  try {

    await store.addTask(taskForm.value.session_id, {
      title: taskForm.value.title,
      description: taskForm.value.description,
      due_date: taskForm.value.due_date
    });

    alert("Task added successfully");

    close();

    await store.fetchGroup(selectedGroup.value.data.id);

  } catch (err) {

    console.error(err);

    alert("Failed to add task");

  }

};

defineExpose({ open, openAdd });
</script>