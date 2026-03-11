<template>

<h4>Groups</h4>

<table class="table table-bordered">

<thead>
<tr>
<th>Name</th>
<th>Students</th>
<th>Sessions</th>
<th>Next Session</th>
<th>Action</th>
</tr>
</thead>

<tbody>

<tr
v-for="group in groups"
:key="group.id"
>

<td>{{group.name}}</td>

<td>{{group.students_count}}</td>

<td>{{group.sessions_count}}</td>

<td>

{{group.next_session?.title || "---"}}

</td>

<td>

<button
class="btn btn-primary btn-sm"
@click="$emit('selectGroup',group.id)"
>

View Sessions

</button>

</td>

</tr>

</tbody>

</table>

</template>

<script setup>

defineProps({
 groups:Array
})

</script>