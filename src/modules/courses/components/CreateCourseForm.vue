<template>
  <div class="container">
    <div ref="topRef"></div>

    <h1 class="title">Create Course</h1>
    <form @submit.prevent="saveChanges" class="create-course">
      <AlertMessage v-if="alert.show && alert.message" :message="alert.message" :type="alert.type" />

      <!-- Course Basic Info -->
      <div class="form-row">
        <div class="form-group">
          <label>Title:</label>
          <input type="text" v-model="course.title" required />
        </div>

        <div class="form-group">
          <label>Description:</label>
          <textarea v-model="course.description" required></textarea>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Duration (Hours):</label>
          <input type="number" v-model="course.duration" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Language:</label>
          <input type="text" v-model="course.language" required />
        </div>

        <div class="form-group">
          <label>Price:</label>
          <input type="number" v-model="course.price" required />
        </div>
      </div>


      <div class="form-row">
        <div class="form-group">
          <label>Category:</label>
          <select v-model="course.category_id">
            <option disabled value="">Select a category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Youtube Video Link:</label>
          <input type="url" v-model="course.youtube_video" />
        </div>
      </div>

      <div class="form-row w-50">
        <div class="form-group">
          <label>Course_Image:</label>
          <input type="file" required @change="handleFileImage" />
        </div>
      </div>

      <div class="flex-wrap d-flex">
        <!-- Requirements Section -->
        <div class="form-group m-2">
          <label class="me-1">Requirements:</label>
          <div v-for="(req, index) in course.requirements" :key="index">
            <input type="text" v-model="course.requirements[index]" />
            <button type="button" class="btn my-1" @click="removeRequirement(index)">❌</button>
          </div>
          <button type="button" class="btn btn-success my-1" @click="addRequirement">
            + Add Requirement
          </button>
        </div>

        <!-- What you'll learn -->
        <div class="form-group m-2">
          <label class="me-1">What you will learn:</label>
          <div v-for="(learn, index) in course.learning" :key="index">
            <input type="text" v-model="course.learning[index]" />
            <button type="button" class="btn my-1" @click="removeLearn(index)">❌</button>
          </div>
          <button type="button" class="btn btn-success my-1" @click="addLearn">+ Add Item</button>
        </div>

        <!-- Audience -->
        <div class="form-group m-2">
          <label class="me-1">Who is this course for?</label>
          <div v-for="(audience, index) in course.who_is_for" :key="index">
            <input type="text" v-model="course.who_is_for[index]" />
            <button type="button" class="btn my-1" @click="removeAudience(index)">❌</button>
          </div>
          <button type="button" class="btn btn-success my-1" @click="addAudience">
            + Add Audience
          </button>
        </div>

        <!-- Level -->
        <div class="form-group m-2">
          <label class="me-1">Enter Level</label>
          <div v-for="(level, index) in course.level" :key="index">
            <input type="text" v-model="level.name" placeholder="Level Name" class="mb-1" />
            <input type="number" v-model="level.price" placeholder="Level Price" class="mb-1" />
            <button type="button" class="btn my-1" @click="removeLevel(index)">❌</button>
          </div>
          <button type="button" class="btn btn-success my-1" @click="addLevel">+ Add Level</button>
        </div>

        <!-- Curriculum -->
        <div class="form-group m-2">
          <label class="me-1">Curriculum:</label>
          <div v-for="(module, mIndex) in course.curriculum" :key="mIndex">
            <div class="d-flex">
              <input type="text" v-model="module.title" placeholder="Module Title" />
              <button type="button" class="btn my-1" @click="removeModule(mIndex)">❌</button>
            </div>

            <div class="ms-2 my-2" v-for="(lesson, lIndex) in module.lessons" :key="lIndex">
              <div class="d-flex">
                <input type="text" v-model="lesson.title" placeholder="Lesson Title" />
                <button type="button" class="btn my-1" @click="removeLesson(mIndex, lIndex)">❌</button>
              </div>

              <div class="d-flex ms-2 my-2" v-for="(content, cIndex) in lesson.contents" :key="cIndex">
                <input type="text" v-model="content.content" placeholder="Lesson Content" />
                <button type="button" class="btn my-1" @click="removeContent(mIndex, lIndex, cIndex)">❌</button>
              </div>

              <button type="button" class="btn btn-success my-1" @click="addContent(mIndex, lIndex)">
                + Add Content
              </button>
            </div>

            <button type="button" class="btn btn-success my-1" @click="addLesson(mIndex)">
              + Add Lesson
            </button>
          </div>

          <button type="button" class="btn btn-success my-1" @click="addModule">+ Add Module</button>
        </div>
      </div>

      <div class="buttons">
        <div class="form-group">
          <input type="checkbox" style="width: 2vw" v-model="course.show_in_home" />
          <label>Show in homepage</label>
        </div>
        <button type="submit" class="btn-save w-25">Save Course</button>
        <button type="button" @click="resetForm" class="btn-save w-25 mt-2 bg-danger">Delete Form</button>
      </div>
    </form>
  </div>
