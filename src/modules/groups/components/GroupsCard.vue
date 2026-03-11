<template>
  <div class="course-card">
    <img :src="group.image" alt="Course Image" />
    <h3>{{ group.title }}</h3>
    <p>{{ group.description }}</p>
    <router-link :to="'/groups/' + group.id">Course Details</router-link>
  </div>
</template>

<script>
export default {
  props: {
    group: Object
  }
};
</script>

<style scoped>
.course-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
}
</style>
