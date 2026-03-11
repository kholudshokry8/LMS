<template>

<div class="row mb-4">

<div class="col-md-3">
<div class="card stat-card bg-success">
<h5>Groups</h5>
<h3>{{ dashboard?.groups_count }}</h3>
</div>
</div>

<div class="col-md-3">
<div class="card stat-card bg-primary">
<h5>Students</h5>
<h3>{{ dashboard?.total_students }}</h3>
</div>
</div>

<div class="col-md-3">
<div class="card stat-card bg-warning">
<h5>Sessions</h5>
<h3>{{ dashboard?.total_sessions }}</h3>
</div>
</div>

<div class="col-md-3">
<div class="card stat-card bg-purple">
<h5>Hours</h5>
<h3>{{ dashboard?.total_hours }}</h3>
</div>
</div>

</div>

</template>

<script setup>

defineProps({
 dashboard:Object
})

</script>

<style scoped>

.stat-card{
padding:20px;
color:white;
border-radius:12px;
text-align:center;
}

.bg-purple{
background:#8e44ad;
}

</style>