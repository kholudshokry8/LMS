<!-- parentProfile/views/GroupDetails.vue -->
<template>
  <div class="container py-5">
    <h3 class="mb-4 text-primary">
      <i class="bi bi-people-fill me-2"></i>Group Details
    </h3>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <!-- Group Data -->
    <div v-else-if="groupDetails" class="row g-4">
      <!-- Group Info Card -->
      <div class="col-md-6">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-bookmark-check me-2"></i>Group Info
            </h5>

            <p><strong>Group Name:</strong> {{ groupDetails.name }}</p>
            <p><strong>Course:</strong> {{ groupDetails.course }}</p>
            <p><strong>Instructor:</strong> {{ groupDetails.instructor }}</p>

            <p>
              <strong>Attendance:</strong>
              <span class="badge bg-success">
                {{ groupDetails.attendance }}%
              </span>
            </p>

            <p>
              <strong>Tasks Done:</strong>
              <span class="badge bg-info text-dark">
                {{ groupDetails.tasks }}%
              </span>
            </p>
          </div>
        </div>
      </div>

      <!-- Feedback Card -->
      <!-- <div class="col-md-6">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-chat-left-text me-2"></i>Overall Feedback
            </h5>

            <div v-if="feedbacks.length">
              <ul class="list-group list-group-flush">
                <li
                  v-for="(feedback, index) in feedbacks"
                  :key="index"
                  class="list-group-item"
                >
                  {{ feedback.comment || "No comment" }}
                </li>
              </ul>
            </div>

            <div v-else class="text-muted">
              No feedbacks available.
            </div>
          </div>
        </div>
      </div> -->
    </div>

    <!-- Sessions Table -->
    <div v-if="sessions.length" class="mt-5">
      <h5 class="mb-3">
        <i class="bi bi-calendar-check me-2"></i>Session Attendance, Tasks & Feedback
      </h5>

      <div class="table-responsive">
        <table class="table table-bordered table-striped align-middle">
          <thead class="table-light">
            <tr>
              <th>#</th>
              <th>Session</th>
              <th>Date</th>
              <th>Attendance</th>
              <th>Task Status</th>
              <th>Grade</th>
              <th>Feedback</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(session, index) in sessions" :key="session.session_id">
              <td>{{ index + 1 }}</td>
              <td>{{ session.title }}</td>
              <td>{{ session.date }}</td>

              <!-- Attendance -->
              <td>
                <span
                  :class="{
                    'badge bg-success': session.attendance === 'Present',
                    'badge bg-danger': session.attendance !== 'Present'
                  }"
                >
                  {{ session.attendance }}
                </span>
              </td>

              <!-- Task Status -->
              <td>
                <span v-if="!session.task" class="text-muted">
                  No Task
                </span>

                <span v-else-if="session.task.submitted" class="badge bg-success">
                  Submitted
                </span>

                <span v-else class="badge bg-warning text-dark">
                  Not Submitted
                </span>
              </td>

              <!-- Grade -->
              <td>
                <!-- grade from evaluation first -->
                <span v-if="session.evaluation && session.evaluation.score !== null">
                  {{ session.evaluation.score }}%
                </span>

                <!-- grade from task -->
                <span v-else-if="session.task && session.task.grade !== null">
                  {{ session.task.grade }}%
                </span>

                <!-- submitted but not graded -->
                <span
                  v-else-if="session.task && session.task.submitted"
                  class="text-muted"
                >
                  Waiting for grading
                </span>

                <!-- no grade -->
                <span v-else class="text-muted">—</span>
              </td>

              <!-- Feedback per session -->
              <td>
                <span v-if="session.evaluation && session.evaluation.comment">
                  {{ session.evaluation.comment }}
                </span>
                <span v-else class="text-muted">—</span>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- No Data -->
    <div v-else class="alert alert-warning mt-4 text-center">
      <i class="bi bi-exclamation-circle me-2"></i>
      No group details found.
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useRoute } from "vue-router"
import { useParentStore } from "../store/parentStore"
import { storeToRefs } from "pinia"

const store = useParentStore()
const route = useRoute()

const childId = route.params.childId
const groupId = route.params.groupId

const { groupDetails, sessions, feedbacks, loading } = storeToRefs(store)

onMounted(async () => {
  console.log("📦 Fetching Group Details:", { childId, groupId })
  await store.fetchGroupDetails(childId, groupId)
})
</script>