<template>
  <div class="course-details container py-5">
    <div v-if="course">
      <!-- الصورة في المنتصف -->
      <div class="text-center mb-5">
        <h2 class="mb-4 text-primary fw-bold">{{ course.title }}</h2>
        <div class="image-box mx-auto border rounded overflow-hidden shadow-sm">
          <img :src="`${course.image}`" alt="Course Image" class="img-fluid" />
        </div>
        <div class="mt-3 w-100 d-flex justify-content-center">
          <a
            v-if="course.youtube_video"
            :href="course.youtube_video"
            class="btn btn-danger"
            target="_blank"
          >
            ▶ Watch on YouTube
          </a>
        </div>
      </div>

      <!-- المعلومات في عمودين -->
      <div class="row gx-5">
        <!-- العمود الأول -->
      

        <!-- العمود الثاني -->
        <div class="col-md-6 mb-4">
          <div v-if="course.requirements?.length">
            <h5 class="fw-semibold">Requirements:</h5>
            <ul class="list-unstyled ps-3">
              <li v-for="(req, index) in course.requirements" :key="index" class="text-muted">• {{ req.requirement }}</li>
            </ul>
          </div>

 <div v-if="course.learning?.length" class="mt-4">
  <h5 class="fw-semibold">What You'll Learn:</h5>
  <ul class="list-unstyled ps-3">
    <li
      v-for="(item, index) in course.learning"
      :key="index"
      class="text-muted"
    >
      ✔ {{ typeof item === 'object' ? item.title : item }}
    </li>
  </ul>
</div>


          <div v-if="course.curriculum?.length" class="mt-4">
            <h5 class="fw-semibold">Curriculum:</h5>
            <ul class="list-unstyled ps-3">
              <li v-for="(level, levelIndex) in course.curriculum" :key="levelIndex">
                <strong class="text-primary">📘 {{ level.title }}</strong>
                <ul class="list-unstyled ps-4">
                  <li v-for="(lesson, lessonIndex) in level.lessons" :key="lessonIndex" class="text-muted">
                    - {{ lesson.title }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
          <div class="col-md-6 mb-4">
        

          <div class="details fs-5">
            <p><strong>Category:</strong> {{ course.category?.name || 'N/A' }}</p>
            <p><strong>Language:</strong> {{ course.language || 'N/A' }}</p>
            <p><strong>Level:</strong> {{ course.level?.join(', ') || 'N/A' }}</p>
            <p><strong>Duration:</strong> {{ course.duration }} hr</p>
            <p><strong>Price:</strong> {{ course.price }} USD</p>
            <p><strong>Rating:</strong> {{ course.rating }}</p>
            <p><strong>Status:</strong> {{ course.status }}</p>
          </div>

          <div class="mt-4">
            <h5 class="fw-semibold">Description:</h5>
            <p class="text-muted">{{ course.description }}</p>
          </div>

          <div v-if="course.who_is_for?.length" class="mt-4">
            <h5 class="fw-semibold">Who is this course for?</h5>
            <ul class="list-unstyled ps-3">
              <li v-for="(target, index) in course.who_is_for" :key="index" class="text-muted">👤 {{ target }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-center text-danger fs-4 mt-5">
      No course found with the provided ID.
    </p>
  </div>
</template>

<style scoped>
.course-details {
  overflow-x: hidden; /* يمنع التمرير الأفقي */
}
.image-box {
  height: 320px;
  width: 320px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-box img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
h2 {
  color: #1d2026;
}
.details p {
  margin-bottom: 0.5rem;
}
ul li {
  margin-bottom: 0.4rem;
}
</style>






<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCoursesStore } from '../store/coursesStore';

const route = useRoute();
const store = useCoursesStore();
const course = ref(null);
const loading = ref(false);
const errorMessage = ref("");

// عند تحميل الصفحة
onMounted(async () => {
  const courseId = route.params.id;

  try {
    loading.value = true;
    // استدعاء الدالة من الـ store لجلب بيانات الكورس
    await store.fetchCourse(courseId);

    // تعيين الكورس في المتغير المحلي
    course.value = store.course; // نفترض أنك خزنت الـ course المفرد في store.course
  } catch (error) {
    errorMessage.value = "Failed to load course data.";
    console.error(error);
  } finally {
    loading.value = false;
  }
});
</script>
