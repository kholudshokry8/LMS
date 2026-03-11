<template>
  <div class="container mt-5 pt-3 student-form">
    <h1 class="heading-custom mb-4 text-center">
      {{ isEditMode ? "Edit Student" : "Create New Student" }}
    </h1>

    <div v-if="alert.message" :class="`alert alert-${alert.type}`" role="alert">
      {{ alert.message }}
    </div>

    <form @submit.prevent="saveStudent" class="p-4 shadow rounded bg-white">
      <!-- Parent Info -->
      <h5 class="section-title" v-if="!isEditMode">Parent Information</h5>
      <div class="row mb-4" v-if="!isEditMode">
        <div
          class="col-md-4"
          v-for="field in ['payer_name', 'payer_email', 'payer_phone']"
          :key="field"
        >
          <label class="label-colored">{{ labelMap[field] }}</label>
          <input
            :type="getFieldType(field)"
            class="form-control custom-input"
            v-model="formData[field]"
          />
          <small v-if="errors[field]" class="text-danger">{{
            errors[field]
          }}</small>
        </div>
      </div>

      <!-- Student Info -->
      <h5 class="section-title">Student Information</h5>
      <div class="row mb-4">
        <template v-if="isEditMode">
          <div class="col-md-4">
            <label class="label-colored">Student Name</label>
            <input
              type="text"
              class="form-control custom-input"
              v-model="formData.student_name"
            />
            <small v-if="errors.student_name" class="text-danger">{{
              errors.student_name
            }}</small>
          </div>
          <div class="col-md-4">
            <label class="label-colored">Student Email</label>
            <input
              type="email"
              class="form-control custom-input"
              v-model="formData.student_email"
            />
            <small v-if="errors.student_email" class="text-danger">{{
              errors.student_email
            }}</small>
          </div>
          <div class="col-md-4">
            <label class="label-colored">Student Phone</label>
            <input
              type="tel"
              class="form-control custom-input"
              v-model="formData.student_phone"
            />
            <small v-if="errors.student_phone" class="text-danger">{{
              errors.student_phone
            }}</small>
          </div>
        </template>
        <template v-else>
          <div
            class="col-md-4"
            v-for="field in ['student_name', 'student_email', 'student_phone']"
            :key="field"
          >
            <label class="label-colored">{{ labelMap[field] }}</label>
            <input
              :type="getFieldType(field)"
              class="form-control custom-input"
              v-model="formData[field]"
            />
            <small v-if="errors[field]" class="text-danger">{{
              errors[field]
            }}</small>
          </div>
        </template>
      </div>

      <div class="row mb-4" v-if="!isEditMode">
        <div class="col-md-6">
          <label class="label-colored">Student Age</label>
          <input
            type="number"
            class="form-control custom-input"
            v-model="formData.student_age"
          />
          <small v-if="errors.student_age" class="text-danger">{{
            errors.student_age
          }}</small>
        </div>
        <div class="col-md-6">
          <label class="label-colored">Student Language</label>
          <input
            type="text"
            class="form-control custom-input"
            v-model="formData.student_language"
          />
          <small v-if="errors.student_language" class="text-danger">{{
            errors.student_language
          }}</small>
        </div>
      </div>

      <!-- Course, Group, Level -->
      <h5 class="section-title">Course, Group & Level</h5>
      <div class="row mb-4">
        <div class="col-md-4">
          <label class="label-colored">Course</label>
          <select
            class="form-control custom-input"
            v-model="formData.course_id"
            @change="fetchCourseGroupsAndPrice"
          >
            <option value="">Select a course</option>
            <option
              v-for="course in courses"
              :key="course.id"
              :value="course.id"
            >
              {{ course.title }}
            </option>
          </select>
          <small v-if="errors.course_id" class="text-danger">{{
            errors.course_id
          }}</small>
        </div>

        <div class="col-md-4">
          <label class="label-colored">Group</label>
          <select class="form-control custom-input" v-model="formData.group_id">
            <option value="">Select a group</option>
            <option
              v-for="group in availableGroups"
              :key="group.id"
              :value="group.id"
            >
              {{ group.name || `Group ${group.id}` }}
            </option>
          </select>

          <small v-if="errors.group_id" class="text-danger">{{
            errors.group_id
          }}</small>
        </div>

        <div class="col-md-4">
          <label class="label-colored">Level</label>

          <select
            class="form-control custom-input"
            v-model="formData.course_level_id"
            @change="filterGroupsBySelectedLevel"
          >
            <option value="">All Course (Full Payment)</option>
            <option v-for="level in levels" :key="level.id" :value="level.id">
              {{ level.name }}
            </option>
          </select>
          <small v-if="errors.course_level_id" class="text-danger">{{
            errors.course_level_id
          }}</small>
        </div>
      </div>

      <div class="row mb-4" v-if="!isEditMode">
        <div class="col-md-4">
          <label class="label-colored">Amount Paid</label>
          <input
            type="number"
            class="form-control custom-input"
            v-model="formData.amount_paid"
            disabled
          />
          <small v-if="errors.amount_paid" class="text-danger">{{
            errors.amount_paid
          }}</small>
        </div>
      </div>

      <div class="text-center mt-4">
        <button type="submit" class="btn btn-lg btn-success px-5">
          {{ isEditMode ? "Update Student" : "Create Student" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStudentsStore } from "../store/studentStore";
import courseService from "../services/courseService";
import groupService from "../services/groupService";

const router = useRouter();
const route = useRoute();
const store = useStudentsStore();

const studentId = ref(route.params.id);
const isEditMode = ref(!!studentId.value);

const alert = ref({ type: "", message: "" });
const errors = ref({});
const courses = ref([]);
const levels = ref([]);
const availableGroups = ref([]);
const allCourseGroups = ref([]); // كل الجروبات الخاصة بالكورس الحالي

const formData = ref({
  payer_name: "",
  payer_email: "",
  payer_phone: "",
  student_name: "",
  student_email: "",
  student_phone: "",
  student_age: null,
  student_language: "",
  course_id: null,
  group_id: null,
  course_level_id: null,
  amount_paid: null
});

const labelMap = {
  payer_name: "Parent Name",
  payer_email: "Parent Email",
  payer_phone: "Parent Phone",
  student_name: "Student Name",
  student_email: "Student Email",
  student_phone: "Student Phone"
};

// عند اختيار كورس
const fetchCourseGroupsAndPrice = async () => {
  if (!formData.value.course_id) return;

  try {
    // استدعاء الجروبات والمعلومات الخاصة بالكورس
    const response = await groupService.fetchUpcomingGroupsByCourse(formData.value.course_id);

    // تحديث السعر العام للكورس
    formData.value.amount_paid = parseFloat(response.course_price) || 0;

    // تحميل الليفيلات المتاحة للكورس
    levels.value = response.levels ?? [];

    // تحميل كل الجروبات المتاحة في الكورس
    allCourseGroups.value = response.upcoming_groups ?? [];
    availableGroups.value = [...allCourseGroups.value];

    // تفريغ اختيار الليفل والجروب
    formData.value.course_level_id = null;
    formData.value.group_id = null;

    console.log("✅ Loaded course data:", response);
  } catch (error) {
    console.error("❌ Failed to load course data:", error);
  }
};
// عند اختيار ليفل
const filterGroupsBySelectedLevel = async () => {
  const rawLevelId = formData.value.course_level_id;
  const levelId = rawLevelId && !isNaN(rawLevelId) ? parseInt(rawLevelId) : null;

  if (!levelId) {
    // ✅ لو المستخدم اختار All Course → رجع كل الجروبات العامة
    await fetchCourseGroupsAndPrice();
    return;
  }

  try {
    // استدعاء الجروبات الخاصة بالليفل المختار
    const response = await groupService.fetchUpcomingGroupsByLevel(levelId);

    // تحديث الجروبات المتاحة
    availableGroups.value = response.upcoming_groups ?? [];

    // تحديث السعر حسب الليفل
    formData.value.amount_paid = parseFloat(response.course_price) || 0;

    // تفريغ الجروب المختار
    formData.value.group_id = null;

    console.log("✅ Loaded level-specific groups:", availableGroups.value);
  } catch (error) {
    console.error("❌ Failed to load level groups:", error);
  }
};

const fetchCoursePrice = async () => {
  try {
    formData.value.course_level_id = null; // لتأكيد مسح القيمة

    const course = await courseService.getCourseById(formData.value.course_id);
    formData.value.amount_paid = parseFloat(course?.price) || 0;
  } catch (error) {
    console.error("❌ Failed to fetch course price:", error);
  }
};

const fetchCourses = async () => {
  try {
    courses.value = await courseService.fetchCourses();
  } catch (err) {
    console.error("❌ Failed to load courses:", err);
  }
};

const fetchTotalPayment = async (id) => {
  try {
    const res = await store.fetchStudentById(id);
    formData.value.amount_paid = res?.total || 0;
  } catch (error) {
    console.error("❌ Failed to fetch total payment:", error);
    formData.value.amount_paid = 0;
  }
};

const fetchStudentForEdit = async () => {
  if (!isEditMode.value) return;

  const student = await store.fetchStudentById(studentId.value);
  if (student) {
    formData.value.payer_name = student.payer_name;
    formData.value.payer_email = student.payer_email;
    formData.value.payer_phone = student.payer_phone;
    formData.value.student_name = student.name;
    formData.value.student_email = student.email;
    formData.value.student_phone = student.phone;
    formData.value.student_age = student.age;
    formData.value.student_language = student.language;
    formData.value.course_id = student.student_groups?.[0]?.course_id || null;
    formData.value.group_id = student.student_groups?.[0]?.id || null;
    formData.value.course_level_id =
      student.student_groups?.[0]?.course_level_id || null;

    // تحميل الكورس والجروبات والليفلات
    await fetchCourseGroupsAndPrice();

    // تحديد الليفل المختار وتطبيق الفلترة تلقائيًا
    filterGroupsBySelectedLevel();

    await fetchTotalPayment(studentId.value);
  }
};

const getFieldType = (field) => {
  if (field.includes("email")) return "email";
  if (field.includes("phone")) return "tel";
  return "text";
};

const validateForm = () => {
  errors.value = {};
  const requiredFields = isEditMode.value
    ? ["student_name", "student_email", "student_phone"]
    : [
        "payer_name",
        "payer_email",
        "payer_phone",
        "student_name",
        "student_email",
        "student_phone",
        "student_age",
        "student_language",
        "course_id",
        "group_id"
      ];

  requiredFields.forEach((field) => {
    if (!formData.value[field]) {
      errors.value[field] = "This field is required.";
    }
  });

  return Object.keys(errors.value).length === 0;
};

const saveStudent = async () => {
  if (!validateForm()) return;

  const { amount_paid, ...cleanData } = formData.value;

  const dataToSend = isEditMode.value
    ? {
        name: formData.value.student_name,
        email: formData.value.student_email,
        phone: formData.value.student_phone
      }
    : cleanData;

  try {
    if (isEditMode.value) {
      await store.updateStudent(studentId.value, dataToSend);
      alert.value = {
        type: "success",
        message: "Student updated successfully!"
      };
    } else {
      await store.addStudent(dataToSend);
      alert.value = {
        type: "success",
        message: "Student created successfully!"
      };
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      router.push("/students");
    }, 2000);
  } catch (error) {
    console.error("❌ Backend error:", error);

    const res = error.response;
    const data = res?.data;

    errors.value = {};
    let errorMessage = "Error saving student. Please try again.";
    console.log("📦 FULL ERROR RESPONSE:", JSON.stringify(error, null, 2));
    console.log("📦 error.response:", error?.response);
    console.log("📦 error.response.data:", error?.response?.data);
    console.log("📦 error.response.data.error:", error?.response?.data?.error);

    if (data?.error?.includes("Duplicate entry")) {
      const duplicateFields = [];

      // 🔍 فحص تكرار الإيميل
      if (data.error.includes("users_email_unique")) {
        errors.value.student_email = "This email is already used.";
        duplicateFields.push("email");
      }

      // 🔍 فحص تكرار الموبايل
      if (data.error.includes("users_phone_unique")) {
        errors.value.student_phone = "This phone number is already used.";
        duplicateFields.push("phone");
      }

      // ✅ عرض رسالة مناسبة أعلى النموذج
      if (duplicateFields.length === 2) {
        errorMessage = "Email and phone number are already used.";
      } else if (duplicateFields[0] === "email") {
        errorMessage = "This email is already used.";
      } else if (duplicateFields[0] === "phone") {
        errorMessage = "This phone number is already used.";
      } else {
        errorMessage = data.message || "Duplicate entry found.";
      }
    }

    // 🧠 فحص أخطاء الـ validation العادية (422)
    else if (data?.errors && typeof data.errors === "object") {
      Object.entries(data.errors).forEach(([field, messages]) => {
        errors.value[field] = messages[0];
      });
      errorMessage = data.message || "Validation failed.";
    }

    // 💬 رسالة عامة من الباك اند
    else if (data?.message) {
      errorMessage = data.message;
    }

    alert.value = { type: "danger", message: errorMessage };
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

onMounted(async () => {
  await fetchCourses();
  await fetchStudentForEdit();
});
</script>

<style scoped>
.student-form {
  max-width: 1000px;
}
.section-title {
  font-size: 20px;
  color: #343a40;
  font-weight: 600;
  margin-bottom: 15px;
  border-left: 4px solid #d65622;
  padding-left: 10px;
}
.custom-input {
  height: 50px;
  font-size: 1rem;
}
.label-colored {
  font-weight: 600;
  color: #d65622;
  font-size: 17px;
  margin-bottom: 6px;
  display: inline-block;
}
.heading-custom {
  color: #d65622;
  font-weight: bold;
  font-size: 36px;
}
</style>
