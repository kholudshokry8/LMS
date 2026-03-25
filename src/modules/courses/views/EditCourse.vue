<template>
  <div class="container">
    <div ref="topRef"></div>
    <h1 class="title">Edit Course</h1>

    <form @submit.prevent="saveChanges" class="create-course">
      <AlertMessage
        v-if="alert.show && alert.message"
        :message="alert.message"
        :type="alert.type"
      />

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
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
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
          <label>Course Image:</label>
          <input type="file" @change="handleFileImage" />
      <div v-if="course.imagePreview || course.image" class="mt-2">
  <img
    :key="course.imagePreview || course.image"
    :src="course.imagePreview || course.image"
    alt="Course Image"
    width="200"
/>
</div>

        </div>
      </div>

      <div class="flex-wrap d-flex">
        <!-- Requirements -->
        <div class="form-group m-2">
          <label class="me-1">Requirements:</label>
          <div v-for="(req, index) in course.requirements" :key="index">
            <input type="text" v-model="course.requirements[index]" />
            <button
              type="button"
              class="btn my-1"
              @click="removeRequirement(index)"
            >
              ❌
            </button>
          </div>
          <button
            type="button"
            class="btn btn-success my-1"
            @click="addRequirement"
          >
            + Add Requirement
          </button>
        </div>

        <!-- What you will learn -->
        <div class="form-group m-2">
          <label class="me-1">What you will learn:</label>
          <div v-for="(learn, index) in course.learning" :key="index">
            <input type="text" v-model="course.learning[index]" />
            <button type="button" class="btn my-1" @click="removeLearn(index)">
              ❌
            </button>
          </div>
          <button type="button" class="btn btn-success my-1" @click="addLearn">
            + Add Item
          </button>
        </div>

        <!-- Audience -->
        <div class="form-group m-2">
          <label class="me-1">Who is this course for?</label>
          <div v-for="(audience, index) in course.who_is_for" :key="index">
            <input type="text" v-model="course.who_is_for[index]" />
            <button
              type="button"
              class="btn my-1"
              @click="removeAudience(index)"
            >
              ❌
            </button>
          </div>
          <button
            type="button"
            class="btn btn-success my-1"
            @click="addAudience"
          >
            + Add Audience
          </button>
        </div>

        <!-- Levels -->
        <div class="form-group m-2">
          <label class="me-1">Enter Level</label>
          <div v-for="(level, index) in course.level" :key="index">
            <input
              type="text"
              v-model="level.name"
              placeholder="Level Name"
              class="mb-1"
            />
            <input
              type="number"
              v-model="level.price"
              placeholder="Level Price"
              class="mb-1"
            />
            <button type="button" class="btn my-1" @click="removeLevel(index)">
              ❌
            </button>
          </div>
          <button type="button" class="btn btn-success my-1" @click="addLevel">
            + Add Level
          </button>
        </div>

        <!-- Curriculum -->
        <div class="form-group m-2">
          <label class="me-1">Curriculum:</label>
          <div v-for="(module, mIndex) in course.curriculum" :key="mIndex">
            <div class="d-flex">
              <input
                type="text"
                v-model="module.title"
                placeholder="Module Title"
              />
              <button
                type="button"
                class="btn my-1"
                @click="removeModule(mIndex)"
              >
                ❌
              </button>
            </div>

            <div
              class="ms-2 my-2"
              v-for="(lesson, lIndex) in module.lessons"
              :key="lIndex"
            >
              <div class="d-flex">
                <input
                  type="text"
                  v-model="lesson.title"
                  placeholder="Lesson Title"
                />
                <button
                  type="button"
                  class="btn my-1"
                  @click="removeLesson(mIndex, lIndex)"
                >
                  ❌
                </button>
              </div>

              <div
                class="d-flex ms-2 my-2"
                v-for="(content, cIndex) in lesson.contents"
                :key="cIndex"
              >
                <input
                  type="text"
                  v-model="content.content"
                  placeholder="Lesson Content"
                />
                <button
                  type="button"
                  class="btn my-1"
                  @click="removeContent(mIndex, lIndex, cIndex)"
                >
                  ❌
                </button>
              </div>

              <button
                type="button"
                class="btn btn-success my-1"
                @click="addContent(mIndex, lIndex)"
              >
                + Add Content
              </button>
            </div>

            <button
              type="button"
              class="btn btn-success my-1"
              @click="addLesson(mIndex)"
            >
              + Add Lesson
            </button>
          </div>

          <button type="button" class="btn btn-success my-1" @click="addModule">
            + Add Module
          </button>
        </div>
      </div>

      <div class="buttons">
        <div class="form-group">
          <input
            type="checkbox"
            style="width: 2vw"
            v-model="course.show_in_home"
          />
          <label>Show in homepage</label>
        </div>
        <button type="submit" class="btn-save w-25">Save Changes</button>
        <button
          type="button"
          @click="resetForm"
          class="btn-save w-25 mt-2 bg-danger"
        >
          Delete Form
        </button>
      </div>
    </form>
  </div>
