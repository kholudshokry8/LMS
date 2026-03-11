<template>
  <div class="course-card">
    <img :src="course.image" alt="Course Image" />
    <h3>{{ course.title }}</h3>
    <p>{{ course.description }}</p>
    <router-link :to="'/courses/' + course.id">Course Details</router-link>
  </div>
</template>

<script>
export default {
  props: {
    course: Object
  }
};
</script>

<style scoped>
/* .course-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
} */
.course-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%; /* Adjust width dynamically */
  max-width: 25rem; /* Limit max width for balance */
  padding: 1.2rem 1.4rem;
  border-radius: 1rem; /* Smoother rounded corners */
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.1), -0.5rem -0.5rem 1rem rgba(255, 255, 255, 0.7);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

/* Improve hover effect */
.course-card:hover {
  transform: translateY(-0.4rem);
  box-shadow: 0.75rem 0.75rem 1.5rem rgba(0, 0, 0, 0.15), -0.75rem -0.75rem 1.5rem rgba(255, 255, 255, 0.9);
}

/* Improve image styling */
.course-card img {
  width: 100%;
  max-width: 90%; /* Ensure a balanced size */
  height: auto;
  border-radius: 0.75rem; /* Rounded image corners */
  object-fit: cover; /* Ensures proper scaling */
  box-shadow: 0.25rem 0.25rem 0.625rem rgba(0, 0, 0, 0.1);
}

/* Improve text styling */
.course-card h3 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1D2026; /* Darker color for better readability */
  margin-top: 0.75rem;
  text-align: center;
}

.course-card p {
  font-size: 1.1rem;
  color: #4E5566; /* Softer text color */
  text-align: center;
  margin: 0.5rem 0;
}

/* Improve link styling */
.course-card a {
  display: inline-block;
  padding: 0.625rem 1rem;
  margin-top: 0.75rem;
  border-radius: 0.5rem;
  background-color: #E75D24; /* Primary accent color */
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.3s ease-in-out, transform 0.2s;
}

.course-card a:hover {
   background-color: white; /* Primary accent color */
  color: #E75D24;
  transform: translateY(-0.125rem);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .course-card {
    width: 95%;
    max-width: 20rem;
    padding: 1rem 1.2rem;
  }

  .course-card h3 {
    font-size: 1.3rem;
  }

  .course-card p {
    font-size: 1rem;
  }

  .course-card a {
    font-size: 1rem;
    padding: 0.5rem 0.9rem;
  }
}

@media (max-width: 480px) {
  .course-card {
    width: 100%;
    max-width: 18rem;
    padding: 0.8rem 1rem;
  }

  .course-card h3 {
    font-size: 1.2rem;
  }

  .course-card p {
    font-size: 0.9rem;
  }

  .course-card a {
    font-size: 0.9rem;
    padding: 0.5rem 0.8rem;
  }
}

</style>