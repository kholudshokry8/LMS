<template>
    <div class="student-card">
      <img :src="student.image" alt="Student Image" />
      <h3>{{ student.name }}</h3>
      <p>{{ student.bio }}</p>
      <router-link :to="'/students/' + student.id">Student Details</router-link>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      student: Object
    }
  };
  </script>
  
  <style scoped>
  .student-card {
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
  }
  
  .student-card img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  
  .student-card h3 {
    font-size: 1.2em;
    margin: 10px 0;
  }
  
  .student-card p {
    font-size: 1em;
    color: #555;
  }
  
  .student-card a {
    display: inline-block;
    margin-top: 15px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    text-decoration: none;
  }
  
  .student-card a:hover {
    background-color: #0056b3;
  }
  </style>
  