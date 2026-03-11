<template>

<h4 class="mt-4">
Students
</h4>

<table class="table table-bordered">

<thead>

<tr>
<th>Name</th>
<th>Attendance</th>
<th>Task</th>
<th>Evaluate</th>
</tr>

</thead>

<tbody>

<tr
v-for="a in session.attendances"
:key="a.id"
>

<td>{{a.student.name}}</td>

<td>

<span
class="badge"
:class="a.attended ? 'bg-success':'bg-secondary'"
>

{{a.attended?'Present':'Absent'}}

</span>

</td>

<td>

<button
class="btn btn-info btn-sm"
@click="$emit('viewTask',session.task)"
>

View Task

</button>

</td>

<td>

<button
class="btn btn-primary btn-sm"
@click="$emit('evaluate',a)"
>

Evaluate

</button>

</td>

</tr>

</tbody>

</table>

</template>

<script setup>

defineProps({
 session:Object
})

</script>