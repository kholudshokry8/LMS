<template>
  <div class="course-card">
    <img :src="instructor.image" alt="Course Image" />
      <h3>{{ instructor.title }}</h3>
      <p>{{ instructor.description }}</p>
      <router-link :to="'/instructors/' + instructor.id">Course Details</router-link>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      instructor: Object
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
  