</template>


<style scoped>
.container {
  width: 75vw;
  padding: 20px;
  background: #f8f9fa;
  overflow-x: hidden;
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "@/axios"; // ✅ استيراد axios المجهز
import AlertMessage from "@/modules/courses/components/AlertMessage.vue";

const course = ref({
  title: "",
  description: "",
  duration: "",
  language: "",
  price: "",
  category_id: "",
  youtube_video: "",
  image: null,
  imagePreview: "",
  show_in_home: false,
  requirements: [],
  learning: [],
  who_is_for: [],
  level: [],
  curriculum: [],
});

const route = useRoute();
const courseId = route.params.id;
const topRef = ref(null);
const alert = ref({ show: false, message: "", type: "success" });

// const categories = ref([
//   { id: 1, name: "Programming" },
//   { id: 2, name: "Marketing" },
//   { id: 3, name: "Design" },
//   { id: 4, name: "Robotics" },
// ]);
const categories = ref([]);

const fetchCategories = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("https://back.stemershub.com/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      },
    });

    const result = await res.json();

    console.log("✅ Categories response:", result);

    categories.value = result.categories?.data || [];

  } catch (err) {
    showAlert("⚠️ Failed to load categories", "danger");
    console.error(err);
  }
};



const showAlert = (message, type = "success") => {
  alert.value = { show: true, message, type };
  topRef.value?.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => (alert.value.show = false), 3000);
};

const fetchCourseData = async () => {
  try {
    const { data } = await api.get(`/courses/${courseId}`);

    course.value = {
      ...course.value,
      ...data,
      image: typeof data.image === "string" ? `${data.image}?v=${Date.now()}` : null,
      imagePreview: "",
      requirements: data.requirements?.map((r) => r.requirement) || [],
      learning: data.learning?.map((l) => l.title) || [],
      who_is_for: data.audiences?.map((a) => a.description) || [],
      level: data.levels || [],
      curriculum:
        data.curriculum?.map((module) => ({
          title: module.title,
          lessons:
            module.lessons?.map((lesson) => ({
              title: lesson.title,
              contents: lesson.contents || [],
            })) || [],
        })) || [],
    };
  } catch (err) {
    showAlert("Failed to load course data", "danger");
    console.error(err);
  }
};

onMounted(fetchCourseData() , fetchCategories());

const saveChanges = async () => {
  const formData = new FormData();
  formData.append("title", course.value.title);
  formData.append("description", course.value.description);
  formData.append("duration", course.value.duration);
  formData.append("language", course.value.language);
  formData.append("price", course.value.price);
  formData.append("category_id", course.value.category_id);
  formData.append("youtube_video", course.value.youtube_video);
  formData.append("show_in_home", course.value.show_in_home ? 1 : 0);

  if (course.value.image instanceof File)
    formData.append("image", course.value.image);

  formData.append("requirements", JSON.stringify(course.value.requirements));
  formData.append("learning", JSON.stringify(course.value.learning));
  formData.append("who_is_for", JSON.stringify(course.value.who_is_for));
  formData.append("level", JSON.stringify(course.value.level));
  formData.append("curriculum", JSON.stringify(course.value.curriculum));

  try {
    await updateCourse(courseId, formData);
    showAlert("Course updated successfully");
    await fetchCourseData(); // تحديث البيانات بعد الحفظ
  } catch (err) {
    showAlert("Failed to update course", "danger");
    console.error(err);
  }
};

const updateCourse = async (id, courseData) => {
  courseData.append("_method", "PUT");

  await api.post(`/courses/${id}`, courseData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ معالجة الصورة
const handleFileImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    course.value.image = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      course.value.imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// ✅ التعامل مع الداتا المتكررة
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
const addLesson = (m) => course.value.curriculum[m].lessons.push({ title: "", contents: [] });
const removeLesson = (m, l) => course.value.curriculum[m].lessons.splice(l, 1);
const addContent = (m, l) => course.value.curriculum[m].lessons[l].contents.push({ content: "" });
const removeContent = (m, l, c) => course.value.curriculum[m].lessons[l].contents.splice(c, 1);


</script>
