<template>
  <div class="course-card">
    <img :src="transaction.image" alt="Course Image" />
    <h3>{{ transaction.title }}</h3>
    <p>{{ transaction.description }}</p>
    <router-link :to="'/Transactions/' + transaction.id"
      >Course Details</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    transaction: Object,
  },
};
</script>

<style scoped>
.course-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
}
</style>
