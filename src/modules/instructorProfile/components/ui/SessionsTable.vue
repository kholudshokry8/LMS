<template>

<h4 class="mt-4">
Sessions for {{ group.name }}
</h4>

<table class="table table-bordered">

<thead>
<tr>
<th>Title</th>
<th>Date</th>
<th>Attendances</th>
<th>Action</th>
</tr>
</thead>

<tbody>

<tr
v-for="session in group.sessions"
:key="session.id"
>

<td>{{ session.title }}</td>

<td>{{ session.date }}</td>

<td>{{ session.attendances?.length }}</td>

<td class="d-flex gap-2">

<button
class="btn btn-info btn-sm"
@click="$emit('viewStudents', session)"
>
View Students
</button>

<!-- لو مفيش تاسك -->
<button
v-if="!session.task"
class="btn btn-success btn-sm"
@click="$emit('addTask', session)"
>
Add Task
</button>

<!-- لو فيه تاسك -->
<button
  @click="$emit('viewTask', session.task)"
  :disabled="!session.task"
  class="btn btn-secondary
   btn-sm"
>
  View Task
</button>

<button
v-if="session.task"
class="btn btn-danger btn-sm"
@click="$emit('deleteTask', session.task.id)"
>
Delete Task
</button>

</td>

</tr>

</tbody>

</table>

</template>

<script setup>

defineProps({
  group: Object
})

defineEmits([
  "viewStudents",
  "viewTask",
  "deleteTask",
  "addTask"
])

</script>