<template>
  <div class="course-card">
    <h3>{{ category.title }}</h3>
    <p>{{ category.description }}</p>
    <router-link :to="'/categories/' + category.id">Category Details</router-link>
  </div>
</template>

<script setup>
defineProps({
  category: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>

</style>