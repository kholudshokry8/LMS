<template>
  <div class="mt-4">
    <!-- <h2>All Courses</h2> -->
    <CourseList />
  
  </div>

</template>

<script>
import CourseList from "../components/CourseList.vue";
import CourseCard from "../components/CourseCard.vue";
export default {
  components: { CourseList 
   }

};
</script>