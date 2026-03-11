<template>

<div class="modal fade" ref="modal">

<div class="modal-dialog">

<div class="modal-content">

<div class="modal-header">

<h5>Evaluate Task</h5>

</div>

<div class="modal-body">

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

<button
class="btn btn-primary"
@click="submit"
>

Submit

</button>

</div>

</div>

</div>

</div>

</template>

<script setup>

import {ref} from "vue"

import {useInstructorProfileStore}
from "../../store/instructorProfileStore"

const store = useInstructorProfileStore()

const modal = ref(null)

const submission = ref(null)

const score = ref("")
const feedback = ref("")

const open = (s)=>{

submission.value = s

score.value = ""
feedback.value = ""

new bootstrap.Modal(modal.value).show()

}

const submit = async ()=>{

await store.evaluateTask({

taskId: submission.value.task_id,

submission_id: submission.value.id,

score: score.value,

feedback: feedback.value

})

}

defineExpose({open})

</script>