</template>
<style scoped>
.container {
  width: 75vw;
  padding: 20px;
  background: #f8f9fa;
  overflow-x: hidden; /* remove horizontal overflow */
}

.title {
  font-size: 32px;
  color: #d65622;
}

.create-course {
  width: 100%;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
  margin-bottom: 10px;
}

label {
  font-weight: bold;
  color: #d65622;
}

input,
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.buttons {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.btn-save {
  background: #d65622;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>

<script setup>
import axios from "axios";
import { ref , onMounted } from "vue";
import { useCoursesStore } from "../store/coursesStore";
import AlertMessage from "./AlertMessage.vue";
const topRef = ref(null);

const coursesStore = useCoursesStore();
const alert = ref({ show: false, message: "", type: "success" });

function showAlert(message, type = "success") {
  alert.value = { show: true, message, type };

  // ⬅️ هنا السطر اللي يسحب لفوق
  window.scrollTo({ top: 0, behavior: "smooth" });

  setTimeout(() => (alert.value.show = false), 3000);
}

const categories = ref([]);
onMounted(async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("https://stemers-backend.coodex-academy.com/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Full response:", response.data);

    // ثم جرب طباعة اللي جوه جوه:
    console.log("🔍 Deep:", response.data?.data?.data);

    // تعيين مؤقت
   console.log("✅ Response shape:", response.data);

categories.value = response.data.categories.data;


  } catch (error) {
    console.error("❌ ERROR:", error.response?.status, error.response?.data || error.message);
  }
});





const course = ref({
  title: "",
  description: "",
  duration: "",
  language: "",
  price: "",
  category_id: "",
  youtube_video: "",
  image: null,
  show_in_home: false,
  requirements: [],
  learning: [],
  who_is_for: [],
  level: [],
  curriculum: [],
  status: "published",
  rating: 4.8,
});

function handleFileImage(e) {
  const file = e.target.files[0];
  if (file) course.value.image = file;
}

function resetForm() {
  topRef.value?.scrollIntoView({ behavior: 'smooth' });

  Object.assign(course.value, {
    title: "",
    description: "",
    duration: 0,
    language: "",
    price: 0,
    category_id: "",
    youtube_video: "",
    image: null,
    show_in_home: false,
    requirements: [],
    learning: [],
    who_is_for: [],
    level: [],
    curriculum: [],
  });
  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach((input) => input.form?.reset());
}

async function saveChanges() {
  try {
      // window.scrollTo({ top: 0, behavior: "smooth" });
      topRef.value?.scrollIntoView({ behavior: 'smooth' });

    const formData = new FormData();
    formData.append("title", course.value.title);
    formData.append("description", course.value.description);
    formData.append("duration", course.value.duration);
    formData.append("level", JSON.stringify(course.value.level));
    formData.append("language", course.value.language);
    formData.append("price", course.value.price);
    formData.append("category_id", course.value.category_id);
    formData.append("youtube_video", course.value.youtube_video);
    formData.append("show_in_home", course.value.show_in_home ? 1 : 0);
    formData.append("image", course.value.image);
    formData.append("requirements", JSON.stringify(course.value.requirements));
    formData.append("learning", JSON.stringify(course.value.learning));
    formData.append("who_is_for", JSON.stringify(course.value.who_is_for));
    formData.append("curriculum", JSON.stringify(course.value.curriculum));
    formData.append("status", course.value.status);
    formData.append("rating", course.value.rating);

    await coursesStore.createCourse(formData);
    showAlert("Course saved successfully");
    resetForm();
  } catch (error) {
    topRef.value?.scrollIntoView({ behavior: 'smooth' });

      // window.scrollTo({ top: 0, behavior: "smooth" });
    showAlert("Failed to create course", "danger");
    console.error("Failed to create course:", error);
  }
}

const addRequirement = () => course.value.requirements.push("");
const removeRequirement = (i) => course.value.requirements.splice(i, 1);
const addLearn = () => course.value.learning.push("");
const removeLearn = (i) => course.value.learning.splice(i, 1);
const addAudience = () => course.value.who_is_for.push("");
const removeAudience = (i) => course.value.who_is_for.splice(i, 1);
const addLevel = () => course.value.level.push({ name: "", price: 0 });
const removeLevel = (i) => course.value.level.splice(i, 1);
const addModule = () => course.value.curriculum.push({ title: "", lessons: [] });
const removeModule = (i) => course.value.curriculum.splice(i, 1);
const addLesson = (moduleIndex) => course.value.curriculum[moduleIndex].lessons.push({ title: "", contents: [] });
const removeLesson = (m, l) => course.value.curriculum[m].lessons.splice(l, 1);
const addContent = (m, l) => course.value.curriculum[m].lessons[l].contents.push({ content: "" });
const removeContent = (m, l, c) => course.value.curriculum[m].lessons[l].contents.splice(c, 1);
</script>
